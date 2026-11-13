import * as THREE from 'three';
import {
  createContactShadowMesh,
  createStrutBetween,
  enableShadows,
  type PropPalette,
} from './propMaterials';

function buildTripodLegs(
  g: THREE.Group,
  p: PropPalette,
  yokeY: number,
  footRadius: number,
  dualTube = false,
): void {
  const m = p.materials;
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.055, 0.06, 18), m.anodizedBlack);
  hub.position.y = yokeY;
  g.add(hub);

  const spider = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.03, 0.04, 16), m.brushedSteel);
  spider.position.y = yokeY * 0.6;
  g.add(spider);

  for (let i = 0; i < 3; i++) {
    const a = (i * Math.PI * 2) / 3 + Math.PI / 6;
    const fx = Math.cos(a) * footRadius;
    const fz = Math.sin(a) * footRadius;

    const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.03, 0.024, 16), m.rubberDark);
    foot.position.set(fx, 0.012, fz);
    g.add(foot);

    const topP = new THREE.Vector3(Math.cos(a) * 0.04, yokeY - 0.01, Math.sin(a) * 0.04);
    const botP = new THREE.Vector3(fx, 0.02, fz);
    const midP = new THREE.Vector3().lerpVectors(topP, botP, 0.48);

    if (dualTube) {
      const perpX = -Math.sin(a) * 0.016;
      const perpZ = Math.cos(a) * 0.016;
      for (const s of [-1, 1]) {
        g.add(
          createStrutBetween(
            new THREE.Vector3(topP.x + perpX * s, topP.y, topP.z + perpZ * s),
            new THREE.Vector3(midP.x + perpX * s * 0.6, midP.y, midP.z + perpZ * s * 0.6),
            0.01,
            0.01,
            m.anodizedBlack,
            10,
          ),
        );
      }
      g.add(createStrutBetween(midP, botP, 0.013, 0.011, m.brushedSteel, 12));
    } else {
      g.add(createStrutBetween(topP, midP, 0.015, 0.014, m.anodizedBlack, 12));
      g.add(createStrutBetween(midP, botP, 0.011, 0.01, m.brushedSteel, 12));
    }

    const collar = createStrutBetween(
      new THREE.Vector3().lerpVectors(topP, botP, 0.45),
      new THREE.Vector3().lerpVectors(topP, botP, 0.52),
      0.019,
      0.019,
      m.rubberDark,
      14,
    );
    g.add(collar);

    const strutEnd = new THREE.Vector3().lerpVectors(topP, botP, 0.56);
    g.add(
      createStrutBetween(
        new THREE.Vector3(Math.cos(a) * 0.022, yokeY * 0.6, Math.sin(a) * 0.022),
        strutEnd,
        0.007,
        0.007,
        m.anodizedBlack,
        8,
      ),
    );
  }
}

function buildBrakeBoard(
  p: PropPalette,
  faceMat: THREE.Material,
): THREE.Group {
  const g = new THREE.Group();
  const m = p.materials;
  g.add(createContactShadowMesh(0.45, p.textures.contactShadowMap, 0.34));

  const basePlinth = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.044, 0.34), m.rubberDark);
  basePlinth.position.y = 0.022;
  g.add(basePlinth);

  const boltGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.014, 6);
  for (const bx of [-0.25, 0.25]) {
    for (const bz of [-0.11, 0.11]) {
      const bolt = new THREE.Mesh(boltGeo, m.brushedSteel);
      bolt.position.set(bx, 0.048, bz);
      g.add(bolt);
    }
  }

  const postGeo = new THREE.CylinderGeometry(0.016, 0.016, 1.06, 14);
  for (const px of [-0.21, 0.21]) {
    const post = new THREE.Mesh(postGeo, m.brushedSteel);
    post.position.set(px, 0.56, 0.03);
    post.rotation.x = -0.06;
    g.add(post);
    g.add(
      createStrutBetween(
        new THREE.Vector3(px, 0.04, -0.13),
        new THREE.Vector3(px, 0.62, -0.01),
        0.011,
        0.011,
        m.brushedSteel,
        10,
      ),
    );
  }

  const crossbar = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.013, 0.45, 12), m.brushedSteel);
  crossbar.rotation.z = Math.PI / 2;
  crossbar.position.set(0, 0.32, 0.045);
  g.add(crossbar);

  const boardGroup = new THREE.Group();
  boardGroup.position.set(0, 0.9, 0.025);
  boardGroup.rotation.x = -0.06;

  boardGroup.add(new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.46, 0.022), m.darkSlate));

  const hRailGeo = new THREE.BoxGeometry(0.68, 0.024, 0.032);
  for (const ry of [-0.23, 0.23]) {
    const rail = new THREE.Mesh(hRailGeo, m.brushedSteel);
    rail.position.y = ry;
    boardGroup.add(rail);
  }
  const vRailGeo = new THREE.BoxGeometry(0.024, 0.484, 0.032);
  for (const rx of [-0.33, 0.33]) {
    const rail = new THREE.Mesh(vRailGeo, m.brushedSteel);
    rail.position.x = rx;
    boardGroup.add(rail);
  }

  const faceGeo = new THREE.PlaneGeometry(0.64, 0.44);
  const frontFace = new THREE.Mesh(faceGeo, faceMat);
  frontFace.position.z = 0.0125;
  boardGroup.add(frontFace);

  const backFace = new THREE.Mesh(faceGeo, faceMat);
  backFace.position.z = -0.0125;
  backFace.rotation.y = Math.PI;
  boardGroup.add(backFace);

  const rivetGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.036, 10);
  for (const rx of [-0.3, 0.3]) {
    for (const ry of [-0.2, 0.2]) {
      const rivet = new THREE.Mesh(rivetGeo, m.brushedSteel);
      rivet.rotation.x = Math.PI / 2;
      rivet.position.set(rx, ry, 0);
      boardGroup.add(rivet);
    }
  }

  g.add(boardGroup);
  enableShadows(g);
  return g;
}

export function buildBroadcastProp(id: string, p: PropPalette): THREE.Group | null {
  const m = p.materials;
  const shadowTex = p.textures.contactShadowMap;

  switch (id) {
    case 'cinema_camera': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.46, shadowTex));
      buildTripodLegs(g, p, 0.96, 0.34, true);

      // Machined 3-spoke ground floor spreader & red anodized twist-lock leg clamps
      const spreaderHub = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.055, 0.025, 16), m.anodizedBlack);
      spreaderHub.position.y = 0.022;
      g.add(spreaderHub);
      for (let i = 0; i < 3; i++) {
        const a = (i * Math.PI * 2) / 3 + Math.PI / 6;
        g.add(
          createStrutBetween(
            new THREE.Vector3(0, 0.024, 0),
            new THREE.Vector3(Math.cos(a) * 0.33, 0.02, Math.sin(a) * 0.33),
            0.011,
            0.011,
            m.gunmetal,
            8,
          ),
        );
        const clamp = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.032, 12), m.fiaRed);
        clamp.position.set(Math.cos(a) * 0.19, 0.51, Math.sin(a) * 0.19);
        g.add(clamp);
      }

      // Leveling bowl + fluid drag head + rear pan arm & zoom controller
      const bowl = new THREE.Mesh(new THREE.SphereGeometry(0.068, 18, 12, 0, Math.PI * 2, 0, Math.PI * 0.6), m.gunmetal);
      bowl.position.y = 0.96;
      g.add(bowl);

      const fluidHead = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.1, 0.15), m.anodizedBlack);
      fluidHead.position.y = 1.04;
      g.add(fluidHead);
      const dragKnob = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.035, 14), m.fiaRed);
      dragKnob.rotation.z = Math.PI / 2;
      dragKnob.position.set(0.085, 1.04, 0);
      g.add(dragKnob);

      const panHandle = createStrutBetween(
        new THREE.Vector3(0.065, 1.05, -0.05),
        new THREE.Vector3(0.13, 0.9, -0.38),
        0.009,
        0.013,
        m.rubberDark,
        10,
      );
      g.add(panHandle);

      // Dovetail quick-release bridge plate + twin 15mm brushed-steel cinema iris rods
      const bridgePlate = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.032, 0.34), m.anodizedBlack);
      bridgePlate.position.set(0, 1.105, 0.02);
      g.add(bridgePlate);
      for (const rx of [-0.032, 0.032]) {
        const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.0075, 0.0075, 0.52, 10), m.chrome);
        rod.rotation.x = Math.PI / 2;
        rod.position.set(rx, 1.115, 0.14);
        g.add(rod);
      }

      // Cinema camera modular body + heatsink vents + carbon side cover + SDI patchbay
      const camBody = new THREE.Mesh(new THREE.BoxGeometry(0.175, 0.19, 0.28), m.darkSlate);
      camBody.position.set(0, 1.215, -0.03);
      g.add(camBody);

      const sidePlate = new THREE.Mesh(new THREE.BoxGeometry(0.186, 0.125, 0.19), m.carbonWeave);
      sidePlate.position.set(0, 1.215, -0.03);
      g.add(sidePlate);

      const oledBadge = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 0.045), m.telemetryScreen);
      oledBadge.rotation.y = Math.PI / 2;
      oledBadge.position.set(0.095, 1.22, -0.02);
      g.add(oledBadge);

      const bncPanel = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.09, 0.08), m.gunmetal);
      bncPanel.position.set(-0.092, 1.2, -0.1);
      g.add(bncPanel);
      for (const bz of [-0.08, -0.12]) {
        const port = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.022, 10), m.brass);
        port.rotation.z = Math.PI / 2;
        port.position.set(-0.102, 1.2, bz);
        g.add(port);
      }

      // Dual-cell V-mount battery + charge LED bar
      const vBattery = new THREE.Mesh(new THREE.BoxGeometry(0.115, 0.145, 0.075), m.matteBlack);
      vBattery.position.set(0, 1.215, -0.21);
      g.add(vBattery);
      const batGauge = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.012, 0.01), m.emeraldLed);
      batGauge.position.set(0, 1.26, -0.249);
      g.add(batGauge);

      // Top carry handle + wireless dual antennas + ruby tally beacon + articulated field monitor
      const topHandle = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.034, 0.24), m.anodizedBlack);
      topHandle.position.set(0, 1.365, -0.02);
      g.add(topHandle);
      for (const hz of [-0.1, 0.08]) {
        const riser = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.055, 0.03), m.anodizedBlack);
        riser.position.set(0, 1.335, hz);
        g.add(riser);
      }
      for (const ax of [-0.055, 0.055]) {
        const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.007, 0.11, 8), m.rubberDark);
        ant.position.set(ax, 1.36, -0.15);
        g.add(ant);
      }

      const tallyLight = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.024, 0.034), m.rubyLens);
      tallyLight.position.set(0, 1.392, 0.07);
      g.add(tallyLight);

      // Articulated EVF viewfinder on left
      const evf = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.032, 0.13, 14), m.matteBlack);
      evf.rotation.x = Math.PI / 2;
      evf.position.set(-0.11, 1.31, -0.08);
      g.add(evf);

      const monitor = new THREE.Mesh(new THREE.BoxGeometry(0.165, 0.105, 0.022), m.anodizedBlack);
      monitor.position.set(-0.145, 1.345, 0.05);
      monitor.rotation.set(-0.34, 0.52, 0);
      g.add(monitor);
      const monScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.145, 0.085), m.telemetryScreen);
      monScreen.position.set(-0.145, 1.345, 0.063);
      monScreen.rotation.set(-0.34, 0.52, 0);
      g.add(monScreen);

      // Brass PL lens mount + stepped cinema zoom barrel + orange/white gear rings + rotary follow-focus
      const plMount = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.072, 0.028, 22), m.brass);
      plMount.rotation.x = Math.PI / 2;
      plMount.position.set(0, 1.215, 0.12);
      g.add(plMount);

      const lensBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.062, 0.066, 0.22, 24), m.anodizedBlack);
      lensBarrel.rotation.x = Math.PI / 2;
      lensBarrel.position.set(0, 1.215, 0.23);
      g.add(lensBarrel);

      const focusRing = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.036, 24), m.hdpeOrange);
      focusRing.rotation.x = Math.PI / 2;
      focusRing.position.set(0, 1.215, 0.2);
      g.add(focusRing);

      const irisRing = new THREE.Mesh(new THREE.CylinderGeometry(0.066, 0.066, 0.022, 24), m.brushedSteel);
      irisRing.rotation.x = Math.PI / 2;
      irisRing.position.set(0, 1.215, 0.27);
      g.add(irisRing);

      // Side follow-focus drum with white calibration disc
      const ffDrum = new THREE.Mesh(new THREE.CylinderGeometry(0.044, 0.044, 0.03, 18), m.pureWhite);
      ffDrum.rotation.z = Math.PI / 2;
      ffDrum.position.set(-0.085, 1.13, 0.2);
      g.add(ffDrum);
      const ffKnob = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.045, 16), m.anodizedBlack);
      ffKnob.rotation.z = Math.PI / 2;
      ffKnob.position.set(-0.11, 1.13, 0.2);
      g.add(ffKnob);

      // 3-piece matte box with top French flag + twin carbon side eyebrow wings + coated optical element
      const matteBox = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.165, 0.078), m.matteBlack);
      matteBox.position.set(0, 1.215, 0.36);
      g.add(matteBox);

      const frenchFlag = new THREE.Mesh(new THREE.BoxGeometry(0.23, 0.01, 0.115), m.carbonWeave);
      frenchFlag.position.set(0, 1.305, 0.415);
      frenchFlag.rotation.x = 0.24;
      g.add(frenchFlag);

      for (const sx of [-1, 1]) {
        const sideFlag = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.16, 0.095), m.carbonWeave);
        sideFlag.position.set(sx * 0.125, 1.215, 0.41);
        sideFlag.rotation.y = sx * -0.32;
        g.add(sideFlag);
      }

      const frontLens = new THREE.Mesh(new THREE.CylinderGeometry(0.054, 0.054, 0.012, 24), m.opticalGlass);
      frontLens.rotation.x = Math.PI / 2;
      frontLens.position.set(0, 1.215, 0.345);
      g.add(frontLens);

      enableShadows(g);
      return g;
    }

    case 'gimbal_camera': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.38, shadowTex));

      // Flat twin machined dock skids with rear curved heel feet (NO tripod)
      for (const sx of [-0.18, 0.18]) {
        const skid = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.026, 0.38), m.rubberDark);
        skid.position.set(sx, 0.013, 0);
        g.add(skid);
      }
      const crossDeck = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.026, 0.17), m.anodizedBlack);
      crossDeck.position.set(0, 0.036, 0);
      g.add(crossDeck);
      const arcaMount = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.03, 0.12), m.gunmetal);
      arcaMount.position.set(0, 0.06, 0);
      g.add(arcaMount);

      // Circular dual-grip carbon gimbal ring with knurled rubberized side grips + thumb joysticks
      const ringCenterY = 0.39;
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.019, 14, 40), m.carbonWeave);
      ring.position.set(0, ringCenterY, 0);
      g.add(ring);

      for (const sx of [-0.32, 0.32]) {
        const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.2, 16), m.rubberDark);
        grip.position.set(sx, ringCenterY, 0);
        g.add(grip);

        const recBtn = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.015, 10), m.fiaRed);
        recBtn.rotation.x = Math.PI / 2;
        recBtn.position.set(sx, ringCenterY + 0.06, 0.022);
        g.add(recBtn);
      }
      const topBar = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.28, 12), m.anodizedBlack);
      topBar.rotation.z = Math.PI / 2;
      topBar.position.set(0, ringCenterY + 0.275, 0);
      g.add(topBar);

      // 3-Axis brushless gimbal motors (with exposed metallic copper stator bands & anodized bells!)
      const yawMotor = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.048, 20), m.anodizedBlack);
      yawMotor.position.set(0, ringCenterY + 0.225, 0);
      g.add(yawMotor);
      const yawCoil = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.016, 20), m.copperWinding);
      yawCoil.position.set(0, ringCenterY + 0.225, 0);
      g.add(yawCoil);

      const rollArm = new THREE.Mesh(new THREE.BoxGeometry(0.034, 0.16, 0.038), m.anodizedBlack);
      rollArm.position.set(0, ringCenterY + 0.115, -0.125);
      g.add(rollArm);
      const rollMotor = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.05, 20), m.anodizedBlack);
      rollMotor.rotation.x = Math.PI / 2;
      rollMotor.position.set(0, ringCenterY, -0.125);
      g.add(rollMotor);
      const rollCoil = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.042, 0.016, 20), m.copperWinding);
      rollCoil.rotation.x = Math.PI / 2;
      rollCoil.position.set(0, ringCenterY, -0.125);
      g.add(rollCoil);

      // Pitch L-arm & side brushless motor
      const pitchArm = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.028, 0.16), m.anodizedBlack);
      pitchArm.position.set(-0.11, ringCenterY - 0.02, -0.04);
      g.add(pitchArm);
      const pitchMotor = new THREE.Mesh(new THREE.CylinderGeometry(0.034, 0.034, 0.036, 18), m.copperWinding);
      pitchMotor.rotation.z = Math.PI / 2;
      pitchMotor.position.set(-0.11, ringCenterY - 0.02, 0.02);
      g.add(pitchMotor);

      // Modular cinema brain suspended inside gimbal ring + dual micro V-mount batteries + wireless transmitter fins
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.145, 0.135, 0.19), m.darkSlate);
      body.position.set(0, ringCenterY - 0.02, 0.01);
      g.add(body);
      const vBat = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.105, 0.05), m.matteBlack);
      vBat.position.set(0, ringCenterY - 0.02, -0.105);
      g.add(vBat);

      for (const ax of [-0.045, 0.045]) {
        const fin = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.075, 0.035), m.anodizedBlack);
        fin.position.set(ax, ringCenterY + 0.08, -0.05);
        g.add(fin);
      }

      const plRing = new THREE.Mesh(new THREE.CylinderGeometry(0.052, 0.054, 0.02, 20), m.brass);
      plRing.rotation.x = Math.PI / 2;
      plRing.position.set(0, ringCenterY - 0.02, 0.115);
      g.add(plRing);

      const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.052, 0.13, 22), m.anodizedBlack);
      lens.rotation.x = Math.PI / 2;
      lens.position.set(0, ringCenterY - 0.02, 0.17);
      g.add(lens);

      const gearRing = new THREE.Mesh(new THREE.CylinderGeometry(0.054, 0.054, 0.026, 22), m.hdpeOrange);
      gearRing.rotation.x = Math.PI / 2;
      gearRing.position.set(0, ringCenterY - 0.02, 0.155);
      g.add(gearRing);

      const matteBox = new THREE.Mesh(new THREE.BoxGeometry(0.175, 0.13, 0.058), m.matteBlack);
      matteBox.position.set(0, ringCenterY - 0.02, 0.255);
      g.add(matteBox);

      const frenchFlag = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.008, 0.08), m.carbonWeave);
      frenchFlag.position.set(0, ringCenterY + 0.055, 0.295);
      frenchFlag.rotation.x = 0.25;
      g.add(frenchFlag);

      const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.01, 18), m.opticalGlass);
      glass.rotation.x = Math.PI / 2;
      glass.position.set(0, ringCenterY - 0.02, 0.242);
      g.add(glass);

      // Sun-hooded director monitor on top crossbar + ruby tally beacon
      const monitor = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.1, 0.022), m.anodizedBlack);
      monitor.position.set(0, ringCenterY + 0.36, 0.02);
      monitor.rotation.x = -0.28;
      g.add(monitor);
      const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.142, 0.082), m.telemetryScreen);
      scr.position.set(0, ringCenterY + 0.36, 0.033);
      scr.rotation.x = -0.28;
      g.add(scr);

      const tally = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.018, 0.024), m.rubyLens);
      tally.position.set(0.06, ringCenterY + 0.065, 0.085);
      g.add(tally);

      enableShadows(g);
      return g;
    }

    case 'dolly_track_camera': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.8, shadowTex, 0.36));

      // Precision 1.6m twin-rail slider track with 9 ribbed sleepers & rubber leveling feet (NO tripod)
      for (let i = -4; i <= 4; i++) {
        const sleeper = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.032, 0.44), m.rubberDark);
        sleeper.position.set(i * 0.185, 0.018, 0);
        g.add(sleeper);
      }
      for (const rz of [-0.155, 0.155]) {
        const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.019, 0.019, 1.58, 18), m.chrome);
        rail.rotation.z = Math.PI / 2;
        rail.position.set(0, 0.054, rz);
        g.add(rail);
      }
      for (const ex of [-0.79, 0.79]) {
        const stop = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.08, 0.44), m.hdpeOrange);
        stop.position.set(ex, 0.05, 0);
        g.add(stop);
      }

      // Machined CNC Mitchell cheeseplate carriage + 8 V-track skate rollers + brake lever
      const carriage = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.036, 0.38), m.anodizedBlack);
      carriage.position.set(0.12, 0.122, 0);
      g.add(carriage);
      const brakeLever = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.01, 0.16, 8), m.fiaRed);
      brakeLever.rotation.z = -0.5;
      brakeLever.position.set(-0.12, 0.17, 0.18);
      g.add(brakeLever);

      for (const wx of [-0.14, 0.14]) {
        for (const wz of [-0.155, 0.155]) {
          for (const ang of [-0.45, 0.45]) {
            const roller = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.022, 14), m.fiaBlue);
            roller.rotation.x = Math.PI / 2 + ang;
            roller.position.set(0.12 + wx, 0.084, wz);
            g.add(roller);
          }
        }
      }

      const riser = new THREE.Mesh(new THREE.CylinderGeometry(0.082, 0.105, 0.16, 20), m.gunmetal);
      riser.position.set(0.12, 0.215, 0);
      g.add(riser);
      const castleNut = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.095, 0.025, 8), m.brass);
      castleNut.position.set(0.12, 0.285, 0);
      g.add(castleNut);

      // Broadcast box camera + SMPTE fiber back + dual servo motors + telephoto zoom barrel + return screen
      const camBox = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.175, 0.31), m.darkSlate);
      camBox.position.set(0.12, 0.385, -0.02);
      g.add(camBox);

      const fiberBack = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.15, 0.075), m.anodizedBlack);
      fiberBack.position.set(0.12, 0.385, -0.2);
      g.add(fiberBack);

      const sideMon = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.11, 0.17), m.anodizedBlack);
      sideMon.position.set(0.002, 0.4, 0.02);
      g.add(sideMon);
      const sideScr = new THREE.Mesh(new THREE.PlaneGeometry(0.15, 0.09), m.telemetryScreen);
      sideScr.rotation.y = -Math.PI / 2;
      sideScr.position.set(-0.011, 0.4, 0.02);
      g.add(sideScr);

      const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.072, 0.26, 24), m.anodizedBlack);
      barrel.rotation.x = Math.PI / 2;
      barrel.position.set(0.12, 0.385, 0.25);
      g.add(barrel);

      const servoMotor = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.07, 0.095), m.gunmetal);
      servoMotor.position.set(0.2, 0.33, 0.23);
      g.add(servoMotor);

      const zoomRing = new THREE.Mesh(new THREE.CylinderGeometry(0.073, 0.073, 0.032, 22), m.fiaBlue);
      zoomRing.rotation.x = Math.PI / 2;
      zoomRing.position.set(0.12, 0.385, 0.21);
      g.add(zoomRing);

      const hood = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.155, 0.08), m.matteBlack);
      hood.position.set(0.12, 0.385, 0.41);
      g.add(hood);

      const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.056, 0.056, 0.012, 20), m.opticalGlass);
      glass.rotation.x = Math.PI / 2;
      glass.position.set(0.12, 0.385, 0.39);
      g.add(glass);

      const tally = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.026, 0.032), m.rubyLens);
      tally.position.set(0.12, 0.485, 0.11);
      g.add(tally);

      enableShadows(g);
      return g;
    }

    case 'eng_camera_case': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.4, shadowTex, 0.3));

      // Armored aluminum-valanced equipment flight deck (NO tripod) + ball corners & 4 butterfly latches
      const deck = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.22, 0.38), m.anodizedBlack);
      deck.position.y = 0.11;
      g.add(deck);

      const trim = new THREE.Mesh(new THREE.BoxGeometry(0.57, 0.026, 0.39), m.brushedSteel);
      trim.position.y = 0.205;
      g.add(trim);

      for (const bx of [-0.275, 0.275]) {
        for (const bz of [-0.185, 0.185]) {
          const corner = new THREE.Mesh(new THREE.SphereGeometry(0.024, 10, 8), m.chrome);
          corner.position.set(bx, 0.21, bz);
          g.add(corner);
        }
      }
      for (const lx of [-0.16, 0.16]) {
        const latch = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.06, 0.016), m.chrome);
        latch.position.set(lx, 0.18, 0.195);
        g.add(latch);
      }

      const padMat = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.022, 0.32), m.rubberDark);
      padMat.position.y = 0.232;
      g.add(padMat);

      // Shoulder-mount ENG broadcast camcorder chassis + XLR audio deck + Anton/Bauer battery
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.145, 0.185, 0.36), m.darkSlate);
      body.position.set(0, 0.34, -0.02);
      g.add(body);

      const xlrPanel = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.11, 0.16), m.gunmetal);
      xlrPanel.position.set(0.075, 0.33, -0.05);
      g.add(xlrPanel);

      const shoulderPad = new THREE.Mesh(new THREE.BoxGeometry(0.135, 0.032, 0.19), m.rubberDark);
      shoulderPad.position.set(0, 0.25, -0.06);
      g.add(shoulderPad);

      const battery = new THREE.Mesh(new THREE.BoxGeometry(0.115, 0.15, 0.08), m.matteBlack);
      battery.position.set(0, 0.34, -0.23);
      g.add(battery);
      const batLeds = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.012, 0.012), m.emeraldLed);
      batLeds.position.set(0, 0.39, -0.272);
      g.add(batLeds);

      // Top carry handle + dual articulation EVF eyepiece + rubber eyecup + Rycote shotgun microphone
      const handle = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.032, 0.24), m.anodizedBlack);
      handle.position.set(0, 0.468, 0.01);
      g.add(handle);
      for (const rz of [-0.08, 0.09]) {
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.034, 0.044, 0.028), m.anodizedBlack);
        post.position.set(0, 0.44, rz);
        g.add(post);
      }

      const evfArm = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.02, 0.024), m.chrome);
      evfArm.position.set(-0.05, 0.44, 0.09);
      g.add(evfArm);
      const evf = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.034, 0.15, 16), m.matteBlack);
      evf.rotation.x = Math.PI / 2;
      evf.position.set(-0.095, 0.44, 0.1);
      g.add(evf);
      const eyecup = new THREE.Mesh(new THREE.TorusGeometry(0.032, 0.01, 8, 16), m.rubberDark);
      eyecup.position.set(-0.095, 0.44, 0.025);
      g.add(eyecup);

      const mic = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.18, 14), m.carbonWeave);
      mic.rotation.x = Math.PI / 2;
      mic.position.set(0.06, 0.485, 0.14);
      g.add(mic);

      // B4 Broadcast 22x Servo Zoom Lens + side rocker servo handgrip + red macro ring + sunhood
      const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.056, 0.22, 22), m.anodizedBlack);
      lens.rotation.x = Math.PI / 2;
      lens.position.set(0, 0.34, 0.25);
      g.add(lens);

      const servoGrip = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.095, 0.08), m.matteBlack);
      servoGrip.position.set(0.068, 0.31, 0.22);
      g.add(servoGrip);

      const zoomAccent = new THREE.Mesh(new THREE.CylinderGeometry(0.058, 0.058, 0.026, 22), m.fiaBlue);
      zoomAccent.rotation.x = Math.PI / 2;
      zoomAccent.position.set(0, 0.34, 0.22);
      g.add(zoomAccent);
      const macroRing = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.018, 22), m.fiaRed);
      macroRing.rotation.x = Math.PI / 2;
      macroRing.position.set(0, 0.34, 0.28);
      g.add(macroRing);

      const hood = new THREE.Mesh(new THREE.BoxGeometry(0.145, 0.12, 0.06), m.matteBlack);
      hood.position.set(0, 0.34, 0.375);
      g.add(hood);

      const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.044, 0.044, 0.012, 18), m.opticalGlass);
      glass.rotation.x = Math.PI / 2;
      glass.position.set(0, 0.34, 0.36);
      g.add(glass);

      const tally = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.02, 0.028), m.rubyLens);
      tally.position.set(0, 0.492, 0.09);
      g.add(tally);

      enableShadows(g);
      return g;
    }

    case 'highspeed_phantom_cam': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.42, shadowTex));

      // Low 3-arm CNC billet aluminum floor hi-hat spider platform with weighted sandbag shoes (NO tripod)
      const hiHatCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.115, 0.08, 20), m.anodizedBlack);
      hiHatCollar.position.y = 0.09;
      g.add(hiHatCollar);

      for (let i = 0; i < 3; i++) {
        const a = (i * Math.PI * 2) / 3 + Math.PI / 6;
        const fx = Math.cos(a) * 0.3;
        const fz = Math.sin(a) * 0.3;
        g.add(
          createStrutBetween(
            new THREE.Vector3(0, 0.08, 0),
            new THREE.Vector3(fx, 0.024, fz),
            0.022,
            0.022,
            m.gunmetal,
            10,
          ),
        );
        const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.062, 0.028, 14), m.rubberDark);
        pad.position.set(fx, 0.014, fz);
        g.add(pad);
      }

      // Geared fluid pan-tilt head
      const headBase = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.09, 0.16), m.anodizedBlack);
      headBase.position.y = 0.165;
      g.add(headBase);

      // Massive machined magnesium high-speed 1000FPS cinema chassis + finned cooling louvers + emerald ring
      const chassis = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.21, 0.36), m.darkSlate);
      chassis.position.set(0, 0.32, -0.02);
      g.add(chassis);

      for (let vz = -0.14; vz <= 0.08; vz += 0.044) {
        const fin = new THREE.Mesh(new THREE.BoxGeometry(0.212, 0.12, 0.016), m.matteBlack);
        fin.position.set(0, 0.33, vz);
        g.add(fin);
      }

      // Dual top handles + dual synchronized IR high-speed trigger strobes + dual 10GbE CineMag slots
      const cineMag = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.045, 0.14), m.fiaBlue);
      cineMag.position.set(0, 0.445, -0.05);
      g.add(cineMag);

      const handle = new THREE.Mesh(new THREE.BoxGeometry(0.046, 0.034, 0.28), m.anodizedBlack);
      handle.position.set(0, 0.495, -0.01);
      g.add(handle);

      const sideOled = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.12, 0.18), m.anodizedBlack);
      sideOled.position.set(-0.11, 0.32, 0.01);
      g.add(sideOled);
      const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.1), m.telemetryScreen);
      scr.rotation.y = -Math.PI / 2;
      scr.position.set(-0.121, 0.32, 0.01);
      g.add(scr);

      // Twin high-speed IR trigger pods flanking matte box
      for (const sx of [-0.14, 0.14]) {
        const pod = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.06, 14), m.anodizedBlack);
        pod.rotation.x = Math.PI / 2;
        pod.position.set(sx, 0.34, 0.24);
        g.add(pod);
        const led = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.01, 14), m.emeraldLed);
        led.rotation.x = Math.PI / 2;
        led.position.set(sx, 0.34, 0.272);
        g.add(led);
      }

      // Heavy cine zoom barrel + twin iris rods + follow focus + matte box
      for (const rx of [-0.036, 0.036]) {
        const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.44, 10), m.chrome);
        rod.rotation.x = Math.PI / 2;
        rod.position.set(rx, 0.215, 0.18);
        g.add(rod);
      }
      const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.072, 0.076, 0.24, 24), m.anodizedBlack);
      barrel.rotation.x = Math.PI / 2;
      barrel.position.set(0, 0.32, 0.26);
      g.add(barrel);
      const gearRing = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.03, 24), m.safetyYellow);
      gearRing.rotation.x = Math.PI / 2;
      gearRing.position.set(0, 0.32, 0.24);
      g.add(gearRing);

      const matte = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.16, 0.075), m.matteBlack);
      matte.position.set(0, 0.32, 0.4);
      g.add(matte);
      const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.012, 22), m.opticalGlass);
      glass.rotation.x = Math.PI / 2;
      glass.position.set(0, 0.32, 0.385);
      g.add(glass);

      enableShadows(g);
      return g;
    }

    case 'low_hat_chase_cam': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.36, shadowTex, 0.3));

      // Wire-rope vibration isolator double CNC deck + 8 helical stainless loops (NO tripod)
      const botPlate = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.026, 0.32), m.anodizedBlack);
      botPlate.position.y = 0.018;
      g.add(botPlate);

      const topPlate = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.024, 0.28), m.gunmetal);
      topPlate.position.y = 0.115;
      g.add(topPlate);

      for (const ix of [-0.13, -0.045, 0.045, 0.13]) {
        for (const iz of [-0.11, 0.11]) {
          const loop = new THREE.Mesh(new THREE.TorusGeometry(0.032, 0.007, 8, 16), m.chrome);
          loop.position.set(ix, 0.068, iz);
          g.add(loop);
        }
      }

      // Active 3-axis gyro gimbal cradle + compact global-shutter box cam + anamorphic cine prime
      const yoke = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.028, 0.14), m.anodizedBlack);
      yoke.position.y = 0.155;
      g.add(yoke);
      for (const sx of [-0.105, 0.105]) {
        const arm = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.16, 0.04), m.anodizedBlack);
        arm.position.set(sx, 0.235, 0);
        g.add(arm);
        const motor = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.028, 16), m.copperWinding);
        motor.rotation.z = Math.PI / 2;
        motor.position.set(sx * 1.15, 0.25, 0);
        g.add(motor);
      }

      const boxCam = new THREE.Mesh(new THREE.BoxGeometry(0.135, 0.12, 0.17), m.darkSlate);
      boxCam.position.set(0, 0.25, -0.01);
      g.add(boxCam);

      for (const ax of [-0.045, 0.045]) {
        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.08, 0.03), m.fiaBlue);
        blade.position.set(ax, 0.34, -0.06);
        g.add(blade);
      }

      const primeBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.056, 0.052, 0.12, 22), m.anodizedBlack);
      primeBarrel.rotation.x = Math.PI / 2;
      primeBarrel.position.set(0, 0.25, 0.13);
      g.add(primeBarrel);

      const anamorphicStripe = new THREE.Mesh(new THREE.CylinderGeometry(0.058, 0.058, 0.018, 22), m.cyanLed);
      anamorphicStripe.rotation.x = Math.PI / 2;
      anamorphicStripe.position.set(0, 0.25, 0.155);
      g.add(anamorphicStripe);

      const visor = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.008, 0.065), m.carbonWeave);
      visor.position.set(0, 0.31, 0.175);
      visor.rotation.x = 0.22;
      g.add(visor);

      const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.046, 0.046, 0.01, 20), m.opticalGlass);
      glass.rotation.x = Math.PI / 2;
      glass.position.set(0, 0.25, 0.192);
      g.add(glass);

      enableShadows(g);
      return g;
    }

    case 'broadcast_monitor_village': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.56, shadowTex, 0.42));

      // Rolling armored video-village equipment case on 4 swivel casters
      const wheelGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.032, 14);
      wheelGeo.rotateZ(Math.PI / 2);
      for (const cx of [-0.36, 0.36]) {
        for (const cz of [-0.22, 0.22]) {
          const c = new THREE.Mesh(wheelGeo, m.rubberDark);
          c.position.set(cx, 0.05, cz);
          g.add(c);
        }
      }

      const rack = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.72, 0.56), m.matteBlack);
      rack.position.y = 0.46;
      g.add(rack);
      const trim = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.04, 0.58), m.brushedSteel);
      trim.position.y = 0.81;
      g.add(trim);

      // Sun-hooded 21" Quad-View Broadcast Director Monitor mounted atop tilted console
      const monFrame = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.48, 0.08), m.darkSlate);
      monFrame.position.set(0, 1.12, -0.04);
      monFrame.rotation.x = -0.14;
      g.add(monFrame);

      const sunHoodTop = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.018, 0.16), m.matteBlack);
      sunHoodTop.position.set(0, 1.355, 0.04);
      g.add(sunHoodTop);
      for (const sx of [-0.385, 0.385]) {
        const wing = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.48, 0.15), m.matteBlack);
        wing.position.set(sx, 1.12, 0.02);
        wing.rotation.x = -0.14;
        g.add(wing);
      }

      const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.42), m.quadMonitor);
      screen.position.set(0, 1.12, 0.002);
      screen.rotation.x = -0.14;
      g.add(screen);

      // Dual shark-fin diversity RF wireless video antennas on mast
      for (const ax of [-0.3, 0.3]) {
        const antMast = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.014, 0.34, 10), m.brushedSteel);
        antMast.position.set(ax, 1.48, -0.1);
        g.add(antMast);
        const fin = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.14, 0.11), m.fiaBlue);
        fin.position.set(ax, 1.66, -0.1);
        g.add(fin);
      }

      enableShadows(g);
      return g;
    }

    case 'wind_fan': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.46, shadowTex));

      // Wheeled tubular steel cradle base
      const axle = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.64, 12), m.anodizedBlack);
      axle.rotation.z = Math.PI / 2;
      axle.position.set(0, 0.085, -0.2);
      g.add(axle);

      const wheelGeo = new THREE.CylinderGeometry(0.085, 0.085, 0.044, 20);
      wheelGeo.rotateZ(Math.PI / 2);
      for (const sx of [-0.34, 0.34]) {
        const wheel = new THREE.Mesh(wheelGeo, m.rubberDark);
        wheel.position.set(sx, 0.085, -0.2);
        g.add(wheel);

        const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.048, 12), m.brushedSteel);
        hub.rotation.z = Math.PI / 2;
        hub.position.set(sx, 0.085, -0.2);
        g.add(hub);
      }

      // Front rubber stabilizer feet & U-cradle arms
      for (const sx of [-0.31, 0.31]) {
        const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.035, 0.04, 14), m.rubberDark);
        foot.position.set(sx, 0.02, 0.2);
        g.add(foot);

        const rail = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.032, 0.44), m.anodizedBlack);
        rail.position.set(sx, 0.06, 0);
        g.add(rail);

        const arm = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.42, 0.045), m.anodizedBlack);
        arm.position.set(sx, 0.27, 0);
        g.add(arm);

        const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.03, 12), m.hdpeOrange);
        knob.rotation.z = Math.PI / 2;
        knob.position.set(sx + (sx > 0 ? 0.025 : -0.025), 0.46, 0);
        g.add(knob);
      }

      // Safety-yellow cylindrical steel drum housing (centered at y = 0.48m, diameter = 0.62m)
      const drumGroup = new THREE.Group();
      drumGroup.position.set(0, 0.48, 0);
      drumGroup.rotation.x = -0.14; // Tilted slightly upward to cool car brakes/radiator

      const drumShell = new THREE.Mesh(
        new THREE.CylinderGeometry(0.31, 0.31, 0.32, 32, 1, true),
        m.safetyYellow,
      );
      drumShell.rotation.x = Math.PI / 2;
      drumGroup.add(drumShell);

      // Rolled front & rear shroud lip rings
      for (const sz of [-0.16, 0.16]) {
        const lip = new THREE.Mesh(new THREE.TorusGeometry(0.31, 0.018, 12, 32), m.safetyYellow);
        lip.position.z = sz;
        drumGroup.add(lip);
      }

      // Concentric protective wire grille rings & cross-bars (front & back)
      for (const sz of [-0.165, 0.165]) {
        for (const gr of [0.1, 0.19, 0.27]) {
          const grille = new THREE.Mesh(new THREE.TorusGeometry(gr, 0.005, 6, 28), m.matteBlack);
          grille.position.z = sz;
          drumGroup.add(grille);
        }
        const barH = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.6, 8), m.matteBlack);
        barH.rotation.z = Math.PI / 2;
        barH.position.z = sz;
        drumGroup.add(barH);
        const barV = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.6, 8), m.matteBlack);
        barV.position.z = sz;
        drumGroup.add(barV);
      }

      // Rear motor housing pod
      const motor = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.16, 18), m.anodizedBlack);
      motor.rotation.x = Math.PI / 2;
      motor.position.z = -0.08;
      drumGroup.add(motor);

      // ANIMATED 6-blade aluminum impeller rotor!
      const rotor = new THREE.Group();
      rotor.userData.animSpin = { axis: 'z', speed: 13.5 };
      const rotorHub = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.068, 0.06, 18), m.brushedSteel);
      rotorHub.rotation.x = Math.PI / 2;
      rotor.add(rotorHub);

      const bladeGeo = new THREE.BoxGeometry(0.075, 0.22, 0.012);
      for (let i = 0; i < 6; i++) {
        const pivot = new THREE.Group();
        pivot.rotation.z = (i * Math.PI * 2) / 6;
        const blade = new THREE.Mesh(bladeGeo, m.chrome);
        blade.position.y = 0.14;
        blade.rotation.y = 0.42; // Realistic aerodynamic pitch angle
        pivot.add(blade);
        rotor.add(pivot);
      }
      drumGroup.add(rotor);

      // Top carry handle & side switch box
      const handle = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.012, 8, 16, Math.PI), m.anodizedBlack);
      handle.position.set(0, 0.32, 0);
      drumGroup.add(handle);

      g.add(drumGroup);
      enableShadows(g);
      return g;
    }

    case 'aero_blower': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.4, shadowTex));

      // H-frame caster base
      const baseBarGeo = new THREE.BoxGeometry(0.44, 0.035, 0.045);
      for (const bz of [-0.18, 0.18]) {
        const bar = new THREE.Mesh(baseBarGeo, m.anodizedBlack);
        bar.position.set(0, 0.055, bz);
        g.add(bar);
      }
      const spine = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.035, 0.4), m.anodizedBlack);
      spine.position.y = 0.055;
      g.add(spine);

      const casterGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.02, 12);
      casterGeo.rotateZ(Math.PI / 2);
      for (const cx of [-0.19, 0.19]) {
        for (const cz of [-0.18, 0.18]) {
          const w = new THREE.Mesh(casterGeo, m.rubberDark);
          w.position.set(cx, 0.025, cz);
          g.add(w);
        }
      }

      // Telescoping aluminum pedestal + pivot fork
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.028, 0.72, 16), m.brushedSteel);
      mast.position.y = 0.42;
      g.add(mast);

      const fork = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.04, 0.045), m.anodizedBlack);
      fork.position.y = 0.78;
      g.add(fork);

      // Sleek ducted aero turbine head
      const head = new THREE.Group();
      head.position.y = 0.94;
      head.rotation.x = -0.18;

      const shroud = new THREE.Mesh(
        new THREE.CylinderGeometry(0.21, 0.175, 0.34, 28, 1, true),
        m.fiaBlue,
      );
      shroud.rotation.x = Math.PI / 2;
      head.add(shroud);

      const frontCowl = new THREE.Mesh(new THREE.TorusGeometry(0.21, 0.016, 10, 28), m.pureWhite);
      frontCowl.position.z = 0.17;
      head.add(frontCowl);

      const motorPod = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.06, 0.22, 18), m.anodizedBlack);
      motorPod.rotation.x = Math.PI / 2;
      motorPod.position.z = -0.12;
      head.add(motorPod);

      // ANIMATED 8-blade turbine rotor!
      const rotor = new THREE.Group();
      rotor.position.z = 0.08;
      rotor.userData.animSpin = { axis: 'z', speed: 16.0 };
      const hub = new THREE.Mesh(new THREE.SphereGeometry(0.058, 16, 12), m.chrome);
      rotor.add(hub);
      const bladeGeo = new THREE.BoxGeometry(0.045, 0.15, 0.01);
      for (let i = 0; i < 8; i++) {
        const pv = new THREE.Group();
        pv.rotation.z = (i * Math.PI * 2) / 8;
        const bl = new THREE.Mesh(bladeGeo, m.safetyYellow);
        bl.position.y = 0.105;
        bl.rotation.y = 0.5;
        pv.add(bl);
        rotor.add(pv);
      }
      head.add(rotor);

      g.add(head);
      enableShadows(g);
      return g;
    }

    case 'vent_extractor': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.42, shadowTex));

      // Skid rails
      for (const sx of [-0.22, 0.22]) {
        const skid = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.52), m.rubberDark);
        skid.position.set(sx, 0.02, 0);
        g.add(skid);
      }

      // Orange cylindrical extractor drum
      const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.42, 28, 1, true), m.hdpeOrange);
      drum.rotation.x = Math.PI / 2;
      drum.position.y = 0.28;
      g.add(drum);

      const rearCuff = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.23, 0.18, 24), m.matteBlack);
      rearCuff.rotation.x = Math.PI / 2;
      rearCuff.position.set(0, 0.28, -0.26);
      g.add(rearCuff);

      const switchBox = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.12, 0.12), m.anodizedBlack);
      switchBox.position.set(0.24, 0.36, 0);
      g.add(switchBox);

      const handle = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.012, 8, 16, Math.PI), m.anodizedBlack);
      handle.position.set(0, 0.52, 0);
      g.add(handle);

      // Protective front ring + ANIMATED 7-blade extractor wheel
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.015, 10, 28), m.anodizedBlack);
      ring.position.set(0, 0.28, 0.21);
      g.add(ring);

      const rotor = new THREE.Group();
      rotor.position.set(0, 0.28, 0.12);
      rotor.userData.animSpin = { axis: 'z', speed: 14.5 };
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.05, 16), m.brushedSteel);
      hub.rotation.x = Math.PI / 2;
      rotor.add(hub);
      const bladeGeo = new THREE.BoxGeometry(0.055, 0.165, 0.01);
      for (let i = 0; i < 7; i++) {
        const pv = new THREE.Group();
        pv.rotation.z = (i * Math.PI * 2) / 7;
        const bl = new THREE.Mesh(bladeGeo, m.chrome);
        bl.position.y = 0.115;
        bl.rotation.y = 0.45;
        pv.add(bl);
        rotor.add(pv);
      }
      g.add(rotor);

      enableShadows(g);
      return g;
    }

    case 'parabolic_mic': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.42, shadowTex));
      buildTripodLegs(g, p, 0.88, 0.32, false);

      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.02, 0.34, 14), m.brushedSteel);
      mast.position.y = 1.05;
      g.add(mast);

      const yoke = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 0.08), m.anodizedBlack);
      yoke.position.y = 1.24;
      g.add(yoke);

      // Parabolic acoustic collector dish
      const dishPts = [
        new THREE.Vector2(0.0, 0.0),
        new THREE.Vector2(0.1, 0.015),
        new THREE.Vector2(0.2, 0.055),
        new THREE.Vector2(0.27, 0.115),
      ];
      const dish = new THREE.Mesh(new THREE.LatheGeometry(dishPts, 28), m.opticalGlass);
      dish.rotation.x = Math.PI / 2 - 0.12;
      dish.position.set(0, 1.28, -0.02);
      g.add(dish);

      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.27, 0.012, 10, 28), m.anodizedBlack);
      rim.rotation.x = -0.12;
      rim.position.set(0, 1.295, 0.095);
      g.add(rim);

      // Central shotgun microphone capsule + foam windscreen
      const mic = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.18, 16), m.carbonWeave);
      mic.rotation.x = Math.PI / 2 - 0.12;
      mic.position.set(0, 1.285, 0.07);
      g.add(mic);

      enableShadows(g);
      return g;
    }

    case 'timing_gate': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.36, shadowTex));
      buildTripodLegs(g, p, 0.72, 0.285, false);

      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.52, 16), m.brushedSteel);
      mast.position.set(0, 0.66, 0);
      g.add(mast);

      const mount = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.032, 0.055, 20), m.anodizedBlack);
      mount.position.set(0, 0.925, 0);
      g.add(mount);

      const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.04, 12), m.hdpeOrange);
      knob.rotation.z = Math.PI / 2;
      knob.position.set(0.055, 0.925, 0);
      g.add(knob);

      const box = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.135, 0.15), m.darkSlate);
      box.position.set(0, 1.02, 0);
      g.add(box);

      const bumperGeo = new THREE.BoxGeometry(0.032, 0.145, 0.16);
      for (const sx of [-0.115, 0.115]) {
        const b = new THREE.Mesh(bumperGeo, m.hdpeOrange);
        b.position.set(sx, 1.02, 0);
        g.add(b);
      }

      const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.044, 0.048, 0.036, 24), m.anodizedBlack);
      barrel.rotation.x = Math.PI / 2;
      barrel.position.set(-0.04, 1.02, 0.082);
      g.add(barrel);

      const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.034, 0.034, 0.012, 24), m.rubyLens);
      glass.rotation.x = Math.PI / 2;
      glass.position.set(-0.04, 1.02, 0.098);
      g.add(glass);

      const led = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.014, 16), m.cyanLed);
      led.rotation.x = Math.PI / 2;
      led.position.set(0.055, 1.045, 0.078);
      g.add(led);

      const bat = new THREE.Mesh(new THREE.BoxGeometry(0.095, 0.09, 0.045), m.rubberDark);
      bat.position.set(0, 1.01, -0.092);
      g.add(bat);

      const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.008, 0.18, 10), m.brushedSteel);
      ant.position.set(0.08, 1.175, -0.02);
      g.add(ant);

      const tip = new THREE.Mesh(new THREE.SphereGeometry(0.011, 12, 10), m.hdpeOrange);
      tip.position.set(0.08, 1.265, -0.02);
      g.add(tip);

      enableShadows(g);
      return g;
    }

    case 'pit_board':
      return buildBrakeBoard(p, m.brake100);

    case 'speed_radar_sign': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.44, shadowTex));

      const base = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.04, 0.5), m.anodizedBlack);
      base.position.y = 0.06;
      g.add(base);

      const wheelGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.036, 14);
      wheelGeo.rotateZ(Math.PI / 2);
      for (const sx of [-0.25, 0.25]) {
        const w = new THREE.Mesh(wheelGeo, m.rubberDark);
        w.position.set(sx, 0.06, -0.18);
        g.add(w);
      }

      const post = new THREE.Mesh(new THREE.BoxGeometry(0.065, 1.12, 0.065), m.brushedSteel);
      post.position.y = 0.64;
      g.add(post);

      const cabinet = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.68, 0.1), m.darkSlate);
      cabinet.position.set(0, 1.18, 0.03);
      g.add(cabinet);

      const face = new THREE.Mesh(new THREE.PlaneGeometry(0.48, 0.62), m.speedRadar);
      face.position.set(0, 1.18, 0.082);
      g.add(face);

      enableShadows(g);
      return g;
    }

    case 'weather_station': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.42, shadowTex));

      // Heavy 3-arm machined steel trackside base (not flimsy sticks)
      const hubBase = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.1, 0.09, 18), m.anodizedBlack);
      hubBase.position.y = 0.045;
      g.add(hubBase);

      for (let i = 0; i < 3; i++) {
        const a = (i * Math.PI * 2) / 3 + Math.PI / 6;
        const arm = createStrutBetween(
          new THREE.Vector3(0, 0.06, 0),
          new THREE.Vector3(Math.cos(a) * 0.34, 0.03, Math.sin(a) * 0.34),
          0.022,
          0.022,
          m.gunmetal,
          10,
        );
        g.add(arm);
        const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.052, 0.028, 14), m.rubberDark);
        foot.position.set(Math.cos(a) * 0.34, 0.014, Math.sin(a) * 0.34);
        g.add(foot);
      }

      // Main anodized mast + flanged collar couplings
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.034, 1.62, 18), m.brushedSteel);
      mast.position.y = 0.88;
      g.add(mast);

      for (const cy of [0.45, 0.96, 1.48]) {
        const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.042, 0.04, 16), m.anodizedBlack);
        collar.position.y = cy;
        g.add(collar);
      }

      // Sealed IP67 telemetry logger box + cyan status LED + dual antennas
      const logger = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.26, 0.14), m.pureWhite);
      logger.position.set(0, 0.72, 0.09);
      g.add(logger);
      const statusLed = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.018, 0.014), m.cyanLed);
      statusLed.position.set(0.05, 0.8, 0.162);
      g.add(statusLed);

      // Aspirated multi-plate radiation shield stack (5 louvered discs)
      for (let d = 0; d < 5; d++) {
        const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.072, 0.016, 18), m.pureWhite);
        disc.position.set(-0.14, 1.24 + d * 0.026, 0);
        g.add(disc);
      }
      const shieldArm = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.02, 0.024), m.anodizedBlack);
      shieldArm.position.set(-0.07, 1.22, 0);
      g.add(shieldArm);

      // Tilted monocrystalline solar panel
      const solarFrame = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.024, 0.22), m.anodizedBlack);
      solarFrame.position.set(0, 1.06, -0.14);
      solarFrame.rotation.x = -0.55;
      g.add(solarFrame);
      const solarFace = new THREE.Mesh(new THREE.PlaneGeometry(0.25, 0.19), m.solarCell);
      solarFace.position.set(0, 1.072, -0.148);
      solarFace.rotation.x = -Math.PI / 2 - 0.55;
      g.add(solarFace);

      // Machined top cross-boom arm
      const crossBoom = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.56, 12), m.anodizedBlack);
      crossBoom.rotation.z = Math.PI / 2;
      crossBoom.position.y = 1.66;
      g.add(crossBoom);

      // ANIMATED 3-cup hemispherical aluminum/orange anemometer on right
      const anemometer = new THREE.Group();
      anemometer.position.set(0.27, 1.72, 0);
      anemometer.userData.animSpin = { axis: 'y', speed: 6.5 };

      const spindle = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.024, 0.09, 16), m.gunmetal);
      anemometer.add(spindle);

      for (let i = 0; i < 3; i++) {
        const a = (i * Math.PI * 2) / 3;
        const arm = new THREE.Group();
        arm.rotation.y = a;
        const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.14, 8), m.chrome);
        rod.rotation.z = Math.PI / 2;
        rod.position.set(0.07, 0.025, 0);
        arm.add(rod);

        const cup = new THREE.Mesh(
          new THREE.SphereGeometry(0.032, 14, 10, 0, Math.PI),
          m.hdpeOrange,
        );
        cup.position.set(0.145, 0.025, 0);
        arm.add(cup);
        anemometer.add(arm);
      }
      g.add(anemometer);

      // Aerodynamic wind-vane arrow + vertical red stabilizer fin on left
      const vaneSpindle = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.02, 0.08, 12), m.gunmetal);
      vaneSpindle.position.set(-0.27, 1.7, 0);
      g.add(vaneSpindle);
      const vaneShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.24, 8), m.chrome);
      vaneShaft.rotation.x = Math.PI / 2;
      vaneShaft.position.set(-0.27, 1.73, 0);
      g.add(vaneShaft);
      const vaneNose = new THREE.Mesh(new THREE.ConeGeometry(0.016, 0.045, 10), m.brass);
      vaneNose.rotation.x = Math.PI / 2;
      vaneNose.position.set(-0.27, 1.73, 0.13);
      g.add(vaneNose);
      const vaneFin = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.085, 0.1), m.fiaRed);
      vaneFin.position.set(-0.27, 1.755, -0.09);
      g.add(vaneFin);

      enableShadows(g);
      return g;
    }

    case 'aframe_pit_sign': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.42, shadowTex, 0.32));

      for (const side of [-1, 1]) {
        const panelGroup = new THREE.Group();
        panelGroup.position.set(0, 0.48, side * 0.16);
        panelGroup.rotation.x = side * -0.22;

        const frame = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.92, 0.028), m.pureWhite);
        panelGroup.add(frame);

        const face = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.64), m.pitLimit60);
        face.position.set(0, 0.08, side * 0.016);
        if (side < 0) face.rotation.y = Math.PI;
        panelGroup.add(face);

        g.add(panelGroup);
      }

      const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.58, 12), m.anodizedBlack);
      hinge.rotation.z = Math.PI / 2;
      hinge.position.y = 0.94;
      g.add(hinge);

      enableShadows(g);
      return g;
    }

    case 'lap_tower_display': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.38, shadowTex));

      const plinth = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.055, 0.46), m.anodizedBlack);
      plinth.position.y = 0.0275;
      g.add(plinth);

      const housing = new THREE.Mesh(new THREE.BoxGeometry(0.42, 1.56, 0.22), m.darkSlate);
      housing.position.y = 0.83;
      g.add(housing);

      const trim = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.05, 0.24), m.safetyYellow);
      trim.position.y = 1.62;
      g.add(trim);

      const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.36, 1.24), m.lapTowerScreen);
      screen.position.set(0, 0.9, 0.112);
      g.add(screen);

      // Top GPS/RF timing transponder dome
      const dome = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.075, 18), m.pureWhite);
      dome.position.y = 1.68;
      g.add(dome);
      const led = new THREE.Mesh(new THREE.SphereGeometry(0.018, 10, 8), m.emeraldLed);
      led.position.y = 1.725;
      g.add(led);

      enableShadows(g);
      return g;
    }

    case 'pit_lollipop_stand': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.32, shadowTex));

      const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.25, 0.036, 16), m.rubberDark);
      foot.position.y = 0.018;
      g.add(foot);

      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.022, 1.38, 14), m.brushedSteel);
      pole.position.y = 0.72;
      g.add(pole);

      const clamp = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.07, 0.055), m.anodizedBlack);
      clamp.position.y = 1.36;
      g.add(clamp);

      // Double-sided BOX NOW pit-stop paddle
      const paddle = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.024), m.fiaRed);
      paddle.position.y = 1.6;
      g.add(paddle);

      const front = new THREE.Mesh(new THREE.PlaneGeometry(0.38, 0.38), m.pitLollipop);
      front.position.set(0, 1.6, 0.0135);
      g.add(front);
      const back = new THREE.Mesh(new THREE.PlaneGeometry(0.38, 0.38), m.pitLollipop);
      back.position.set(0, 1.6, -0.0135);
      back.rotation.y = Math.PI;
      g.add(back);

      enableShadows(g);
      return g;
    }

    case 'grid_slot_marker': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.36, shadowTex, 0.28));

      const base = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.05, 0.34), m.rubberDark);
      base.position.y = 0.025;
      g.add(base);

      const frame = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.56, 0.045), m.safetyYellow);
      frame.position.set(0, 0.34, 0);
      frame.rotation.x = -0.14;
      g.add(frame);

      const face = new THREE.Mesh(new THREE.PlaneGeometry(0.36, 0.48), m.gridSlotSign);
      face.position.set(0, 0.34, 0.024);
      face.rotation.x = -0.14;
      g.add(face);

      // Optical launch sensor pod mounted on upper flank
      const sensor = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.06, 0.06), m.anodizedBlack);
      sensor.position.set(0.24, 0.5, 0);
      g.add(sensor);
      const eye = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.02, 12), m.cyanLed);
      eye.rotation.x = Math.PI / 2;
      eye.position.set(0.24, 0.5, 0.032);
      g.add(eye);

      enableShadows(g);
      return g;
    }

    case 'pit_exit_signal_light': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.36, shadowTex));

      // Heavy cast base plinth + slim steel mast + hooded Red/Green pit-exit traffic light box
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.25, 0.045, 20), m.anodizedBlack);
      base.position.y = 0.0225;
      g.add(base);

      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.028, 1.48, 16), m.brushedSteel);
      pole.position.y = 0.78;
      g.add(pole);

      const cabinet = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.56, 0.16), m.darkSlate);
      cabinet.position.y = 1.62;
      g.add(cabinet);

      // Dual deep glare hoods + red stop lens & emerald go lens
      const lenses: Array<[number, THREE.Material]> = [
        [1.75, m.rubyLens],
        [1.49, m.emeraldLed],
      ];
      for (const [ly, mat] of lenses) {
        const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.024, 20), mat);
        lens.rotation.x = Math.PI / 2;
        lens.position.set(0, ly, 0.082);
        g.add(lens);

        const visor = new THREE.Mesh(
          new THREE.CylinderGeometry(0.086, 0.086, 0.1, 20, 1, true, -Math.PI * 0.42, Math.PI * 0.84),
          m.matteBlack,
        );
        visor.rotation.x = Math.PI / 2;
        visor.position.set(0, ly, 0.125);
        g.add(visor);
      }

      const strobe = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.03, 0.05, 12), m.amberBeacon);
      strobe.position.y = 1.925;
      g.add(strobe);

      enableShadows(g);
      return g;
    }

    case 'drs_zone_sign': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.42, shadowTex, 0.3));

      const plinth = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.044, 0.34), m.rubberDark);
      plinth.position.y = 0.022;
      g.add(plinth);

      for (const sx of [-0.2, 0.2]) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 1.08, 12), m.brushedSteel);
        post.position.set(sx, 0.56, 0);
        g.add(post);
      }

      const frame = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.44, 0.036), m.anodizedBlack);
      frame.position.set(0, 0.94, 0);
      g.add(frame);

      const front = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.38), m.drsSign);
      front.position.set(0, 0.94, 0.02);
      g.add(front);
      const back = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.38), m.drsSign);
      back.position.set(0, 0.94, -0.02);
      back.rotation.y = Math.PI;
      g.add(back);

      enableShadows(g);
      return g;
    }

    default:
      return null;
  }
}
