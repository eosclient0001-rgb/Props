import * as THREE from 'three';
import {
  createContactShadowMesh,
  createStrutBetween,
  enableShadows,
  type PropPalette,
} from './propMaterials';

function buildRollingLightStand(p: PropPalette, baseRadius = 0.34, mastHeight = 1.45): THREE.Group {
  const g = new THREE.Group();
  const m = p.materials;

  // Heavy folding/rolling studio & paddock stand column with 3 braced caster legs
  const colBot = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.024, 0.56, 16), m.anodizedBlack);
  colBot.position.y = 0.36;
  g.add(colBot);

  const colTop = new THREE.Mesh(
    new THREE.CylinderGeometry(0.016, 0.018, Math.max(0.45, mastHeight - 0.55), 14),
    m.chrome,
  );
  colTop.position.y = 0.62 + (mastHeight - 0.55) / 2;
  g.add(colTop);

  const spiderY = 0.28;
  const hubY = 0.14;
  for (let i = 0; i < 3; i++) {
    const a = (i * Math.PI * 2) / 3 + Math.PI / 6;
    const fx = Math.cos(a) * baseRadius;
    const fz = Math.sin(a) * baseRadius;

    g.add(
      createStrutBetween(
        new THREE.Vector3(0, spiderY, 0),
        new THREE.Vector3(fx, 0.075, fz),
        0.013,
        0.013,
        m.anodizedBlack,
        10,
      ),
    );
    g.add(
      createStrutBetween(
        new THREE.Vector3(0, hubY, 0),
        new THREE.Vector3(fx * 0.72, 0.075, fz * 0.72),
        0.01,
        0.01,
        m.brushedSteel,
        8,
      ),
    );

    const caster = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.024, 14), m.rubberDark);
    caster.rotation.z = Math.PI / 2;
    caster.rotation.y = a;
    caster.position.set(fx, 0.032, fz);
    g.add(caster);
  }

  // Brass/anodized tension lock collar + T-knob
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.05, 14), m.anodizedBlack);
  collar.position.y = 0.62;
  g.add(collar);
  const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.045, 10), m.brass);
  knob.rotation.z = Math.PI / 2;
  knob.position.set(0.035, 0.62, 0);
  g.add(knob);

  return g;
}

export function buildLightingProp(id: string, p: PropPalette): THREE.Group | null {
  const m = p.materials;
  const shadowTex = p.textures.contactShadowMap;

  switch (id) {
    case 'floodlight_tower': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.58, shadowTex, 0.48));

      // Heavy industrial motorsport floodlight sled with outriggers & pneumatic tires
      const chassis = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.24, 0.62), m.safetyYellow);
      chassis.position.y = 0.22;
      g.add(chassis);

      const hood = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.14, 0.56), m.anodizedBlack);
      hood.position.y = 0.4;
      g.add(hood);

      const handle = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.016, 8, 18, Math.PI), m.anodizedBlack);
      handle.rotation.y = Math.PI / 2;
      handle.position.set(0.42, 0.46, 0);
      g.add(handle);

      const wheelGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.055, 20);
      wheelGeo.rotateZ(Math.PI / 2);
      for (const sx of [-0.41, 0.41]) {
        const w = new THREE.Mesh(wheelGeo, m.rubberDark);
        w.position.set(sx, 0.11, -0.18);
        g.add(w);
        const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.048, 0.06, 14), m.brushedSteel);
        hub.rotation.z = Math.PI / 2;
        hub.position.set(sx, 0.11, -0.18);
        g.add(hub);
      }

      // Deployable stabilizer outrigger pads on 4 corners
      for (const sx of [-0.48, 0.48]) {
        for (const sz of [-0.34, 0.34]) {
          g.add(
            createStrutBetween(
              new THREE.Vector3(sx * 0.72, 0.16, sz * 0.72),
              new THREE.Vector3(sx, 0.03, sz),
              0.016,
              0.016,
              m.gunmetal,
              8,
            ),
          );
          const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.055, 0.022, 12), m.rubberDark);
          pad.position.set(sx, 0.011, sz);
          g.add(pad);
        }
      }

      // Square-section 4-chord aluminum truss mast
      for (const tx of [-0.06, 0.06]) {
        for (const tz of [-0.06, 0.06]) {
          const chord = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 1.44, 10), m.brushedSteel);
          chord.position.set(tx, 1.18, tz);
          g.add(chord);
        }
      }
      for (const ry of [0.65, 1.0, 1.35, 1.7, 1.88]) {
        const collar = new THREE.Mesh(new THREE.BoxGeometry(0.155, 0.032, 0.155), m.anodizedBlack);
        collar.position.y = ry;
        g.add(collar);
      }

      // Top amber safety strobe + 4-bank high-bay stadium LED matrix
      const beacon = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.032, 0.05, 14), m.amberBeacon);
      beacon.position.set(0, 1.98, -0.06);
      g.add(beacon);

      const yoke = new THREE.Mesh(new THREE.BoxGeometry(1.06, 0.05, 0.06), m.anodizedBlack);
      yoke.position.y = 1.94;
      g.add(yoke);

      const podOffsets: Array<[number, number, number]> = [
        [-0.36, 2.08, -0.14],
        [-0.12, 2.08, -0.04],
        [0.12, 2.08, 0.04],
        [0.36, 2.08, 0.14],
      ];
      for (const [px, py, yaw] of podOffsets) {
        const pod = new THREE.Group();
        pod.position.set(px, py, 0.04);
        pod.rotation.set(0.32, yaw, 0);

        const body = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.17, 0.09), m.darkSlate);
        pod.add(body);

        for (let fi = -2; fi <= 2; fi++) {
          const fin = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.012, 0.03), m.gunmetal);
          fin.position.set(0, fi * 0.032, -0.055);
          pod.add(fin);
        }

        const visor = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.014, 0.08), m.safetyYellow);
        visor.position.set(0, 0.09, 0.06);
        pod.add(visor);

        const emitter = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.14), m.ledFlood);
        emitter.position.z = 0.048;
        pod.add(emitter);

        g.add(pod);
      }

      enableShadows(g);
      return g;
    }

    case 'led_panel_stand': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.42, shadowTex));

      // Classic cinema C-Stand turtle base (3 staggered chrome legs)
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.02, 1.38, 14), m.chrome);
      col.position.y = 0.72;
      g.add(col);

      const legHeights = [0.028, 0.056, 0.084];
      for (let i = 0; i < 3; i++) {
        const a = (i * Math.PI * 2) / 3 + 0.35;
        const lh = legHeights[i];
        const leg = createStrutBetween(
          new THREE.Vector3(0, lh, 0),
          new THREE.Vector3(Math.cos(a) * 0.36, 0.014, Math.sin(a) * 0.36),
          0.014,
          0.014,
          m.chrome,
          10,
        );
        g.add(leg);
        const cap = new THREE.Mesh(new THREE.SphereGeometry(0.018, 10, 8), m.rubberDark);
        cap.position.set(Math.cos(a) * 0.36, 0.018, Math.sin(a) * 0.36);
        g.add(cap);
      }

      // 1x1 Bi-color cinema LED matrix panel + yoke + 4-leaf barndoors
      const yoke = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.03, 0.04), m.anodizedBlack);
      yoke.position.y = 1.42;
      g.add(yoke);
      for (const sx of [-0.215, 0.215]) {
        const arm = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.24, 0.04), m.anodizedBlack);
        arm.position.set(sx, 1.54, 0);
        g.add(arm);
      }

      const panel = new THREE.Group();
      panel.position.set(0, 1.62, 0);
      panel.rotation.x = 0.14;

      const chassis = new THREE.Mesh(new THREE.BoxGeometry(0.39, 0.39, 0.055), m.anodizedBlack);
      panel.add(chassis);

      const ledFace = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.34), m.bicolorLed);
      ledFace.position.z = 0.029;
      panel.add(ledFace);

      // Rear V-mount battery + dimmer LCD box
      const bat = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.15, 0.05), m.matteBlack);
      bat.position.set(0.08, 0, -0.05);
      panel.add(bat);
      const ctrl = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.16, 0.03), m.darkSlate);
      ctrl.position.set(-0.08, 0, -0.04);
      panel.add(ctrl);

      // 4 angled barndoor flaps
      const tbDoorGeo = new THREE.BoxGeometry(0.38, 0.13, 0.008);
      const topDoor = new THREE.Mesh(tbDoorGeo, m.matteBlack);
      topDoor.position.set(0, 0.24, 0.065);
      topDoor.rotation.x = -0.6;
      panel.add(topDoor);
      const botDoor = new THREE.Mesh(tbDoorGeo, m.matteBlack);
      botDoor.position.set(0, -0.24, 0.065);
      botDoor.rotation.x = 0.6;
      panel.add(botDoor);

      const lrDoorGeo = new THREE.BoxGeometry(0.13, 0.38, 0.008);
      const leftDoor = new THREE.Mesh(lrDoorGeo, m.matteBlack);
      leftDoor.position.set(-0.24, 0, 0.065);
      leftDoor.rotation.y = 0.6;
      panel.add(leftDoor);
      const rightDoor = new THREE.Mesh(lrDoorGeo, m.matteBlack);
      rightDoor.position.set(0.24, 0, 0.065);
      rightDoor.rotation.y = -0.6;
      panel.add(rightDoor);

      g.add(panel);
      enableShadows(g);
      return g;
    }

    case 'softbox_cinema_light': {
      const g = buildRollingLightStand(p, 0.36, 1.54);
      g.add(createContactShadowMesh(0.45, shadowTex));

      // COB cinema spotlight body + rear heatsink fins + orange yoke clamp
      const head = new THREE.Group();
      head.position.set(0, 1.62, 0);
      head.rotation.x = 0.16;

      const cobBody = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.26, 20), m.darkSlate);
      cobBody.rotation.x = Math.PI / 2;
      cobBody.position.z = -0.14;
      head.add(cobBody);

      const handle = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.01, 8, 14, Math.PI), m.hdpeOrange);
      handle.position.set(0, 0.11, -0.14);
      head.add(handle);

      const lockWheel = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.036, 0.03, 14), m.hdpeOrange);
      lockWheel.rotation.z = Math.PI / 2;
      lockWheel.position.set(0.13, -0.02, -0.1);
      head.add(lockWheel);

      // 8-sided parabolic softbox cone & translucent glowing octagon diffuser
      const softboxCone = new THREE.Mesh(
        new THREE.CylinderGeometry(0.34, 0.1, 0.28, 8, 1, true),
        m.matteBlack,
      );
      softboxCone.rotation.x = -Math.PI / 2;
      softboxCone.position.z = 0.12;
      head.add(softboxCone);

      const frontRim = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.025, 8, 1, true), m.anodizedBlack);
      frontRim.rotation.x = -Math.PI / 2;
      frontRim.position.z = 0.265;
      head.add(frontRim);

      const diffuser = new THREE.Mesh(new THREE.CircleGeometry(0.335, 8), m.warmCobGlow);
      diffuser.position.z = 0.262;
      head.add(diffuser);

      g.add(head);
      enableShadows(g);
      return g;
    }

    case 'sky_panel_truss_bar': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.56, shadowTex, 0.4));

      // Heavy bolted base plate + upright square aluminum truss + wide T-bar carrying twin SkyPanels
      const basePlate = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.036, 0.56), m.anodizedBlack);
      basePlate.position.y = 0.018;
      g.add(basePlate);

      for (const tx of [-0.055, 0.055]) {
        for (const tz of [-0.055, 0.055]) {
          const chord = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.66, 10), m.brushedSteel);
          chord.position.set(tx, 0.86, tz);
          g.add(chord);
        }
      }
      for (const ry of [0.3, 0.65, 1.0, 1.35, 1.68]) {
        const ring = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.025, 0.14), m.anodizedBlack);
        ring.position.y = ry;
        g.add(ring);
      }

      // Twin DMX PSU ballast boxes clamped near base
      for (const bx of [-0.14, 0.14]) {
        const psu = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.2, 0.08), m.fiaBlue);
        psu.position.set(bx, 0.24, 0);
        g.add(psu);
      }

      // Horizontal T-truss header bar
      const tBar = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.055, 0.055), m.brushedSteel);
      tBar.position.y = 1.72;
      g.add(tBar);

      // Twin wide-format RGBWW SkyPanel fixtures angled slightly inward
      for (const side of [-1, 1]) {
        const fix = new THREE.Group();
        fix.position.set(side * 0.34, 1.88, 0.03);
        fix.rotation.set(0.18, side * -0.1, 0);

        const body = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.25, 0.09), m.fiaBlue);
        fix.add(body);
        const bezel = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.27, 0.03), m.anodizedBlack);
        bezel.position.z = 0.035;
        fix.add(bezel);
        const face = new THREE.Mesh(new THREE.PlaneGeometry(0.44, 0.22), m.skyPanelGlow);
        face.position.z = 0.052;
        fix.add(face);

        g.add(fix);
      }

      enableShadows(g);
      return g;
    }

    case 'overhead_balloon_light': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.48, shadowTex));

      // Wheeled weighted ballast drum base + telescoping mast + glowing diffused spherical balloon
      const baseBox = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.2, 0.56), m.anodizedBlack);
      baseBox.position.y = 0.15;
      g.add(baseBox);

      const wheelGeo = new THREE.CylinderGeometry(0.055, 0.055, 0.036, 14);
      wheelGeo.rotateZ(Math.PI / 2);
      for (const sx of [-0.28, 0.28]) {
        for (const sz of [-0.22, 0.22]) {
          const w = new THREE.Mesh(wheelGeo, m.rubberDark);
          w.position.set(sx, 0.055, sz);
          g.add(w);
        }
      }

      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.03, 1.48, 16), m.brushedSteel);
      mast.position.y = 0.98;
      g.add(mast);

      const safetyCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.08, 16), m.safetyYellow);
      safetyCollar.position.y = 1.56;
      g.add(safetyCollar);

      // Large ellipsoidal diffused glare-free track balloon (centered y = 1.96m)
      const balloon = new THREE.Mesh(new THREE.SphereGeometry(0.36, 28, 20), m.diffusionFabric);
      balloon.scale.set(1.12, 0.84, 1.12);
      balloon.position.y = 1.92;
      g.add(balloon);

      // Equator tension band + lower dark protective skirt
      const band = new THREE.Mesh(new THREE.TorusGeometry(0.402, 0.014, 10, 32), m.darkSlate);
      band.rotation.x = Math.PI / 2;
      band.position.y = 1.92;
      g.add(band);

      const fanSkirt = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.08, 0.12, 18), m.anodizedBlack);
      fanSkirt.position.y = 1.62;
      g.add(fanSkirt);

      enableShadows(g);
      return g;
    }

    case 'pit_worklight_tripod': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.42, shadowTex));

      // Yellow safety folding mechanic worklight tripod + twin IP65 armored LED heads
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.022, 1.24, 14), m.safetyYellow);
      col.position.y = 0.68;
      g.add(col);

      for (let i = 0; i < 3; i++) {
        const a = (i * Math.PI * 2) / 3 + Math.PI / 6;
        const leg = createStrutBetween(
          new THREE.Vector3(0, 0.38, 0),
          new THREE.Vector3(Math.cos(a) * 0.35, 0.016, Math.sin(a) * 0.35),
          0.014,
          0.014,
          m.safetyYellow,
          10,
        );
        g.add(leg);
        const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.026, 0.024, 12), m.rubberDark);
        foot.position.set(Math.cos(a) * 0.35, 0.012, Math.sin(a) * 0.35);
        g.add(foot);
      }

      const tBar = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.032, 0.036), m.anodizedBlack);
      tBar.position.y = 1.32;
      g.add(tBar);

      for (const side of [-1, 1]) {
        const pod = new THREE.Group();
        pod.position.set(side * 0.2, 1.44, 0);
        pod.rotation.set(0.24, side * 0.16, 0);

        const housing = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.16, 0.08), m.safetyYellow);
        pod.add(housing);
        const guard = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.17, 0.025), m.anodizedBlack);
        guard.position.z = 0.036;
        pod.add(guard);
        const glass = new THREE.Mesh(new THREE.PlaneGeometry(0.17, 0.13), m.ledFlood);
        glass.position.z = 0.05;
        pod.add(glass);

        g.add(pod);
      }

      enableShadows(g);
      return g;
    }

    case 'track_beacon_gantry': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.42, shadowTex));

      // Trackside FIA LED Flag-Warning Panel inside rugged tubular steel roll cage (no flimsy sticks)
      const base = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.055, 0.44), m.rubberDark);
      base.position.y = 0.0275;
      g.add(base);

      // Twin upright steel stanchions + roll guard hoop
      for (const sx of [-0.23, 0.23]) {
        const up = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 1.18, 12), m.anodizedBlack);
        up.position.set(sx, 0.62, 0);
        g.add(up);
      }
      const topBar = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.48, 12), m.anodizedBlack);
      topBar.rotation.z = Math.PI / 2;
      topBar.position.y = 1.21;
      g.add(topBar);

      // LED Matrix Marshal Flag Display Box
      const box = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.46, 0.12), m.darkSlate);
      box.position.y = 0.92;
      g.add(box);

      const hood = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.022, 0.12), m.safetyYellow);
      hood.position.set(0, 1.155, 0.05);
      g.add(hood);

      const ledMatrix = new THREE.Mesh(new THREE.PlaneGeometry(0.36, 0.38), m.marshalFlagLed);
      ledMatrix.position.set(0, 0.92, 0.062);
      g.add(ledMatrix);

      // Base telemetry RF controller + antenna
      const radioBox = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.18, 0.2), m.matteBlack);
      radioBox.position.set(0, 0.15, -0.05);
      g.add(radioBox);
      const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.008, 0.24, 10), m.brushedSteel);
      ant.position.set(0.18, 1.32, 0);
      g.add(ant);

      enableShadows(g);
      return g;
    }

    case 'portable_battery_worklight': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.36, shadowTex, 0.3));

      // Freestanding heavy-duty cordless area COB floodlight inside tubular yellow roll-cage sled
      for (const sx of [-0.21, 0.21]) {
        const sled = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.036, 0.38), m.rubberDark);
        sled.position.set(sx, 0.018, 0);
        g.add(sled);

        const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.38, 10), m.safetyYellow);
        rail.position.set(sx, 0.22, 0);
        g.add(rail);
      }
      const handleBar = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.44, 12), m.rubberDark);
      handleBar.rotation.z = Math.PI / 2;
      handleBar.position.set(0, 0.41, 0);
      g.add(handleBar);

      // Integrated lithium battery pack base
      const batPack = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.1, 0.26), m.matteBlack);
      batPack.position.y = 0.08;
      g.add(batPack);
      const gauge = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.018, 0.015), m.emeraldLed);
      gauge.position.set(0, 0.09, 0.132);
      g.add(gauge);

      // Tilted twin-COB armored floodlight body with rear heatsink ribs
      const lamp = new THREE.Group();
      lamp.position.set(0, 0.25, 0);
      lamp.rotation.x = -0.22;

      const body = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.22, 0.11), m.darkSlate);
      lamp.add(body);
      for (let rx = -2; rx <= 2; rx++) {
        const fin = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.2, 0.025), m.gunmetal);
        fin.position.set(rx * 0.06, 0, -0.065);
        lamp.add(fin);
      }
      const emitter = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.18), m.ledFlood);
      emitter.position.z = 0.057;
      lamp.add(emitter);

      g.add(lamp);
      enableShadows(g);
      return g;
    }

    case 'cine_tube_stand': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.36, shadowTex));

      // Weighted round floor plinth + vertical mast + quad Astera-style RGB pixel tubes
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.26, 0.04, 24), m.anodizedBlack);
      base.position.y = 0.02;
      g.add(base);

      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.022, 1.38, 14), m.brushedSteel);
      mast.position.y = 0.72;
      g.add(mast);

      const crossTop = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.032, 0.04), m.anodizedBlack);
      crossTop.position.y = 1.42;
      g.add(crossTop);
      const crossBot = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.032, 0.04), m.anodizedBlack);
      crossBot.position.y = 0.56;
      g.add(crossBot);

      // 4 glowing vertical cinema pixel light tubes (cinema RGBWW multi-color calibration + DMX splitter hub)
      const hub = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.08, 0.06), m.matteBlack);
      hub.position.set(0, 0.52, -0.02);
      g.add(hub);

      const tubeGeo = new THREE.CylinderGeometry(0.022, 0.022, 0.84, 16);
      const capGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.04, 14);
      const tubeMats = [m.cyanLed, m.skyPanelGlow, m.amberBeacon, m.warmCobGlow];
      const xs = [-0.22, -0.075, 0.075, 0.22];
      xs.forEach((tx, idx) => {
        const tube = new THREE.Mesh(tubeGeo, tubeMats[idx]);
        tube.position.set(tx, 0.99, 0.026);
        g.add(tube);

        for (const cy of [0.57, 1.41]) {
          const cap = new THREE.Mesh(capGeo, m.matteBlack);
          cap.position.set(tx, cy, 0.026);
          g.add(cap);
        }
      });

      enableShadows(g);
      return g;
    }

    default:
      return null;
  }
}
