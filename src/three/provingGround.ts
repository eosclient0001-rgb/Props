import * as THREE from 'three';

function createAsphaltAlbedoAndRoughness(maxAnisotropy = 4): {
  map: THREE.CanvasTexture;
  roughnessMap: THREE.CanvasTexture;
} {
  const size = 512;
  const albedoCanvas = document.createElement('canvas');
  albedoCanvas.width = size;
  albedoCanvas.height = size;
  const aCtx = albedoCanvas.getContext('2d')!;

  const roughCanvas = document.createElement('canvas');
  roughCanvas.width = size;
  roughCanvas.height = size;
  const rCtx = roughCanvas.getContext('2d')!;

  aCtx.fillStyle = '#20252f';
  aCtx.fillRect(0, 0, size, size);

  rCtx.fillStyle = '#cfcfcf';
  rCtx.fillRect(0, 0, size, size);

  // Deterministic asphalt aggregate grain
  for (let i = 0; i < 16000; i++) {
    const x = (i * 73 + (i % 19) * 17) % size;
    const y = (i * 137 + (i % 23) * 29) % size;
    const tone = (i * 13) % 24;
    const base = 26 + tone;
    aCtx.fillStyle = `rgb(${base}, ${base + 3}, ${base + 7})`;
    aCtx.fillRect(x, y, 2, 2);

    const rough = 175 + ((i * 7) % 60);
    rCtx.fillStyle = `rgb(${rough}, ${rough}, ${rough})`;
    rCtx.fillRect(x, y, 2, 2);
  }

  // Subtle tire rubber wear streak bands
  const streakGrad = aCtx.createLinearGradient(0, 0, size, 0);
  streakGrad.addColorStop(0, 'rgba(12, 15, 21, 0)');
  streakGrad.addColorStop(0.32, 'rgba(12, 15, 21, 0.16)');
  streakGrad.addColorStop(0.5, 'rgba(12, 15, 21, 0.04)');
  streakGrad.addColorStop(0.68, 'rgba(12, 15, 21, 0.16)');
  streakGrad.addColorStop(1, 'rgba(12, 15, 21, 0)');
  aCtx.fillStyle = streakGrad;
  aCtx.fillRect(0, 0, size, size);

  const map = new THREE.CanvasTexture(albedoCanvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(14, 14);
  map.anisotropy = maxAnisotropy;

  const roughnessMap = new THREE.CanvasTexture(roughCanvas);
  roughnessMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.RepeatWrapping;
  roughnessMap.repeat.set(14, 14);
  roughnessMap.anisotropy = maxAnisotropy;

  return { map, roughnessMap };
}

function createRumbleKerbTexture(maxAnisotropy = 4): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const blockH = 64;
  for (let i = 0; i < 8; i++) {
    ctx.fillStyle = i % 2 === 0 ? '#dc2626' : '#f1f5f9';
    ctx.fillRect(0, i * blockH, 128, blockH);
  }
  ctx.fillStyle = 'rgba(15, 23, 42, 0.25)';
  ctx.fillRect(0, 0, 14, 512);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 14);
  tex.anisotropy = maxAnisotropy;
  return tex;
}

export interface ProvingGroundHandles {
  root: THREE.Group;
  groundPlaneMesh: THREE.Mesh;
  gridHelper: THREE.GridHelper;
  dispose: () => void;
}

export function buildProvingGround(maxAnisotropy = 4): ProvingGroundHandles {
  const root = new THREE.Group();
  root.name = 'ProvingGround';

  const { map: asphaltMap, roughnessMap: asphaltRoughMap } =
    createAsphaltAlbedoAndRoughness(maxAnisotropy);
  const kerbTex = createRumbleKerbTexture(maxAnisotropy);

  // Outer gravel / paddock shoulder apron (140m x 140m so camera never exposes void)
  const apronMat = new THREE.MeshStandardMaterial({
    color: 0x141922,
    roughness: 0.94,
    metalness: 0.0,
  });
  const apron = new THREE.Mesh(new THREE.PlaneGeometry(160, 160), apronMat);
  apron.rotation.x = -Math.PI / 2;
  apron.position.y = -0.025;
  apron.receiveShadow = true;
  root.add(apron);

  // Main tarmac pad (52m x 52m) — raycast drop surface sits strictly at y = 0
  const tarmacMat = new THREE.MeshStandardMaterial({
    map: asphaltMap,
    roughnessMap: asphaltRoughMap,
    color: 0x9aa4b4,
    roughness: 0.84,
    metalness: 0.04,
  });
  const groundPlaneMesh = new THREE.Mesh(new THREE.PlaneGeometry(52, 52), tarmacMat);
  groundPlaneMesh.rotation.x = -Math.PI / 2;
  groundPlaneMesh.position.y = 0;
  groundPlaneMesh.receiveShadow = true;
  groundPlaneMesh.name = 'TarmacSurface';
  root.add(groundPlaneMesh);

  // Subtle metric editor grid with polygonOffset to avoid z-fighting
  const gridHelper = new THREE.GridHelper(48, 48, 0x3b82f6, 0x2c3647);
  gridHelper.position.y = 0.004;
  const gridMats = Array.isArray(gridHelper.material)
    ? gridHelper.material
    : [gridHelper.material];
  for (const m of gridMats) {
    m.transparent = true;
    m.opacity = 0.34;
    m.depthWrite = false;
    m.polygonOffset = true;
    m.polygonOffsetFactor = -1;
    m.polygonOffsetUnits = -1;
  }
  root.add(gridHelper);

  // Painted white track lane lines & center racing ticks
  const paintWhiteMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    roughness: 0.65,
    metalness: 0.0,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });

  const paintYellowMat = new THREE.MeshStandardMaterial({
    color: 0xfacc15,
    roughness: 0.62,
    metalness: 0.0,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });

  // Left & Right continuous edge stripes at x = +/- 9.2m
  const stripeGeo = new THREE.PlaneGeometry(0.18, 44);
  for (const xPos of [-9.2, 9.2]) {
    const stripe = new THREE.Mesh(stripeGeo, paintWhiteMat);
    stripe.rotation.x = -Math.PI / 2;
    stripe.position.set(xPos, 0.007, 0);
    stripe.receiveShadow = true;
    root.add(stripe);
  }

  // Centerline dashed proving-ground markers
  const dashGeo = new THREE.PlaneGeometry(0.14, 1.8);
  for (let z = -18; z <= 18; z += 4.5) {
    const dash = new THREE.Mesh(dashGeo, paintYellowMat);
    dash.rotation.x = -Math.PI / 2;
    dash.position.set(0, 0.007, z);
    root.add(dash);
  }

  // Start / Test Gate transverse threshold bars at z = 6
  const gateBarGeo = new THREE.PlaneGeometry(18.4, 0.24);
  const gateBar = new THREE.Mesh(gateBarGeo, paintWhiteMat);
  gateBar.rotation.x = -Math.PI / 2;
  gateBar.position.set(0, 0.007, 6);
  root.add(gateBar);

  // FIA Red/White Rumble Kerbs at x = +/- 9.95m
  const kerbMat = new THREE.MeshStandardMaterial({
    map: kerbTex,
    roughness: 0.72,
    metalness: 0.02,
  });
  const kerbGeo = new THREE.BoxGeometry(1.15, 0.048, 44);
  for (const xPos of [-9.95, 9.95]) {
    const kerb = new THREE.Mesh(kerbGeo, kerbMat);
    kerb.position.set(xPos, 0.022, 0);
    kerb.receiveShadow = true;
    kerb.castShadow = true;
    root.add(kerb);
  }

  // Steel Armco Perimeter Guardrails at x = +/- 14.5m
  const steelPostMat = new THREE.MeshStandardMaterial({
    color: 0x64748b,
    roughness: 0.35,
    metalness: 0.82,
  });
  const railMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    roughness: 0.3,
    metalness: 0.86,
  });
  const postGeo = new THREE.BoxGeometry(0.12, 0.72, 0.12);
  const railGeo = new THREE.BoxGeometry(0.09, 0.28, 44);

  for (const xPos of [-14.5, 14.5]) {
    const rail = new THREE.Mesh(railGeo, railMat);
    rail.position.set(xPos, 0.52, 0);
    rail.castShadow = true;
    rail.receiveShadow = true;
    root.add(rail);

    for (let z = -20; z <= 20; z += 4) {
      const post = new THREE.Mesh(postGeo, steelPostMat);
      post.position.set(xPos + (xPos > 0 ? 0.08 : -0.08), 0.36, z);
      post.castShadow = true;
      post.receiveShadow = true;
      root.add(post);
    }
  }

  const dispose = () => {
    asphaltMap.dispose();
    asphaltRoughMap.dispose();
    kerbTex.dispose();
    root.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.GridHelper) {
        obj.geometry?.dispose();
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        for (const m of mats) m?.dispose();
      }
    });
  };

  return { root, groundPlaneMesh, gridHelper, dispose };
}
