import * as THREE from 'three';
import { getPropAssetDef, PROP_ASSETS } from '../assets/propCatalog';
import type { PropModelId } from '../types/editor';
import { getPropPalette } from './propMaterials';
import { buildTrackProp } from './propsTrack';
import { buildBroadcastProp } from './propsBroadcast';
import { buildLightingProp } from './propsLighting';
import { buildWorkshopProp } from './propsWorkshop';

export function buildConeModel(modelId: PropModelId, maxAnisotropy = 4): THREE.Group {
  const palette = getPropPalette(maxAnisotropy);
  const built =
    buildTrackProp(modelId, palette) ??
    buildBroadcastProp(modelId, palette) ??
    buildLightingProp(modelId, palette) ??
    buildWorkshopProp(modelId, palette);

  if (!built) {
    throw new Error(`Unknown prop model ID: ${modelId}`);
  }
  built.userData.coneModelId = modelId;
  return built;
}

export function createGhostPreview(modelId: PropModelId): THREE.Group {
  const preview = buildConeModel(modelId);
  const ghostMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x0ea5e9,
    emissiveIntensity: 0.65,
    roughness: 0.28,
    metalness: 0.1,
    transparent: true,
    opacity: 0.52,
    depthWrite: false,
  });

  preview.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (child.name === 'ContactShadow') {
        child.visible = false;
      } else {
        child.castShadow = false;
        child.receiveShadow = false;
        child.material = ghostMat;
      }
    }
  });

  const radius = getPropAssetDef(modelId).footprintRadiusM;
  const reticleRing = new THREE.Mesh(
    new THREE.RingGeometry(radius, radius + 0.05, 40),
    new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    }),
  );
  reticleRing.rotation.x = -Math.PI / 2;
  reticleRing.position.y = 0.015;
  preview.add(reticleRing);

  const innerDot = new THREE.Mesh(
    new THREE.CircleGeometry(0.055, 20),
    new THREE.MeshBasicMaterial({
      color: 0xfacc15,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
    }),
  );
  innerDot.rotation.x = -Math.PI / 2;
  innerDot.position.y = 0.018;
  preview.add(innerDot);

  preview.userData.isGhost = true;
  return preview;
}

export function disposeObject3D(root: THREE.Object3D): void {
  const palette = getPropPalette();

  root.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.geometry?.dispose();
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      for (const mat of mats) {
        if (!mat || palette.sharedMatSet.has(mat)) continue;
        const std = mat as THREE.MeshStandardMaterial;
        if (std.map && !palette.sharedTexSet.has(std.map)) std.map.dispose();
        mat.dispose();
      }
    }
  });
}

/**
 * Generates crisp Unreal-Engine-style 3D studio DataURL thumbnails for all 50 props
 * in small requestAnimationFrame chunks, then disposes the temporary WebGL context.
 */
export function generatePropThumbnailsAsync(
  onUpdate: (thumbnails: Partial<Record<PropModelId, string>>) => void,
): () => void {
  let cancelled = false;
  let rafId = 0;

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });
  } catch {
    return () => {};
  }

  renderer.setPixelRatio(1);
  renderer.setSize(128, 128, false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.24;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xf1f5f9, 0x334155, 1.8));

  const key = new THREE.DirectionalLight(0xfff7ed, 2.35);
  key.position.set(3.5, 5, 4);
  scene.add(key);

  const fill = new THREE.DirectionalLight(0xe0f2fe, 1.15);
  fill.position.set(-2.5, 1.5, 4.5);
  scene.add(fill);

  const rim = new THREE.DirectionalLight(0x93c5fd, 1.6);
  rim.position.set(-4, 3.2, -3.5);
  scene.add(rim);

  const camera = new THREE.PerspectiveCamera(32, 1, 0.05, 50);
  const box = new THREE.Box3();
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();

  const results: Partial<Record<PropModelId, string>> = {};
  let index = 0;

  const processBatch = () => {
    if (cancelled) return;
    const batchEnd = Math.min(PROP_ASSETS.length, index + 8);
    while (index < batchEnd) {
      const def = PROP_ASSETS[index];
      const model = buildConeModel(def.id, 1);
      scene.add(model);

      box.setFromObject(model);
      box.getSize(size);
      box.getCenter(center);

      const maxDim = Math.max(size.x, size.y, size.z, 0.35);
      const dist = (maxDim / 2) / Math.tan((camera.fov * Math.PI) / 360) * 1.52;
      camera.position.set(center.x + dist * 0.72, center.y + dist * 0.42, center.z + dist * 0.88);
      camera.lookAt(center);
      camera.updateProjectionMatrix();

      renderer.render(scene, camera);
      results[def.id] = renderer.domElement.toDataURL('image/png');

      scene.remove(model);
      disposeObject3D(model);
      index += 1;
    }

    onUpdate({ ...results });

    if (index < PROP_ASSETS.length) {
      rafId = window.requestAnimationFrame(processBatch);
    } else {
      cleanup();
    }
  };

  const cleanup = () => {
    window.cancelAnimationFrame(rafId);
    renderer.dispose();
    try {
      renderer.forceContextLoss();
    } catch {
      // Ignore if already lost
    }
  };

  rafId = window.requestAnimationFrame(processBatch);
  return () => {
    cancelled = true;
    cleanup();
  };
}
