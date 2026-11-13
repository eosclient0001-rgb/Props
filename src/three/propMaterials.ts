import * as THREE from 'three';

export interface PropPalette {
  textures: {
    rubberMap: THREE.CanvasTexture;
    retroMap: THREE.CanvasTexture;
    carbonMap: THREE.CanvasTexture;
    contactShadowMap: THREE.CanvasTexture;
    tireSideMap: THREE.CanvasTexture;
    hazardRedWhiteMap: THREE.CanvasTexture;
    hazardYellowBlackMap: THREE.CanvasTexture;
    brake100Map: THREE.CanvasTexture;
    pitLimit60Map: THREE.CanvasTexture;
    speedRadarMap: THREE.CanvasTexture;
    telemetryScreenMap: THREE.CanvasTexture;
    woodCrateMap: THREE.CanvasTexture;
    fuelPumpScreenMap: THREE.CanvasTexture;
    evChargerScreenMap: THREE.CanvasTexture;
    lapTowerMap: THREE.CanvasTexture;
    pitLollipopMap: THREE.CanvasTexture;
    gridSlotMap: THREE.CanvasTexture;
    firstAidCrossMap: THREE.CanvasTexture;
    bicolorLedMap: THREE.CanvasTexture;
    skyPanelGlowMap: THREE.CanvasTexture;
    marshalFlagLedMap: THREE.CanvasTexture;
    quadMonitorMap: THREE.CanvasTexture;
    drsSignMap: THREE.CanvasTexture;
    ecuLaptopScreenMap: THREE.CanvasTexture;
    hvBoltPlateMap: THREE.CanvasTexture;
  };
  materials: {
    rubberDark: THREE.MeshStandardMaterial;
    carbonWeave: THREE.MeshStandardMaterial;
    matteBlack: THREE.MeshStandardMaterial;
    anodizedBlack: THREE.MeshStandardMaterial;
    gunmetal: THREE.MeshStandardMaterial;
    brushedSteel: THREE.MeshStandardMaterial;
    chrome: THREE.MeshStandardMaterial;
    brass: THREE.MeshStandardMaterial;
    copperWinding: THREE.MeshStandardMaterial;
    hdpeOrange: THREE.MeshStandardMaterial;
    polymerOrange: THREE.MeshStandardMaterial;
    limeSafety: THREE.MeshStandardMaterial;
    fiaRed: THREE.MeshStandardMaterial;
    fiaBlue: THREE.MeshStandardMaterial;
    safetyYellow: THREE.MeshStandardMaterial;
    pureWhite: THREE.MeshStandardMaterial;
    darkSlate: THREE.MeshStandardMaterial;
    retroWhite: THREE.MeshStandardMaterial;
    hazardRedWhite: THREE.MeshStandardMaterial;
    hazardYellowBlack: THREE.MeshStandardMaterial;
    tireBlack: THREE.MeshStandardMaterial;
    tireWhite: THREE.MeshStandardMaterial;
    tireRed: THREE.MeshStandardMaterial;
    brake100: THREE.MeshStandardMaterial;
    pitLimit60: THREE.MeshStandardMaterial;
    speedRadar: THREE.MeshStandardMaterial;
    telemetryScreen: THREE.MeshStandardMaterial;
    woodCrate: THREE.MeshStandardMaterial;
    fuelPumpScreen: THREE.MeshStandardMaterial;
    evChargerScreen: THREE.MeshStandardMaterial;
    lapTowerScreen: THREE.MeshStandardMaterial;
    pitLollipop: THREE.MeshStandardMaterial;
    gridSlotSign: THREE.MeshStandardMaterial;
    firstAidPlate: THREE.MeshStandardMaterial;
    bicolorLed: THREE.MeshStandardMaterial;
    skyPanelGlow: THREE.MeshStandardMaterial;
    marshalFlagLed: THREE.MeshStandardMaterial;
    quadMonitor: THREE.MeshStandardMaterial;
    drsSign: THREE.MeshStandardMaterial;
    ecuLaptopScreen: THREE.MeshStandardMaterial;
    hvBoltPlate: THREE.MeshStandardMaterial;
    oliveSteel: THREE.MeshStandardMaterial;
    amberBeacon: THREE.MeshStandardMaterial;
    cyanLed: THREE.MeshStandardMaterial;
    emeraldLed: THREE.MeshStandardMaterial;
    rubyLens: THREE.MeshStandardMaterial;
    opticalGlass: THREE.MeshStandardMaterial;
    ledFlood: THREE.MeshStandardMaterial;
    warmCobGlow: THREE.MeshStandardMaterial;
    diffusionFabric: THREE.MeshStandardMaterial;
    solarCell: THREE.MeshStandardMaterial;
  };
  sharedMatSet: Set<THREE.Material>;
  sharedTexSet: Set<THREE.Texture>;
}

let cachedPalette: PropPalette | null = null;

function createCanvas(w: number, h = w): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2D canvas unavailable');
  return [canvas, ctx];
}

function makeBrakeBoardTexture(numText: string, accentColor: string, maxAnisotropy: number): THREE.CanvasTexture {
  const [canvas, ctx] = createCanvas(512, 352);
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, 512, 352);
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 8;
  ctx.strokeRect(4, 4, 504, 344);

  ctx.fillStyle = accentColor;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(125, 0);
  ctx.lineTo(0, 125);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(512, 352);
  ctx.lineTo(387, 352);
  ctx.lineTo(512, 227);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#0f172a';
  ctx.font = '800 184px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(numText, 256, 166);

  ctx.fillStyle = '#475569';
  ctx.font = '700 28px system-ui, -apple-system, sans-serif';
  ctx.fillText('METERS · BRAKE ZONE', 256, 294);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

function makeChevronTexture(bg: string, stripe: string, maxAnisotropy: number): THREE.CanvasTexture {
  const [canvas, ctx] = createCanvas(256, 64);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 256, 64);
  ctx.fillStyle = stripe;
  for (let x = -64; x < 320; x += 48) {
    ctx.beginPath();
    ctx.moveTo(x, 64);
    ctx.lineTo(x + 24, 64);
    ctx.lineTo(x + 56, 0);
    ctx.lineTo(x + 32, 0);
    ctx.closePath();
    ctx.fill();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.repeat.set(2, 1);
  tex.anisotropy = maxAnisotropy;
  return tex;
}

export function getPropPalette(maxAnisotropy = 4): PropPalette {
  if (cachedPalette) return cachedPalette;

  // Rubber grain
  const [rCan, rCtx] = createCanvas(128);
  rCtx.fillStyle = '#1d222b';
  rCtx.fillRect(0, 0, 128, 128);
  for (let y = 0; y < 128; y += 2) {
    for (let x = 0; x < 128; x += 2) {
      const n = ((x * 37 + y * 91) % 23) - 11;
      const v = Math.max(18, Math.min(46, 30 + n));
      rCtx.fillStyle = `rgb(${v}, ${v + 3}, ${v + 8})`;
      rCtx.fillRect(x, y, 2, 2);
    }
  }
  const rubberMap = new THREE.CanvasTexture(rCan);
  rubberMap.colorSpace = THREE.SRGBColorSpace;
  rubberMap.wrapS = THREE.RepeatWrapping;
  rubberMap.wrapT = THREE.RepeatWrapping;
  rubberMap.repeat.set(3, 3);
  rubberMap.anisotropy = maxAnisotropy;

  // Prismatic diamond retroreflective
  const [fCan, fCtx] = createCanvas(128);
  fCtx.fillStyle = '#f8fafc';
  fCtx.fillRect(0, 0, 128, 128);
  fCtx.strokeStyle = 'rgba(148, 163, 184, 0.38)';
  fCtx.lineWidth = 1;
  for (let y = -16; y <= 144; y += 16) {
    for (let x = -16; x <= 144; x += 16) {
      fCtx.beginPath();
      fCtx.moveTo(x, y + 8);
      fCtx.lineTo(x + 8, y);
      fCtx.lineTo(x + 16, y + 8);
      fCtx.lineTo(x + 8, y + 16);
      fCtx.closePath();
      fCtx.stroke();
    }
  }
  const retroMap = new THREE.CanvasTexture(fCan);
  retroMap.colorSpace = THREE.SRGBColorSpace;
  retroMap.wrapS = THREE.RepeatWrapping;
  retroMap.wrapT = THREE.RepeatWrapping;
  retroMap.repeat.set(6, 1.5);
  retroMap.anisotropy = maxAnisotropy;

  // Carbon weave
  const [cCan, cCtx] = createCanvas(64);
  cCtx.fillStyle = '#181e28';
  cCtx.fillRect(0, 0, 64, 64);
  for (let y = 0; y < 64; y += 8) {
    for (let x = 0; x < 64; x += 8) {
      cCtx.fillStyle = (x + y) % 16 === 0 ? '#27303f' : '#121720';
      cCtx.fillRect(x, y, 6, 4);
    }
  }
  const carbonMap = new THREE.CanvasTexture(cCan);
  carbonMap.colorSpace = THREE.SRGBColorSpace;
  carbonMap.wrapS = THREE.RepeatWrapping;
  carbonMap.wrapT = THREE.RepeatWrapping;
  carbonMap.repeat.set(4, 2);
  carbonMap.anisotropy = maxAnisotropy;

  // Contact shadow
  const [sCan, sCtx] = createCanvas(128);
  const grad = sCtx.createRadialGradient(64, 64, 8, 64, 64, 62);
  grad.addColorStop(0, 'rgba(3, 6, 12, 0.72)');
  grad.addColorStop(0.52, 'rgba(3, 6, 12, 0.34)');
  grad.addColorStop(1, 'rgba(3, 6, 12, 0)');
  sCtx.fillStyle = grad;
  sCtx.fillRect(0, 0, 128, 128);
  const contactShadowMap = new THREE.CanvasTexture(sCan);
  contactShadowMap.colorSpace = THREE.SRGBColorSpace;

  // Tire tread & sidewall (neutral light gray so color tints cleanly)
  const [tCan, tCtx] = createCanvas(256, 128);
  tCtx.fillStyle = '#c8cfd8';
  tCtx.fillRect(0, 0, 256, 128);
  for (let x = 0; x < 256; x += 16) {
    tCtx.fillStyle = '#9aa3b0';
    tCtx.fillRect(x, 38, 4, 52);
  }
  tCtx.fillStyle = '#828c9b';
  tCtx.fillRect(0, 50, 256, 4);
  tCtx.fillRect(0, 74, 256, 4);
  for (let i = 0; i < 1800; i++) {
    const px = (i * 53) % 256;
    const py = (i * 29) % 128;
    tCtx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.12)' : 'rgba(15,23,42,0.16)';
    tCtx.fillRect(px, py, 2, 2);
  }
  const tireSideMap = new THREE.CanvasTexture(tCan);
  tireSideMap.colorSpace = THREE.SRGBColorSpace;
  tireSideMap.wrapS = THREE.RepeatWrapping;
  tireSideMap.wrapT = THREE.ClampToEdgeWrapping;
  tireSideMap.repeat.set(4, 1);
  tireSideMap.anisotropy = maxAnisotropy;

  const hazardRedWhiteMap = makeChevronTexture('#f8fafc', '#dc2626', maxAnisotropy);
  const hazardYellowBlackMap = makeChevronTexture('#facc15', '#111827', maxAnisotropy);
  const brake100Map = makeBrakeBoardTexture('100', '#dc2626', maxAnisotropy);

  // Pit limit 60 sign
  const [pCan, pCtx] = createCanvas(256, 320);
  pCtx.fillStyle = '#f8fafc';
  pCtx.fillRect(0, 0, 256, 320);
  pCtx.strokeStyle = '#dc2626';
  pCtx.lineWidth = 22;
  pCtx.beginPath();
  pCtx.arc(128, 128, 86, 0, Math.PI * 2);
  pCtx.stroke();
  pCtx.fillStyle = '#0f172a';
  pCtx.font = '800 96px system-ui, -apple-system, sans-serif';
  pCtx.textAlign = 'center';
  pCtx.textBaseline = 'middle';
  pCtx.fillText('60', 128, 132);
  pCtx.fillStyle = '#dc2626';
  pCtx.fillRect(20, 242, 216, 54);
  pCtx.fillStyle = '#ffffff';
  pCtx.font = '800 28px system-ui, -apple-system, sans-serif';
  pCtx.fillText('PIT LANE LIMIT', 128, 270);
  const pitLimit60Map = new THREE.CanvasTexture(pCan);
  pitLimit60Map.colorSpace = THREE.SRGBColorSpace;
  pitLimit60Map.anisotropy = maxAnisotropy;

  // Digital Speed Trap Radar sign
  const [radCan, radCtx] = createCanvas(256, 320);
  radCtx.fillStyle = '#0b0f17';
  radCtx.fillRect(0, 0, 256, 320);
  radCtx.fillStyle = '#facc15';
  radCtx.fillRect(14, 14, 228, 56);
  radCtx.fillStyle = '#0f172a';
  radCtx.font = '800 26px system-ui, -apple-system, sans-serif';
  radCtx.textAlign = 'center';
  radCtx.textBaseline = 'middle';
  radCtx.fillText('TRAP SPEED', 128, 44);
  radCtx.fillStyle = '#111827';
  radCtx.fillRect(18, 86, 220, 170);
  radCtx.fillStyle = '#f59e0b';
  radCtx.font = '800 104px monospace';
  radCtx.fillText('184', 128, 168);
  radCtx.fillStyle = '#94a3b8';
  radCtx.font = '700 24px system-ui, -apple-system, sans-serif';
  radCtx.fillText('KM / H', 128, 286);
  const speedRadarMap = new THREE.CanvasTexture(radCan);
  speedRadarMap.colorSpace = THREE.SRGBColorSpace;
  speedRadarMap.anisotropy = maxAnisotropy;

  // Telemetry monitor display
  const [telCan, telCtx] = createCanvas(256, 160);
  telCtx.fillStyle = '#07111d';
  telCtx.fillRect(0, 0, 256, 160);
  telCtx.strokeStyle = '#1e293b';
  telCtx.lineWidth = 1;
  for (let gx = 0; gx < 256; gx += 32) {
    telCtx.beginPath();
    telCtx.moveTo(gx, 0);
    telCtx.lineTo(gx, 160);
    telCtx.stroke();
  }
  for (let gy = 0; gy < 160; gy += 32) {
    telCtx.beginPath();
    telCtx.moveTo(0, gy);
    telCtx.lineTo(256, gy);
    telCtx.stroke();
  }
  telCtx.strokeStyle = '#22d3ee';
  telCtx.lineWidth = 3;
  telCtx.beginPath();
  telCtx.moveTo(10, 120);
  telCtx.lineTo(60, 72);
  telCtx.lineTo(115, 92);
  telCtx.lineTo(175, 38);
  telCtx.lineTo(245, 52);
  telCtx.stroke();
  telCtx.strokeStyle = '#f97316';
  telCtx.lineWidth = 2.5;
  telCtx.beginPath();
  telCtx.moveTo(10, 134);
  telCtx.lineTo(75, 112);
  telCtx.lineTo(140, 62);
  telCtx.lineTo(210, 88);
  telCtx.lineTo(245, 44);
  telCtx.stroke();
  telCtx.fillStyle = '#e2e8f0';
  telCtx.font = '700 14px monospace';
  telCtx.fillText('S1 28.412  S2 34.109', 14, 22);
  const telemetryScreenMap = new THREE.CanvasTexture(telCan);
  telemetryScreenMap.colorSpace = THREE.SRGBColorSpace;
  telemetryScreenMap.anisotropy = maxAnisotropy;

  // Timber cargo crate planks
  const [wCan, wCtx] = createCanvas(256, 256);
  wCtx.fillStyle = '#a87c4f';
  wCtx.fillRect(0, 0, 256, 256);
  for (let y = 0; y < 256; y += 42) {
    wCtx.fillStyle = y % 84 === 0 ? '#9c7145' : '#b28556';
    wCtx.fillRect(0, y, 256, 40);
    wCtx.fillStyle = '#5c3f24';
    wCtx.fillRect(0, y + 40, 256, 2);
  }
  wCtx.strokeStyle = '#755331';
  wCtx.lineWidth = 18;
  wCtx.strokeRect(9, 9, 238, 238);
  const woodCrateMap = new THREE.CanvasTexture(wCan);
  woodCrateMap.colorSpace = THREE.SRGBColorSpace;
  woodCrateMap.anisotropy = maxAnisotropy;

  // Racing Fuel Pump digital display
  const [fpCan, fpCtx] = createCanvas(256, 160);
  fpCtx.fillStyle = '#090d14';
  fpCtx.fillRect(0, 0, 256, 160);
  fpCtx.fillStyle = '#dc2626';
  fpCtx.fillRect(0, 0, 256, 36);
  fpCtx.fillStyle = '#ffffff';
  fpCtx.font = '800 20px system-ui, sans-serif';
  fpCtx.textAlign = 'center';
  fpCtx.fillText('102 OCT RACE FUEL', 128, 25);
  fpCtx.fillStyle = '#111827';
  fpCtx.fillRect(14, 48, 228, 52);
  fpCtx.fillStyle = '#facc15';
  fpCtx.font = '800 36px monospace';
  fpCtx.fillText('48.50 L', 128, 86);
  fpCtx.fillStyle = '#94a3b8';
  fpCtx.font = '700 18px monospace';
  fpCtx.fillText('FLOW: 3.2 L/SEC', 128, 134);
  const fuelPumpScreenMap = new THREE.CanvasTexture(fpCan);
  fuelPumpScreenMap.colorSpace = THREE.SRGBColorSpace;
  fuelPumpScreenMap.anisotropy = maxAnisotropy;

  // 800V EV Fast Charger screen
  const [evCan, evCtx] = createCanvas(256, 256);
  evCtx.fillStyle = '#07131e';
  evCtx.fillRect(0, 0, 256, 256);
  evCtx.fillStyle = '#06b6d4';
  evCtx.fillRect(0, 0, 256, 40);
  evCtx.fillStyle = '#042f2e';
  evCtx.font = '800 20px system-ui, sans-serif';
  evCtx.textAlign = 'center';
  evCtx.fillText('800V DC FAST CHARGE', 128, 27);
  evCtx.strokeStyle = '#10b981';
  evCtx.lineWidth = 10;
  evCtx.beginPath();
  evCtx.arc(128, 128, 52, -Math.PI * 0.85, Math.PI * 0.72);
  evCtx.stroke();
  evCtx.fillStyle = '#ecfdf5';
  evCtx.font = '800 38px monospace';
  evCtx.fillText('94%', 128, 140);
  evCtx.fillStyle = '#38bdf8';
  evCtx.font = '700 22px monospace';
  evCtx.fillText('350 kW ACTIVE', 128, 224);
  const evChargerScreenMap = new THREE.CanvasTexture(evCan);
  evChargerScreenMap.colorSpace = THREE.SRGBColorSpace;
  evChargerScreenMap.anisotropy = maxAnisotropy;

  // LED Lap & Sector Leaderboard Totem
  const [ltCan, ltCtx] = createCanvas(256, 512);
  ltCtx.fillStyle = '#090d16';
  ltCtx.fillRect(0, 0, 256, 512);
  ltCtx.fillStyle = '#facc15';
  ltCtx.fillRect(12, 12, 232, 54);
  ltCtx.fillStyle = '#0f172a';
  ltCtx.font = '800 28px system-ui, sans-serif';
  ltCtx.textAlign = 'center';
  ltCtx.fillText('TIMING · LIVE', 128, 48);
  const rows = [
    ['P1', '1:18.42', '#10b981'],
    ['P2', '+0.312', '#f8fafc'],
    ['P3', '+0.684', '#f8fafc'],
    ['P4', '+1.105', '#cbd5e1'],
    ['P5', 'PIT IN', '#f59e0b'],
  ];
  ltCtx.textAlign = 'left';
  rows.forEach(([pos, val, col], idx) => {
    const ry = 92 + idx * 78;
    ltCtx.fillStyle = '#131b2b';
    ltCtx.fillRect(14, ry, 228, 64);
    ltCtx.fillStyle = '#facc15';
    ltCtx.font = '800 28px monospace';
    ltCtx.fillText(pos, 26, ry + 42);
    ltCtx.fillStyle = col;
    ltCtx.font = '700 28px monospace';
    ltCtx.fillText(val, 92, ry + 42);
  });
  const lapTowerMap = new THREE.CanvasTexture(ltCan);
  lapTowerMap.colorSpace = THREE.SRGBColorSpace;
  lapTowerMap.anisotropy = maxAnisotropy;

  // Pit Lollipop BOX NOW Paddle
  const [lolCan, lolCtx] = createCanvas(256, 256);
  lolCtx.fillStyle = '#dc2626';
  lolCtx.fillRect(0, 0, 256, 256);
  lolCtx.strokeStyle = '#ffffff';
  lolCtx.lineWidth = 14;
  lolCtx.strokeRect(12, 12, 232, 232);
  lolCtx.fillStyle = '#ffffff';
  lolCtx.font = '900 72px system-ui, sans-serif';
  lolCtx.textAlign = 'center';
  lolCtx.fillText('BOX', 128, 118);
  lolCtx.fillStyle = '#facc15';
  lolCtx.font = '900 54px system-ui, sans-serif';
  lolCtx.fillText('NOW', 128, 186);
  const pitLollipopMap = new THREE.CanvasTexture(lolCan);
  pitLollipopMap.colorSpace = THREE.SRGBColorSpace;
  pitLollipopMap.anisotropy = maxAnisotropy;

  // Grid Slot 01 Position Plate
  const [grCan, grCtx] = createCanvas(256, 256);
  grCtx.fillStyle = '#111827';
  grCtx.fillRect(0, 0, 256, 256);
  grCtx.fillStyle = '#facc15';
  grCtx.fillRect(0, 0, 256, 54);
  grCtx.fillStyle = '#0f172a';
  grCtx.font = '900 30px system-ui, sans-serif';
  grCtx.textAlign = 'center';
  grCtx.fillText('GRID SLOT', 128, 38);
  grCtx.fillStyle = '#f8fafc';
  grCtx.font = '900 124px system-ui, sans-serif';
  grCtx.fillText('01', 128, 192);
  const gridSlotMap = new THREE.CanvasTexture(grCan);
  gridSlotMap.colorSpace = THREE.SRGBColorSpace;
  gridSlotMap.anisotropy = maxAnisotropy;

  // First Aid Medical Cross
  const [faCan, faCtx] = createCanvas(128, 128);
  faCtx.fillStyle = '#dc2626';
  faCtx.fillRect(0, 0, 128, 128);
  faCtx.fillStyle = '#ffffff';
  faCtx.fillRect(48, 22, 32, 84);
  faCtx.fillRect(22, 48, 84, 32);
  const firstAidCrossMap = new THREE.CanvasTexture(faCan);
  firstAidCrossMap.colorSpace = THREE.SRGBColorSpace;
  firstAidCrossMap.anisotropy = maxAnisotropy;

  // Bi-Color Studio 1x1 LED Diode Matrix (5600K + 3200K emitters)
  const [biCan, biCtx] = createCanvas(256, 256);
  biCtx.fillStyle = '#1e293b';
  biCtx.fillRect(0, 0, 256, 256);
  for (let y = 12; y < 246; y += 18) {
    for (let x = 12; x < 246; x += 18) {
      const warm = ((x + y) / 18) % 2 === 0;
      biCtx.fillStyle = warm ? '#fde68a' : '#f0f9ff';
      biCtx.beginPath();
      biCtx.arc(x + 4, y + 4, 5.5, 0, Math.PI * 2);
      biCtx.fill();
    }
  }
  const bicolorLedMap = new THREE.CanvasTexture(biCan);
  bicolorLedMap.colorSpace = THREE.SRGBColorSpace;
  bicolorLedMap.anisotropy = maxAnisotropy;

  // RGBWW SkyPanel Cinema Diffuser Glow
  const [skyCan, skyCtx] = createCanvas(256, 128);
  const skyGrad = skyCtx.createLinearGradient(0, 0, 256, 128);
  skyGrad.addColorStop(0, '#e0f2fe');
  skyGrad.addColorStop(0.5, '#fefce8');
  skyGrad.addColorStop(1, '#cffafe');
  skyCtx.fillStyle = skyGrad;
  skyCtx.fillRect(0, 0, 256, 128);
  skyCtx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
  skyCtx.lineWidth = 2;
  for (let gx = 32; gx < 256; gx += 32) {
    skyCtx.beginPath();
    skyCtx.moveTo(gx, 0);
    skyCtx.lineTo(gx, 128);
    skyCtx.stroke();
  }
  const skyPanelGlowMap = new THREE.CanvasTexture(skyCan);
  skyPanelGlowMap.colorSpace = THREE.SRGBColorSpace;
  skyPanelGlowMap.anisotropy = maxAnisotropy;

  // Trackside FIA Marshal LED Warning Matrix (Amber Caution Chevron)
  const [mfCan, mfCtx] = createCanvas(256, 256);
  mfCtx.fillStyle = '#090d14';
  mfCtx.fillRect(0, 0, 256, 256);
  for (let gy = 14; gy < 244; gy += 16) {
    for (let gx = 14; gx < 244; gx += 16) {
      const inChev = Math.abs(gy - 128) < 88 && Math.abs(gx - (128 + (88 - Math.abs(gy - 128)) * 0.45)) < 42;
      mfCtx.fillStyle = inChev ? '#facc15' : '#1e293b';
      mfCtx.beginPath();
      mfCtx.arc(gx, gy, 5, 0, Math.PI * 2);
      mfCtx.fill();
    }
  }
  const marshalFlagLedMap = new THREE.CanvasTexture(mfCan);
  marshalFlagLedMap.colorSpace = THREE.SRGBColorSpace;
  marshalFlagLedMap.anisotropy = maxAnisotropy;

  // Quad-View Director Video Village Broadcast Monitor
  const [qmCan, qmCtx] = createCanvas(512, 320);
  qmCtx.fillStyle = '#050911';
  qmCtx.fillRect(0, 0, 512, 320);
  const quadFeeds = [
    ['CAM 01 · APEX', '#38bdf8', 12, 12],
    ['CAM 02 · GIMBAL', '#10b981', 260, 12],
    ['CAM 03 · DOLLY', '#f59e0b', 12, 164],
    ['CAM 04 · PHANTOM', '#f43f5e', 260, 164],
  ] as const;
  quadFeeds.forEach(([label, col, qx, qy]) => {
    qmCtx.fillStyle = '#0f172a';
    qmCtx.fillRect(qx, qy, 240, 144);
    qmCtx.strokeStyle = '#334155';
    qmCtx.lineWidth = 2;
    qmCtx.strokeRect(qx, qy, 240, 144);
    // Simulated horizon & tarmac lane graphic
    qmCtx.fillStyle = '#1e293b';
    qmCtx.fillRect(qx + 4, qy + 68, 232, 72);
    qmCtx.strokeStyle = col;
    qmCtx.lineWidth = 3;
    qmCtx.beginPath();
    qmCtx.moveTo(qx + 16, qy + 132);
    qmCtx.lineTo(qx + 96, qy + 72);
    qmCtx.lineTo(qx + 150, qy + 72);
    qmCtx.lineTo(qx + 224, qy + 132);
    qmCtx.stroke();
    // Telemetry HUD tag
    qmCtx.fillStyle = 'rgba(2, 6, 23, 0.85)';
    qmCtx.fillRect(qx + 8, qy + 8, 134, 22);
    qmCtx.fillStyle = col;
    qmCtx.font = '700 13px monospace';
    qmCtx.fillText(label, qx + 14, qy + 23);
  });
  const quadMonitorMap = new THREE.CanvasTexture(qmCan);
  quadMonitorMap.colorSpace = THREE.SRGBColorSpace;
  quadMonitorMap.anisotropy = maxAnisotropy;

  // DRS Zone Detection Sign
  const [drsCan, drsCtx] = createCanvas(256, 160);
  drsCtx.fillStyle = '#0f172a';
  drsCtx.fillRect(0, 0, 256, 160);
  drsCtx.strokeStyle = '#10b981';
  drsCtx.lineWidth = 10;
  drsCtx.strokeRect(8, 8, 240, 144);
  drsCtx.fillStyle = '#10b981';
  drsCtx.font = '900 72px system-ui, sans-serif';
  drsCtx.textAlign = 'center';
  drsCtx.fillText('DRS', 128, 88);
  drsCtx.fillStyle = '#e2e8f0';
  drsCtx.font = '700 20px system-ui, sans-serif';
  drsCtx.fillText('DETECTION ZONE', 128, 128);
  const drsSignMap = new THREE.CanvasTexture(drsCan);
  drsSignMap.colorSpace = THREE.SRGBColorSpace;
  drsSignMap.anisotropy = maxAnisotropy;

  // ECU Dyno Diagnostic Laptop Display
  const [ecuCan, ecuCtx] = createCanvas(256, 160);
  ecuCtx.fillStyle = '#06111c';
  ecuCtx.fillRect(0, 0, 256, 160);
  ecuCtx.fillStyle = '#0f2942';
  ecuCtx.fillRect(0, 0, 256, 26);
  ecuCtx.fillStyle = '#38bdf8';
  ecuCtx.font = '700 13px monospace';
  ecuCtx.fillText('ECU TELEMETRY · MAP 04', 10, 17);
  ecuCtx.strokeStyle = '#10b981';
  ecuCtx.lineWidth = 3;
  ecuCtx.beginPath();
  ecuCtx.moveTo(14, 132);
  ecuCtx.quadraticCurveTo(96, 46, 242, 42);
  ecuCtx.stroke();
  ecuCtx.strokeStyle = '#f97316';
  ecuCtx.lineWidth = 2.5;
  ecuCtx.beginPath();
  ecuCtx.moveTo(14, 108);
  ecuCtx.quadraticCurveTo(120, 62, 242, 92);
  ecuCtx.stroke();
  ecuCtx.fillStyle = '#f8fafc';
  ecuCtx.font = '700 14px monospace';
  ecuCtx.fillText('RPM 8420   BOOST 1.8 BAR', 14, 148);
  const ecuLaptopScreenMap = new THREE.CanvasTexture(ecuCan);
  ecuLaptopScreenMap.colorSpace = THREE.SRGBColorSpace;
  ecuLaptopScreenMap.anisotropy = maxAnisotropy;

  // HV Battery Safety Triangle Emblem
  const [hvCan, hvCtx] = createCanvas(128, 128);
  hvCtx.fillStyle = '#facc15';
  hvCtx.fillRect(0, 0, 128, 128);
  hvCtx.strokeStyle = '#0f172a';
  hvCtx.lineWidth = 8;
  hvCtx.strokeRect(4, 4, 120, 120);
  hvCtx.fillStyle = '#0f172a';
  hvCtx.beginPath();
  hvCtx.moveTo(72, 16);
  hvCtx.lineTo(38, 70);
  hvCtx.lineTo(62, 70);
  hvCtx.lineTo(52, 112);
  hvCtx.lineTo(90, 56);
  hvCtx.lineTo(66, 56);
  hvCtx.closePath();
  hvCtx.fill();
  const hvBoltPlateMap = new THREE.CanvasTexture(hvCan);
  hvBoltPlateMap.colorSpace = THREE.SRGBColorSpace;
  hvBoltPlateMap.anisotropy = maxAnisotropy;

  const textures = {
    rubberMap,
    retroMap,
    carbonMap,
    contactShadowMap,
    tireSideMap,
    hazardRedWhiteMap,
    hazardYellowBlackMap,
    brake100Map,
    pitLimit60Map,
    speedRadarMap,
    telemetryScreenMap,
    woodCrateMap,
    fuelPumpScreenMap,
    evChargerScreenMap,
    lapTowerMap,
    pitLollipopMap,
    gridSlotMap,
    firstAidCrossMap,
    bicolorLedMap,
    skyPanelGlowMap,
    marshalFlagLedMap,
    quadMonitorMap,
    drsSignMap,
    ecuLaptopScreenMap,
    hvBoltPlateMap,
  };

  const materials = {
    rubberDark: new THREE.MeshStandardMaterial({
      map: rubberMap,
      color: 0x242a34,
      roughness: 0.88,
      metalness: 0.04,
    }),
    carbonWeave: new THREE.MeshStandardMaterial({
      map: carbonMap,
      color: 0x262d3a,
      roughness: 0.65,
      metalness: 0.12,
    }),
    matteBlack: new THREE.MeshStandardMaterial({
      color: 0x131720,
      roughness: 0.78,
      metalness: 0.06,
    }),
    anodizedBlack: new THREE.MeshStandardMaterial({
      color: 0x1d2430,
      roughness: 0.34,
      metalness: 0.78,
    }),
    gunmetal: new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.36,
      metalness: 0.68,
    }),
    brushedSteel: new THREE.MeshStandardMaterial({
      color: 0xb8c3d4,
      roughness: 0.22,
      metalness: 0.88,
    }),
    chrome: new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.12,
      metalness: 0.95,
    }),
    brass: new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.28,
      metalness: 0.85,
    }),
    copperWinding: new THREE.MeshStandardMaterial({
      color: 0xb45309,
      roughness: 0.24,
      metalness: 0.88,
    }),
    hdpeOrange: new THREE.MeshStandardMaterial({
      color: 0xf97316,
      emissive: 0x7c2d12,
      emissiveIntensity: 0.14,
      roughness: 0.36,
      metalness: 0.02,
      side: THREE.DoubleSide,
    }),
    polymerOrange: new THREE.MeshStandardMaterial({
      color: 0xea580c,
      emissive: 0x7c2d12,
      emissiveIntensity: 0.12,
      roughness: 0.44,
      metalness: 0.04,
    }),
    limeSafety: new THREE.MeshStandardMaterial({
      color: 0xa3e635,
      emissive: 0x3f6212,
      emissiveIntensity: 0.14,
      roughness: 0.34,
      metalness: 0.03,
      side: THREE.DoubleSide,
    }),
    fiaRed: new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      emissive: 0x7f1d1d,
      emissiveIntensity: 0.14,
      roughness: 0.34,
      metalness: 0.06,
    }),
    fiaBlue: new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      emissive: 0x1e3a8a,
      emissiveIntensity: 0.12,
      roughness: 0.36,
      metalness: 0.08,
    }),
    safetyYellow: new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      emissive: 0x713f12,
      emissiveIntensity: 0.12,
      roughness: 0.36,
      metalness: 0.05,
    }),
    pureWhite: new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.42,
      metalness: 0.04,
    }),
    darkSlate: new THREE.MeshStandardMaterial({
      color: 0x2b3544,
      roughness: 0.48,
      metalness: 0.38,
    }),
    retroWhite: new THREE.MeshStandardMaterial({
      map: retroMap,
      color: 0xffffff,
      emissive: 0xe2e8f0,
      emissiveIntensity: 0.12,
      roughness: 0.14,
      metalness: 0.18,
    }),
    hazardRedWhite: new THREE.MeshStandardMaterial({
      map: hazardRedWhiteMap,
      color: 0xffffff,
      emissive: 0xe2e8f0,
      emissiveIntensity: 0.08,
      roughness: 0.2,
      metalness: 0.12,
    }),
    hazardYellowBlack: new THREE.MeshStandardMaterial({
      map: hazardYellowBlackMap,
      color: 0xffffff,
      roughness: 0.3,
      metalness: 0.08,
    }),
    tireBlack: new THREE.MeshStandardMaterial({
      map: tireSideMap,
      color: 0x262c36,
      roughness: 0.88,
      metalness: 0.03,
      side: THREE.DoubleSide,
    }),
    tireWhite: new THREE.MeshStandardMaterial({
      map: tireSideMap,
      color: 0xf1f5f9,
      roughness: 0.58,
      metalness: 0.02,
      side: THREE.DoubleSide,
    }),
    tireRed: new THREE.MeshStandardMaterial({
      map: tireSideMap,
      color: 0xef4444,
      emissive: 0x7f1d1d,
      emissiveIntensity: 0.14,
      roughness: 0.5,
      metalness: 0.02,
      side: THREE.DoubleSide,
    }),
    brake100: new THREE.MeshStandardMaterial({ map: brake100Map, roughness: 0.46, metalness: 0.04 }),
    pitLimit60: new THREE.MeshStandardMaterial({ map: pitLimit60Map, roughness: 0.44, metalness: 0.04 }),
    speedRadar: new THREE.MeshStandardMaterial({
      map: speedRadarMap,
      emissive: 0xf59e0b,
      emissiveMap: speedRadarMap,
      emissiveIntensity: 0.42,
      roughness: 0.28,
      metalness: 0.06,
    }),
    telemetryScreen: new THREE.MeshStandardMaterial({
      map: telemetryScreenMap,
      emissive: 0x22d3ee,
      emissiveMap: telemetryScreenMap,
      emissiveIntensity: 0.55,
      roughness: 0.22,
      metalness: 0.08,
    }),
    woodCrate: new THREE.MeshStandardMaterial({
      map: woodCrateMap,
      roughness: 0.82,
      metalness: 0.02,
    }),
    fuelPumpScreen: new THREE.MeshStandardMaterial({
      map: fuelPumpScreenMap,
      emissive: 0xfacc15,
      emissiveMap: fuelPumpScreenMap,
      emissiveIntensity: 0.35,
      roughness: 0.25,
      metalness: 0.06,
    }),
    evChargerScreen: new THREE.MeshStandardMaterial({
      map: evChargerScreenMap,
      emissive: 0x22d3ee,
      emissiveMap: evChargerScreenMap,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.08,
    }),
    lapTowerScreen: new THREE.MeshStandardMaterial({
      map: lapTowerMap,
      emissive: 0x38bdf8,
      emissiveMap: lapTowerMap,
      emissiveIntensity: 0.4,
      roughness: 0.22,
      metalness: 0.06,
    }),
    pitLollipop: new THREE.MeshStandardMaterial({
      map: pitLollipopMap,
      roughness: 0.42,
      metalness: 0.04,
    }),
    gridSlotSign: new THREE.MeshStandardMaterial({
      map: gridSlotMap,
      roughness: 0.42,
      metalness: 0.06,
    }),
    firstAidPlate: new THREE.MeshStandardMaterial({
      map: firstAidCrossMap,
      roughness: 0.36,
      metalness: 0.04,
    }),
    bicolorLed: new THREE.MeshStandardMaterial({
      map: bicolorLedMap,
      emissive: 0xfef3c7,
      emissiveMap: bicolorLedMap,
      emissiveIntensity: 0.88,
      roughness: 0.18,
      metalness: 0.08,
    }),
    skyPanelGlow: new THREE.MeshStandardMaterial({
      map: skyPanelGlowMap,
      emissive: 0xbae6fd,
      emissiveMap: skyPanelGlowMap,
      emissiveIntensity: 0.92,
      roughness: 0.24,
      metalness: 0.04,
    }),
    marshalFlagLed: new THREE.MeshStandardMaterial({
      map: marshalFlagLedMap,
      emissive: 0xfacc15,
      emissiveMap: marshalFlagLedMap,
      emissiveIntensity: 0.85,
      roughness: 0.22,
      metalness: 0.06,
    }),
    quadMonitor: new THREE.MeshStandardMaterial({
      map: quadMonitorMap,
      emissive: 0x38bdf8,
      emissiveMap: quadMonitorMap,
      emissiveIntensity: 0.45,
      roughness: 0.2,
      metalness: 0.06,
    }),
    drsSign: new THREE.MeshStandardMaterial({
      map: drsSignMap,
      roughness: 0.38,
      metalness: 0.08,
    }),
    ecuLaptopScreen: new THREE.MeshStandardMaterial({
      map: ecuLaptopScreenMap,
      emissive: 0x22d3ee,
      emissiveMap: ecuLaptopScreenMap,
      emissiveIntensity: 0.55,
      roughness: 0.22,
      metalness: 0.06,
    }),
    hvBoltPlate: new THREE.MeshStandardMaterial({
      map: hvBoltPlateMap,
      roughness: 0.34,
      metalness: 0.06,
    }),
    oliveSteel: new THREE.MeshStandardMaterial({
      color: 0x3f5e3b,
      roughness: 0.44,
      metalness: 0.35,
    }),
    amberBeacon: new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.52,
      roughness: 0.2,
      metalness: 0.12,
    }),
    cyanLed: new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.85,
      roughness: 0.15,
      metalness: 0.1,
    }),
    emeraldLed: new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.9,
      roughness: 0.14,
      metalness: 0.1,
    }),
    rubyLens: new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xdc2626,
      emissiveIntensity: 0.65,
      roughness: 0.08,
      metalness: 0.2,
    }),
    opticalGlass: new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.22,
      roughness: 0.06,
      metalness: 0.3,
    }),
    ledFlood: new THREE.MeshStandardMaterial({
      color: 0xfef9c3,
      emissive: 0xfef08a,
      emissiveIntensity: 0.95,
      roughness: 0.2,
      metalness: 0.05,
    }),
    warmCobGlow: new THREE.MeshStandardMaterial({
      color: 0xfffbeb,
      emissive: 0xfde68a,
      emissiveIntensity: 0.85,
      roughness: 0.32,
      metalness: 0.02,
    }),
    diffusionFabric: new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      emissive: 0xfef9c3,
      emissiveIntensity: 0.68,
      roughness: 0.55,
      metalness: 0.02,
    }),
    solarCell: new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      roughness: 0.18,
      metalness: 0.45,
    }),
  };

  const sharedMatSet = new Set<THREE.Material>(Object.values(materials));
  const sharedTexSet = new Set<THREE.Texture>(Object.values(textures));

  cachedPalette = { textures, materials, sharedMatSet, sharedTexSet };
  return cachedPalette;
}

export function createContactShadowMesh(
  radiusX: number,
  map: THREE.Texture,
  radiusZ = radiusX,
): THREE.Mesh {
  const geo = new THREE.PlaneGeometry(radiusX * 2, radiusZ * 2);
  geo.rotateX(-Math.PI / 2);
  const mat = new THREE.MeshBasicMaterial({
    map,
    transparent: true,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.y = 0.006;
  mesh.name = 'ContactShadow';
  return mesh;
}

export function createStrutBetween(
  a: THREE.Vector3,
  b: THREE.Vector3,
  radiusTop: number,
  radiusBottom: number,
  material: THREE.Material,
  radialSegments = 10,
): THREE.Mesh {
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = dir.length();
  const geo = new THREE.CylinderGeometry(radiusTop, radiusBottom, len, radialSegments);
  const mesh = new THREE.Mesh(geo, material);
  mesh.position.copy(a).add(b).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  return mesh;
}

export function enableShadows(group: THREE.Object3D): void {
  group.traverse((child) => {
    if (child instanceof THREE.Mesh && child.name !== 'ContactShadow') {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
}
