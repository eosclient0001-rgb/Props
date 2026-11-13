import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import type {
  ActiveDragPayload,
  PlacedActor,
  PropModelId,
  TransformMode,
} from '../types/editor';
import { getPropAssetDef } from '../assets/propCatalog';
import {
  buildConeModel,
  createGhostPreview,
  disposeObject3D,
} from '../three/coneModels';
import { buildProvingGround } from '../three/provingGround';
import { clampTrackCoord, isPropModelId, snapWorldPosition } from '../utils/editorLogic';

interface SpinTarget {
  obj: THREE.Object3D;
  axis: 'x' | 'y' | 'z';
  speed: number;
}

interface Viewport3DProps {
  actors: PlacedActor[];
  selectedUid: string | null;
  transformMode: TransformMode;
  snapEnabled: boolean;
  gridSize: number;
  animationsPlaying: boolean;
  activeDrag: ActiveDragPayload | null;
  cameraResetToken: number;
  onSelectActor: (uid: string | null) => void;
  onUpdateActorTransform: (
    uid: string,
    position: [number, number, number],
    rotationY: number,
    scale: number,
  ) => void;
  onDropNewCone: (modelId: PropModelId, position: [number, number, number]) => void;
  onGhostCoordsChange: (coords: [number, number, number] | null) => void;
}

const DEFAULT_CAMERA_POS = new THREE.Vector3(6.8, 4.9, 10.2);
const DEFAULT_CAMERA_TARGET = new THREE.Vector3(0, 0.45, -1.2);

function detectSoftwareWebGL(): boolean {
  try {
    const probe = document.createElement('canvas');
    const gl =
      (probe.getContext('webgl2') as WebGL2RenderingContext | null) ||
      (probe.getContext('webgl') as WebGLRenderingContext | null);
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    if (ext) {
      const renderer = String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || '');
      if (/SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(renderer)) {
        return true;
      }
    }
    return false;
  } catch {
    return true;
  }
}

function collectSpinTargets(group: THREE.Group): SpinTarget[] {
  const targets: SpinTarget[] = [];
  group.traverse((child) => {
    const spin = child.userData.animSpin as
      | { axis: 'x' | 'y' | 'z'; speed: number }
      | undefined;
    if (spin) {
      targets.push({ obj: child, axis: spin.axis, speed: spin.speed });
    }
  });
  return targets;
}

export function Viewport3D({
  actors,
  selectedUid,
  transformMode,
  snapEnabled,
  gridSize,
  animationsPlaying,
  activeDrag,
  cameraResetToken,
  onSelectActor,
  onUpdateActorTransform,
  onDropNewCone,
  onGhostCoordsChange,
}: Viewport3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const [contextError, setContextError] = useState<string | null>(null);

  const actorsRef = useRef(actors);
  actorsRef.current = actors;

  const selectedUidRef = useRef(selectedUid);
  selectedUidRef.current = selectedUid;

  const snapRef = useRef({ enabled: snapEnabled, gridSize });
  snapRef.current = { enabled: snapEnabled, gridSize };

  const animPlayingRef = useRef(animationsPlaying);
  animPlayingRef.current = animationsPlaying;

  const callbacksRef = useRef({
    onSelectActor,
    onUpdateActorTransform,
    onDropNewCone,
    onGhostCoordsChange,
  });
  callbacksRef.current = {
    onSelectActor,
    onUpdateActorTransform,
    onDropNewCone,
    onGhostCoordsChange,
  };

  const engineRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    orbit: OrbitControls;
    transform: TransformControls;
    actorGroups: Map<string, THREE.Group>;
    spinTargets: SpinTarget[];
    selectionRing: THREE.Mesh;
    ghostGroup: THREE.Group | null;
    ghostModelId: PropModelId | null;
    isSoftwareGl: boolean;
    maxAnisotropy: number;
    requestRender: () => void;
    raycastGround: (clientX: number, clientY: number) => [number, number, number] | null;
  } | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const isSoftwareGl = detectSoftwareWebGL();
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
        alpha: false,
      });
    } catch {
      setContextError('3D WebGL context could not be initialized in this browser.');
      return;
    }

    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(mount.clientWidth || 1280, mount.clientHeight || 720, false);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    mount.appendChild(renderer.domElement);

    const maxAnisotropy = isSoftwareGl
      ? 1
      : Math.min(4, renderer.capabilities.getMaxAnisotropy());

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f141d);
    scene.fog = new THREE.FogExp2(0x0f141d, 0.0115);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmrem.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;
    scene.environmentIntensity = 0.68;
    roomEnv.dispose();
    pmrem.dispose();

    const width = mount.clientWidth || 1280;
    const height = mount.clientHeight || 720;
    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 160);
    camera.position.copy(DEFAULT_CAMERA_POS);

    const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x1e293b, 0.72);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.25);
    keyLight.position.set(11, 18, 9);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 2;
    keyLight.shadow.camera.far = 48;
    keyLight.shadow.camera.left = -16;
    keyLight.shadow.camera.right = 16;
    keyLight.shadow.camera.top = 16;
    keyLight.shadow.camera.bottom = -16;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x93c5fd, 0.85);
    rimLight.position.set(-12, 8, -14);
    scene.add(rimLight);

    const provingGround = buildProvingGround(maxAnisotropy);
    scene.add(provingGround.root);

    const selectionRing = new THREE.Mesh(
      new THREE.RingGeometry(0.27, 0.32, 36),
      new THREE.MeshBasicMaterial({
        color: 0xf59e0b,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.92,
        depthWrite: false,
      }),
    );
    selectionRing.rotation.x = -Math.PI / 2;
    selectionRing.position.y = 0.012;
    selectionRing.visible = false;
    scene.add(selectionRing);

    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.target.copy(DEFAULT_CAMERA_TARGET);
    orbit.enableDamping = !isSoftwareGl;
    orbit.dampingFactor = 0.08;
    orbit.minDistance = 1.4;
    orbit.maxDistance = 32;
    orbit.minPolarAngle = 0.14;
    orbit.maxPolarAngle = Math.PI * 0.465;
    orbit.update();

    const transform = new TransformControls(camera, renderer.domElement);
    transform.setSpace('world');
    transform.setSize(0.85);
    scene.add(transform.getHelper());

    const actorGroups = new Map<string, THREE.Group>();
    const spinTargets: SpinTarget[] = [];
    const raycaster = new THREE.Raycaster();
    const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

    const advanceAnimations = (dt: number) => {
      if (!animPlayingRef.current || spinTargets.length === 0) return;
      for (const t of spinTargets) {
        t.obj.rotation[t.axis] += t.speed * dt;
      }
    };

    let disposed = false;
    let rafId = 0;
    let renderQueued = false;
    let renderInFlight = false;
    let paceTimerId = 0;

    const afterDraw = (done: () => void) => {
      if (!isSoftwareGl) {
        done();
        return;
      }
      try {
        const gl = renderer.getContext() as WebGL2RenderingContext;
        if (typeof gl.fenceSync === 'function') {
          const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
          gl.flush();
          if (sync) gl.deleteSync(sync);
        }
      } catch {
        // Ignore
      }
      paceTimerId = window.setTimeout(done, 80);
    };

    const drawFrame = () => {
      rafId = 0;
      if (disposed) return;
      renderQueued = false;
      renderInFlight = true;
      orbit.update();
      renderer.render(scene, camera);
      afterDraw(() => {
        renderInFlight = false;
        if (renderQueued && !disposed) {
          scheduleFrame();
        }
      });
    };

    const scheduleFrame = () => {
      if (disposed || rafId !== 0 || renderInFlight) return;
      renderQueued = false;
      rafId = window.requestAnimationFrame(drawFrame);
    };

    const requestRender = () => {
      if (disposed) return;
      renderQueued = true;
      scheduleFrame();
    };

    let continuousRaf = 0;
    let lastTime = performance.now();
    const gpuTick = (now: number) => {
      if (disposed) return;
      const dt = Math.min(0.05, Math.max(0, (now - lastTime) / 1000));
      lastTime = now;
      advanceAnimations(dt);
      orbit.update();
      renderer.render(scene, camera);
      continuousRaf = window.requestAnimationFrame(gpuTick);
    };

    let swAnimIntervalId = 0;
    if (!isSoftwareGl) {
      continuousRaf = window.requestAnimationFrame(gpuTick);
    } else {
      requestRender();
      swAnimIntervalId = window.setInterval(() => {
        if (disposed || document.hidden || !animPlayingRef.current || spinTargets.length === 0) {
          return;
        }
        advanceAnimations(0.05);
        requestRender();
      }, 130);
    }

    const raycastGround = (
      clientX: number,
      clientY: number,
    ): [number, number, number] | null => {
      const rect = renderer.domElement.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return null;
      const ndc = new THREE.Vector2(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -((clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(ndc, camera);
      const hit = new THREE.Vector3();
      const intersected = raycaster.ray.intersectPlane(groundPlane, hit);
      if (!intersected) return null;
      return snapWorldPosition(
        hit.x,
        hit.z,
        snapRef.current.gridSize,
        snapRef.current.enabled,
      );
    };

    const onDraggingChanged = (event: { value: unknown }) => {
      orbit.enabled = !event.value;
    };
    transform.addEventListener('dragging-changed', onDraggingChanged);

    const onObjectChange = () => {
      const attached = transform.object;
      if (!attached) return;
      const uid = attached.userData.actorUid as string | undefined;
      if (!uid) return;

      attached.position.y = 0;
      attached.position.x = clampTrackCoord(attached.position.x);
      attached.position.z = clampTrackCoord(attached.position.z);

      const uniformScale = Math.max(
        0.5,
        Math.min(2.2, Number(((attached.scale.x + attached.scale.y + attached.scale.z) / 3).toFixed(3))),
      );
      attached.scale.setScalar(uniformScale);

      const ringScale =
        ((getPropAssetDef((attached.userData.coneModelId as PropModelId) || 'apex_cone')
          .footprintRadiusM) /
          0.28) *
        uniformScale;
      selectionRing.position.set(attached.position.x, 0.012, attached.position.z);
      selectionRing.scale.setScalar(ringScale);

      callbacksRef.current.onUpdateActorTransform(
        uid,
        [
          Number(attached.position.x.toFixed(3)),
          0,
          Number(attached.position.z.toFixed(3)),
        ],
        Number(attached.rotation.y.toFixed(4)),
        uniformScale,
      );
      requestRender();
    };
    transform.addEventListener('objectChange', onObjectChange);

    const onOrbitChange = () => {
      requestRender();
    };
    orbit.addEventListener('change', onOrbitChange);

    let pointerDownPos = { x: 0, y: 0 };
    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      pointerDownPos = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      if (dist > 5 || transform.dragging) return;

      const rect = renderer.domElement.getBoundingClientRect();
      const ndc = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(ndc, camera);
      const candidates = Array.from(actorGroups.values());
      const hits = raycaster.intersectObjects(candidates, true);
      if (hits.length > 0) {
        let obj: THREE.Object3D | null = hits[0].object;
        while (obj && !obj.userData.actorUid) {
          obj = obj.parent;
        }
        if (obj?.userData.actorUid) {
          callbacksRef.current.onSelectActor(obj.userData.actorUid as string);
          return;
        }
      }
      callbacksRef.current.onSelectActor(null);
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.max(1, Math.floor(entry.contentRect.width));
        const h = Math.max(1, Math.floor(entry.contentRect.height));
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
        requestRender();
      }
    });
    resizeObserver.observe(mount);

    const onContextLost = (ev: Event) => {
      ev.preventDefault();
      setContextError('WebGL context lost. Attempting recovery...');
    };
    const onContextRestored = () => {
      setContextError(null);
      requestRender();
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', onContextRestored);

    engineRef.current = {
      scene,
      camera,
      renderer,
      orbit,
      transform,
      actorGroups,
      spinTargets,
      selectionRing,
      ghostGroup: null,
      ghostModelId: null,
      isSoftwareGl,
      maxAnisotropy,
      requestRender,
      raycastGround,
    };

    return () => {
      disposed = true;
      window.cancelAnimationFrame(rafId);
      window.cancelAnimationFrame(continuousRaf);
      window.clearTimeout(paceTimerId);
      window.clearInterval(swAnimIntervalId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', onContextRestored);
      orbit.removeEventListener('change', onOrbitChange);
      transform.removeEventListener('dragging-changed', onDraggingChanged);
      transform.removeEventListener('objectChange', onObjectChange);
      transform.detach();
      transform.dispose();
      orbit.dispose();

      for (const grp of actorGroups.values()) {
        scene.remove(grp);
        disposeObject3D(grp);
      }
      actorGroups.clear();
      spinTargets.length = 0;

      if (engineRef.current?.ghostGroup) {
        scene.remove(engineRef.current.ghostGroup);
        disposeObject3D(engineRef.current.ghostGroup);
      }

      selectionRing.geometry.dispose();
      (selectionRing.material as THREE.Material).dispose();
      provingGround.dispose();
      envTarget.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
      engineRef.current = null;
    };
  }, []);

  // Synchronize placed actors + animated spin targets
  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;

    const currentIds = new Set(actors.map((a) => a.uid));
    let spinDirty = false;

    for (const [uid, grp] of engine.actorGroups.entries()) {
      if (!currentIds.has(uid)) {
        if (engine.transform.object === grp) {
          engine.transform.detach();
        }
        engine.scene.remove(grp);
        disposeObject3D(grp);
        engine.actorGroups.delete(uid);
        spinDirty = true;
      }
    }

    for (const actor of actors) {
      let grp = engine.actorGroups.get(actor.uid);
      if (!grp) {
        grp = buildConeModel(actor.modelId, engine.maxAnisotropy);
        grp.userData.actorUid = actor.uid;
        grp.name = actor.name;
        engine.scene.add(grp);
        engine.actorGroups.set(actor.uid, grp);
        spinDirty = true;
      }
      grp.position.set(actor.position[0], actor.position[1], actor.position[2]);
      grp.rotation.set(0, actor.rotationY, 0);
      grp.scale.setScalar(actor.scale);
    }

    if (spinDirty) {
      engine.spinTargets.length = 0;
      for (const grp of engine.actorGroups.values()) {
        engine.spinTargets.push(...collectSpinTargets(grp));
      }
    }

    const selectedObj = selectedUid ? engine.actorGroups.get(selectedUid) : undefined;
    if (selectedObj) {
      if (engine.transform.object !== selectedObj) {
        engine.transform.attach(selectedObj);
      }
      const actorDef = actors.find((a) => a.uid === selectedUid);
      const ringScale =
        ((getPropAssetDef(actorDef?.modelId ?? 'apex_cone').footprintRadiusM) / 0.28) *
        selectedObj.scale.x;
      engine.selectionRing.visible = true;
      engine.selectionRing.position.set(selectedObj.position.x, 0.012, selectedObj.position.z);
      engine.selectionRing.scale.setScalar(ringScale);
    } else {
      engine.transform.detach();
      engine.selectionRing.visible = false;
    }

    engine.requestRender();
  }, [actors, selectedUid]);

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;

    engine.transform.setMode(transformMode);
    if (transformMode === 'translate') {
      engine.transform.showX = true;
      engine.transform.showY = false;
      engine.transform.showZ = true;
    } else if (transformMode === 'rotate') {
      engine.transform.showX = false;
      engine.transform.showY = true;
      engine.transform.showZ = false;
    } else {
      engine.transform.showX = true;
      engine.transform.showY = true;
      engine.transform.showZ = true;
    }

    engine.transform.setTranslationSnap(snapEnabled ? gridSize : null);
    engine.transform.setRotationSnap(snapEnabled ? THREE.MathUtils.degToRad(15) : null);
    engine.transform.setScaleSnap(snapEnabled ? 0.1 : null);
    engine.requestRender();
  }, [transformMode, snapEnabled, gridSize]);

  useEffect(() => {
    if (cameraResetToken === 0) return;
    const engine = engineRef.current;
    if (!engine) return;
    engine.camera.position.copy(DEFAULT_CAMERA_POS);
    engine.orbit.target.copy(DEFAULT_CAMERA_TARGET);
    engine.orbit.update();
    engine.requestRender();
  }, [cameraResetToken]);

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;

    if (!activeDrag || !activeDrag.isOverViewport) {
      if (engine.ghostGroup) {
        engine.ghostGroup.visible = false;
        engine.requestRender();
      }
      callbacksRef.current.onGhostCoordsChange(null);
      return;
    }

    if (engine.ghostModelId !== activeDrag.modelId || !engine.ghostGroup) {
      if (engine.ghostGroup) {
        engine.scene.remove(engine.ghostGroup);
        disposeObject3D(engine.ghostGroup);
      }
      engine.ghostGroup = createGhostPreview(activeDrag.modelId);
      engine.ghostModelId = activeDrag.modelId;
      engine.scene.add(engine.ghostGroup);
    }

    const pos = engine.raycastGround(activeDrag.pointerX, activeDrag.pointerY);
    if (pos) {
      engine.ghostGroup.visible = true;
      engine.ghostGroup.position.set(pos[0], 0, pos[2]);
      callbacksRef.current.onGhostCoordsChange(pos);
    } else {
      engine.ghostGroup.visible = false;
      callbacksRef.current.onGhostCoordsChange(null);
    }
    engine.requestRender();
  }, [activeDrag]);

  const handleNativeDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    const types = Array.from(e.dataTransfer.types || []);
    if (
      !types.includes('application/x-apextrack-cone') &&
      !types.includes('text/plain')
    ) {
      return;
    }
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';

    const engine = engineRef.current;
    if (!engine) return;

    const modelRaw = e.dataTransfer.getData('application/x-apextrack-cone');
    const previewModel: PropModelId = isPropModelId(modelRaw)
      ? modelRaw
      : activeDrag?.modelId || 'apex_cone';

    if (engine.ghostModelId !== previewModel || !engine.ghostGroup) {
      if (engine.ghostGroup) {
        engine.scene.remove(engine.ghostGroup);
        disposeObject3D(engine.ghostGroup);
      }
      engine.ghostGroup = createGhostPreview(previewModel);
      engine.ghostModelId = previewModel;
      engine.scene.add(engine.ghostGroup);
    }

    const pos = engine.raycastGround(e.clientX, e.clientY);
    if (pos) {
      engine.ghostGroup.visible = true;
      engine.ghostGroup.position.set(pos[0], 0, pos[2]);
      callbacksRef.current.onGhostCoordsChange(pos);
    }
    engine.requestRender();
  };

  const handleNativeDragLeave = () => {
    const engine = engineRef.current;
    if (engine?.ghostGroup) {
      engine.ghostGroup.visible = false;
      engine.requestRender();
    }
    callbacksRef.current.onGhostCoordsChange(null);
  };

  const handleNativeDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const raw =
      e.dataTransfer.getData('application/x-apextrack-cone') ||
      e.dataTransfer.getData('text/plain');
    if (!isPropModelId(raw)) {
      return;
    }

    const engine = engineRef.current;
    if (engine?.ghostGroup) {
      engine.ghostGroup.visible = false;
      engine.requestRender();
    }
    callbacksRef.current.onGhostCoordsChange(null);

    const pos = engine?.raycastGround(e.clientX, e.clientY) ?? [0, 0, 0];
    callbacksRef.current.onDropNewCone(raw, pos);
  };

  return (
    <div
      ref={containerRef}
      data-testid="viewport-3d"
      data-actor-count={actors.length}
      data-selected-actor={selectedUid ?? ''}
      onDragOver={handleNativeDragOver}
      onDragLeave={handleNativeDragLeave}
      onDrop={handleNativeDrop}
      className="relative flex-1 min-h-0 w-full overflow-hidden bg-[#0f141d] select-none"
    >
      <div ref={mountRef} className="absolute inset-0" />

      {contextError && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0f141d] text-slate-300 text-sm">
          <div className="px-4 py-3 rounded border border-slate-700 bg-[#161c26]">
            {contextError}
          </div>
        </div>
      )}
    </div>
  );
}
