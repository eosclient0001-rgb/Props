import * as THREE from 'three';
import {
  createContactShadowMesh,
  createStrutBetween,
  enableShadows,
  type PropPalette,
} from './propMaterials';

function buildMountedWheel(p: PropPalette): THREE.Group {
  const m = p.materials;
  const w = new THREE.Group();

  // Tire tread outer cylinder + sidewalls (radius 0.33m, width 0.28m)
  const tire = new THREE.Mesh(
    new THREE.CylinderGeometry(0.33, 0.33, 0.28, 32, 1, false),
    m.tireBlack,
  );
  tire.rotation.z = Math.PI / 2;
  w.add(tire);

  // Forged 10-spoke alloy wheel rim & red centerlock nut
  const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.21, 0.29, 24), m.gunmetal);
  rim.rotation.z = Math.PI / 2;
  w.add(rim);

  const spokeGeo = new THREE.BoxGeometry(0.295, 0.36, 0.024);
  for (let i = 0; i < 5; i++) {
    const sp = new THREE.Mesh(spokeGeo, m.brass);
    sp.rotation.x = (i * Math.PI) / 5;
    w.add(sp);
  }

  const centerHub = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.065, 0.31, 16), m.anodizedBlack);
  centerHub.rotation.z = Math.PI / 2;
  w.add(centerHub);

  const lockNut = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.042, 0.33, 6), m.fiaRed);
  lockNut.rotation.z = Math.PI / 2;
  w.add(lockNut);

  return w;
}

export function buildWorkshopProp(id: string, p: PropPalette): THREE.Group | null {
  const m = p.materials;
  const shadowTex = p.textures.contactShadowMap;

  switch (id) {
    case 'wheel_rack': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.7, shadowTex, 0.44));

      // Caster wheels
      const casterGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.03, 14);
      casterGeo.rotateZ(Math.PI / 2);
      for (const cx of [-0.54, 0.54]) {
        for (const cz of [-0.26, 0.26]) {
          const c = new THREE.Mesh(casterGeo, m.rubberDark);
          c.position.set(cx, 0.045, cz);
          g.add(c);
        }
      }

      // Tubular red steel frame
      const railGeo = new THREE.CylinderGeometry(0.018, 0.018, 1.18, 12);
      railGeo.rotateZ(Math.PI / 2);
      for (const rz of [-0.22, 0.22]) {
        const rail = new THREE.Mesh(railGeo, m.fiaRed);
        rail.position.set(0, 0.14, rz);
        g.add(rail);
      }
      for (const rx of [-0.58, 0.58]) {
        for (const rz of [-0.26, 0.26]) {
          const post = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.88, 12), m.fiaRed);
          post.position.set(rx, 0.54, rz);
          g.add(post);
        }
        const sideCross = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.52, 10), m.fiaRed);
        sideCross.rotation.x = Math.PI / 2;
        sideCross.position.set(rx, 0.96, 0);
        g.add(sideCross);
      }

      // 4 mounted racing slicks standing in rack
      for (let i = 0; i < 4; i++) {
        const tire = buildMountedWheel(p);
        tire.scale.setScalar(0.92);
        tire.position.set(-0.42 + i * 0.28, 0.46, 0);
        g.add(tire);
      }

      enableShadows(g);
      return g;
    }

    case 'race_tire_single': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.36, shadowTex, 0.24));
      const wheel = buildMountedWheel(p);
      wheel.position.y = 0.33;
      g.add(wheel);
      enableShadows(g);
      return g;
    }

    case 'pit_toolbox': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.54, shadowTex, 0.36));

      // 4 heavy caster wheels
      const wheelGeo = new THREE.CylinderGeometry(0.052, 0.052, 0.036, 14);
      wheelGeo.rotateZ(Math.PI / 2);
      for (const cx of [-0.36, 0.36]) {
        for (const cz of [-0.18, 0.18]) {
          const w = new THREE.Mesh(wheelGeo, m.rubberDark);
          w.position.set(cx, 0.052, cz);
          g.add(w);
        }
      }

      // Powder-coated red steel chest body
      const cabinet = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.82, 0.46), m.fiaRed);
      cabinet.position.y = 0.52;
      g.add(cabinet);

      // Ribbed black rubber worktop mat
      const topMat = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.026, 0.44), m.rubberDark);
      topMat.position.y = 0.942;
      g.add(topMat);

      // 6 recessed drawer fronts + brushed aluminum pull handles
      const drawerGeo = new THREE.BoxGeometry(0.78, 0.095, 0.02);
      const pullGeo = new THREE.BoxGeometry(0.74, 0.016, 0.022);
      for (let i = 0; i < 6; i++) {
        const dy = 0.2 + i * 0.125;
        const dr = new THREE.Mesh(drawerGeo, m.fiaRed);
        dr.position.set(0, dy, 0.232);
        g.add(dr);

        const pull = new THREE.Mesh(pullGeo, m.chrome);
        pull.position.set(0, dy + 0.032, 0.245);
        g.add(pull);
      }

      // Chrome side push handle
      const pushBar = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.38, 10), m.chrome);
      pushBar.rotation.x = Math.PI / 2;
      pushBar.position.set(0.49, 0.82, 0);
      g.add(pushBar);

      enableShadows(g);
      return g;
    }

    case 'quick_jack': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.48, shadowTex, 0.26));

      // Billet aluminum side rails
      for (const sx of [-0.13, 0.13]) {
        const rail = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.1, 0.68), m.fiaBlue);
        rail.position.set(sx, 0.07, 0);
        g.add(rail);
      }

      // Front wide aluminum roller + rear swivel casters
      const frontRoller = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.24, 16), m.brushedSteel);
      frontRoller.rotation.z = Math.PI / 2;
      frontRoller.position.set(0, 0.038, 0.3);
      g.add(frontRoller);

      for (const rx of [-0.14, 0.14]) {
        const rw = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.026, 14), m.anodizedBlack);
        rw.rotation.z = Math.PI / 2;
        rw.position.set(rx, 0.032, -0.3);
        g.add(rw);
      }

      // Hydraulic lift arm + rubber saddle pad
      const arm = createStrutBetween(
        new THREE.Vector3(0, 0.08, -0.2),
        new THREE.Vector3(0, 0.15, 0.22),
        0.042,
        0.048,
        m.brushedSteel,
        8,
      );
      g.add(arm);

      const saddle = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.055, 0.024, 16), m.rubberDark);
      saddle.position.set(0, 0.17, 0.22);
      g.add(saddle);

      // Long angled pump handle
      const handle = createStrutBetween(
        new THREE.Vector3(0, 0.09, -0.28),
        new THREE.Vector3(0, 0.92, -0.62),
        0.014,
        0.016,
        m.chrome,
        12,
      );
      g.add(handle);

      const grip = createStrutBetween(
        new THREE.Vector3(0, 0.78, -0.56),
        new THREE.Vector3(0, 0.94, -0.63),
        0.019,
        0.019,
        m.rubberDark,
        12,
      );
      g.add(grip);

      enableShadows(g);
      return g;
    }

    case 'pit_canopy_weight': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.24, shadowTex));

      for (let i = 0; i < 2; i++) {
        const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.175, 0.18, 0.11, 20), m.gunmetal);
        disc.position.y = 0.055 + i * 0.115;
        g.add(disc);
      }

      const handle = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.013, 8, 16, Math.PI), m.brushedSteel);
      handle.position.y = 0.23;
      g.add(handle);

      enableShadows(g);
      return g;
    }

    case 'fuel_station_pump': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.68, shadowTex, 0.5));

      // Concrete/steel island pad
      const island = new THREE.Mesh(new THREE.BoxGeometry(1.16, 0.07, 0.68), m.gunmetal);
      island.position.y = 0.035;
      g.add(island);

      // Protective yellow U-shaped steel crash bollards on left & right ends
      for (const sx of [-0.48, 0.48]) {
        for (const sz of [-0.22, 0.22]) {
          const post = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.64, 12), m.safetyYellow);
          post.position.set(sx, 0.36, sz);
          g.add(post);
        }
        const arch = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.026, 10, 18, Math.PI), m.safetyYellow);
        arch.rotation.y = Math.PI / 2;
        arch.position.set(sx, 0.68, 0);
        g.add(arch);
      }

      // Dispenser base plinth + red/white motorsport pump monolith
      const lowerCab = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.72, 0.36), m.fiaRed);
      lowerCab.position.y = 0.43;
      g.add(lowerCab);

      const midFrame = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.52, 0.38), m.pureWhite);
      midFrame.position.y = 1.05;
      g.add(midFrame);

      // Digital meter screens front & back
      for (const side of [1, -1]) {
        const bezel = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.34, 0.025), m.anodizedBlack);
        bezel.position.set(0, 1.06, side * 0.195);
        g.add(bezel);

        const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.48, 0.28), m.fuelPumpScreen);
        screen.position.set(0, 1.06, side * 0.21);
        if (side < 0) screen.rotation.y = Math.PI;
        g.add(screen);
      }

      // Canopy header bridge + red top trim
      for (const cx of [-0.28, 0.28]) {
        const col = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.36, 0.34), m.brushedSteel);
        col.position.set(cx, 1.48, 0);
        g.add(col);
      }
      const header = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.2, 0.44), m.fiaRed);
      header.position.y = 1.72;
      g.add(header);
      const headerStrip = new THREE.Mesh(new THREE.BoxGeometry(0.77, 0.04, 0.45), m.safetyYellow);
      headerStrip.position.y = 1.64;
      g.add(headerStrip);

      // Side pump holster, braided hose loop & dry-break fuel nozzle
      const holster = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.24, 0.14), m.anodizedBlack);
      holster.position.set(0.36, 0.96, 0);
      g.add(holster);

      const hose = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.017, 10, 24, Math.PI * 1.15), m.matteBlack);
      hose.rotation.z = Math.PI * 0.85;
      hose.position.set(0.38, 0.72, 0.08);
      g.add(hose);

      const nozzle = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.14, 0.12), m.fiaRed);
      nozzle.position.set(0.38, 0.98, 0.04);
      g.add(nozzle);
      const spout = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.018, 0.14, 12), m.brushedSteel);
      spout.rotation.x = 0.5;
      spout.position.set(0.38, 1.07, 0.07);
      g.add(spout);

      enableShadows(g);
      return g;
    }

    case 'ev_charger_station': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.56, shadowTex, 0.42));

      // Anchored steel charging pad + protective front wheel stops
      const pad = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.06, 0.64), m.gunmetal);
      pad.position.y = 0.03;
      g.add(pad);

      for (const bx of [-0.34, 0.34]) {
        const bumper = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.56, 12), m.cyanLed);
        bumper.position.set(bx, 0.34, 0.24);
        g.add(bumper);
      }

      // Chamfered modern 800V DC Fast-Charger monolith
      const cabinet = new THREE.Mesh(new THREE.BoxGeometry(0.56, 1.62, 0.36), m.darkSlate);
      cabinet.position.y = 0.87;
      g.add(cabinet);

      const frontShell = new THREE.Mesh(new THREE.BoxGeometry(0.48, 1.5, 0.04), m.pureWhite);
      frontShell.position.set(0, 0.88, 0.18);
      g.add(frontShell);

      // Glowing emerald/cyan status bar across top crown
      const crownLed = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.07, 0.38), m.emeraldLed);
      crownLed.position.y = 1.7;
      g.add(crownLed);

      // 800V Telemetry charge screen
      const screenFrame = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.38, 0.02), m.anodizedBlack);
      screenFrame.position.set(0, 1.18, 0.2);
      g.add(screenFrame);
      const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.34), m.evChargerScreen);
      screen.position.set(0, 1.18, 0.212);
      g.add(screen);

      // Side ventilation louvers
      for (let i = 0; i < 6; i++) {
        const louver = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.022, 0.22), m.anodizedBlack);
        louver.position.set(-0.285, 0.45 + i * 0.08, 0);
        g.add(louver);
      }

      // Armored liquid-cooled CCS cable & docked connector holster on right
      const holster = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.18, 0.12), m.anodizedBlack);
      holster.position.set(0.31, 1.02, 0.04);
      g.add(holster);

      const cable = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.02, 10, 26, Math.PI * 1.15), m.matteBlack);
      cable.rotation.z = Math.PI * 0.8;
      cable.position.set(0.34, 0.72, 0.05);
      g.add(cable);

      const ccsPlug = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.16, 0.14), m.fiaBlue);
      ccsPlug.position.set(0.33, 1.04, 0.06);
      g.add(ccsPlug);

      enableShadows(g);
      return g;
    }

    case 'mechanic_workbench': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.75, shadowTex, 0.44));

      // 4 tubular steel legs + lower mesh shelf
      for (const lx of [-0.66, 0.66]) {
        for (const lz of [-0.28, 0.28]) {
          const leg = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.86, 0.05), m.darkSlate);
          leg.position.set(lx, 0.43, lz);
          g.add(leg);
        }
      }
      const lowerShelf = new THREE.Mesh(new THREE.BoxGeometry(1.32, 0.03, 0.56), m.gunmetal);
      lowerShelf.position.y = 0.22;
      g.add(lowerShelf);

      // Thick butcher-block timber & steel-edged worktop
      const worktop = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.06, 0.66), m.woodCrate);
      worktop.position.y = 0.89;
      g.add(worktop);

      // Under-bench red lockable tool drawer bay
      const drawerBay = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.3, 0.54), m.fiaRed);
      drawerBay.position.set(-0.36, 0.7, 0);
      g.add(drawerBay);
      for (const dy of [0.62, 0.76]) {
        const pull = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.02, 0.025), m.chrome);
        pull.position.set(-0.36, dy, 0.28);
        g.add(pull);
      }

      // Cast-iron red bench vise mounted on right front corner
      const viseBase = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.12, 0.2), m.fiaRed);
      viseBase.position.set(0.54, 0.98, 0.24);
      g.add(viseBase);
      const viseHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.22, 8), m.chrome);
      viseHandle.rotation.z = Math.PI / 2;
      viseHandle.position.set(0.54, 0.96, 0.36);
      g.add(viseHandle);

      // Rear steel pegboard tool panel + overhead LED task bar
      const pegboard = new THREE.Mesh(new THREE.BoxGeometry(1.38, 0.54, 0.03), m.anodizedBlack);
      pegboard.position.set(0, 1.19, -0.3);
      g.add(pegboard);

      const canopy = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.04, 0.22), m.darkSlate);
      canopy.position.set(0, 1.48, -0.2);
      g.add(canopy);
      const taskLight = new THREE.Mesh(new THREE.PlaneGeometry(1.24, 0.08), m.ledFlood);
      taskLight.rotation.x = Math.PI / 2;
      taskLight.position.set(0, 1.458, -0.18);
      g.add(taskLight);

      enableShadows(g);
      return g;
    }

    case 'tire_balancing_rig': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.58, shadowTex, 0.44));

      // Heavy industrial balancer cabinet
      const base = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.78, 0.54), m.fiaBlue);
      base.position.set(-0.14, 0.39, 0);
      g.add(base);

      // Rear weight tray & angled digital console
      const consoleBox = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.24, 0.34), m.darkSlate);
      consoleBox.position.set(-0.14, 0.9, -0.06);
      consoleBox.rotation.x = 0.25;
      g.add(consoleBox);

      const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.38, 0.16), m.telemetryScreen);
      screen.position.set(-0.14, 0.93, 0.115);
      screen.rotation.x = -0.35;
      g.add(screen);

      // Horizontal steel spindle + mounted slick wheel on right flank
      const spindle = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.44, 16), m.chrome);
      spindle.rotation.z = Math.PI / 2;
      spindle.position.set(0.34, 0.56, 0);
      g.add(spindle);

      const testWheel = buildMountedWheel(p);
      testWheel.scale.setScalar(0.88);
      testWheel.position.set(0.36, 0.56, 0);
      g.add(testWheel);

      // Hinged yellow protective wheel safety hood
      const hood = new THREE.Mesh(
        new THREE.CylinderGeometry(0.36, 0.36, 0.34, 24, 1, false, 0, Math.PI),
        m.safetyYellow,
      );
      hood.rotation.z = Math.PI / 2;
      hood.rotation.x = -0.45;
      hood.position.set(0.36, 0.58, 0);
      g.add(hood);

      enableShadows(g);
      return g;
    }

    case 'engine_hoist_crane': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.76, shadowTex, 0.58));

      // Spreading outrigger A-frame steel legs + 6 swivel casters
      const rearSpine = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.07, 0.08), m.fiaRed);
      rearSpine.position.set(0, 0.09, -0.42);
      g.add(rearSpine);

      for (const s of [-1, 1]) {
        const leg = createStrutBetween(
          new THREE.Vector3(s * 0.28, 0.09, -0.42),
          new THREE.Vector3(s * 0.46, 0.09, 0.62),
          0.04,
          0.04,
          m.fiaRed,
          6,
        );
        g.add(leg);
      }
      const casterGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.03, 14);
      casterGeo.rotateZ(Math.PI / 2);
      const casterPts: Array<[number, number]> = [
        [-0.36, -0.42],
        [0.36, -0.42],
        [-0.46, 0.62],
        [0.46, 0.62],
      ];
      for (const [cx, cz] of casterPts) {
        const c = new THREE.Mesh(casterGeo, m.rubberDark);
        c.position.set(cx, 0.045, cz);
        g.add(c);
      }

      // Vertical main upright mast + rear gusset
      const upright = new THREE.Mesh(new THREE.BoxGeometry(0.09, 1.32, 0.09), m.fiaRed);
      upright.position.set(0, 0.74, -0.36);
      g.add(upright);

      // Angled lifting jib boom
      const boom = createStrutBetween(
        new THREE.Vector3(0, 1.36, -0.38),
        new THREE.Vector3(0, 1.72, 0.58),
        0.042,
        0.045,
        m.fiaRed,
        6,
      );
      g.add(boom);

      // Hydraulic ram bottle & polished chrome cylinder piston
      const ramBottle = createStrutBetween(
        new THREE.Vector3(0, 0.62, -0.32),
        new THREE.Vector3(0, 1.12, -0.02),
        0.036,
        0.036,
        m.matteBlack,
        14,
      );
      g.add(ramBottle);
      const piston = createStrutBetween(
        new THREE.Vector3(0, 1.08, -0.04),
        new THREE.Vector3(0, 1.52, 0.16),
        0.02,
        0.02,
        m.chrome,
        12,
      );
      g.add(piston);

      // Hanging steel chain & forged lifting hook
      const chain = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.34, 8), m.chrome);
      chain.position.set(0, 1.52, 0.56);
      g.add(chain);
      const hook = new THREE.Mesh(new THREE.TorusGeometry(0.042, 0.012, 8, 14, Math.PI * 1.4), m.safetyYellow);
      hook.position.set(0, 1.31, 0.56);
      g.add(hook);

      enableShadows(g);
      return g;
    }

    case 'carbon_pit_trolley': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.56, shadowTex, 0.38));

      // 4 casters
      const wheelGeo = new THREE.CylinderGeometry(0.048, 0.048, 0.03, 14);
      wheelGeo.rotateZ(Math.PI / 2);
      for (const cx of [-0.42, 0.42]) {
        for (const cz of [-0.22, 0.22]) {
          const w = new THREE.Mesh(wheelGeo, m.rubberDark);
          w.position.set(cx, 0.048, cz);
          g.add(w);
        }
      }

      // 4 chrome corner uprights
      for (const px of [-0.44, 0.44]) {
        for (const pz of [-0.24, 0.24]) {
          const post = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.84, 12), m.chrome);
          post.position.set(px, 0.48, pz);
          g.add(post);
        }
      }

      // 3 carbon-trimmed equipment trays
      for (const ty of [0.16, 0.5, 0.84]) {
        const tray = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.035, 0.52), m.carbonWeave);
        tray.position.y = ty;
        g.add(tray);

        const trim = new THREE.Mesh(new THREE.BoxGeometry(0.94, 0.045, 0.54), m.anodizedBlack);
        trim.position.y = ty + 0.015;
        trim.scale.set(1, 0.6, 1);
        g.add(trim);
      }

      // Ergonomic push handle
      const pushBar = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.48, 12), m.fiaRed);
      pushBar.rotation.x = Math.PI / 2;
      pushBar.position.set(0.51, 0.92, 0);
      g.add(pushBar);

      enableShadows(g);
      return g;
    }

    case 'corner_weight_pad': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.46, shadowTex, 0.4));

      // CNC billet aluminum weighing platform
      const platform = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.045, 0.46), m.brushedSteel);
      platform.position.y = 0.025;
      g.add(platform);

      const gridTop = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.01, 0.4), m.anodizedBlack);
      gridTop.position.y = 0.05;
      g.add(gridTop);

      // Twin yellow beveled drive-up approach ramps
      const rampGeo = new THREE.BoxGeometry(0.44, 0.038, 0.16);
      for (const sz of [-0.3, 0.3]) {
        const ramp = new THREE.Mesh(rampGeo, m.safetyYellow);
        ramp.position.set(0, 0.019, sz);
        ramp.rotation.x = sz > 0 ? 0.18 : -0.18;
        g.add(ramp);
      }

      // Wireless digital scale readout console resting alongside pad
      const meter = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.045, 0.13), m.darkSlate);
      meter.position.set(0.34, 0.025, 0.14);
      meter.rotation.y = -0.35;
      g.add(meter);
      const readout = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 0.09), m.telemetryScreen);
      readout.rotation.x = -Math.PI / 2;
      readout.rotation.z = -0.35;
      readout.position.set(0.34, 0.05, 0.14);
      g.add(readout);

      enableShadows(g);
      return g;
    }

    case 'oil_drum': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.36, shadowTex));

      const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.285, 0.285, 0.88, 28), m.fiaBlue);
      barrel.position.y = 0.44;
      g.add(barrel);

      const band = new THREE.Mesh(new THREE.CylinderGeometry(0.288, 0.288, 0.18, 28, 1, true), m.pureWhite);
      band.position.y = 0.46;
      g.add(band);

      for (const ry of [0.015, 0.3, 0.62, 0.865]) {
        const hoop = new THREE.Mesh(new THREE.TorusGeometry(0.288, 0.014, 10, 28), m.fiaBlue);
        hoop.rotation.x = Math.PI / 2;
        hoop.position.y = ry;
        g.add(hoop);
      }

      const bung1 = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.02, 12), m.brushedSteel);
      bung1.position.set(0.14, 0.885, 0);
      g.add(bung1);
      const bung2 = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.02, 12), m.brass);
      bung2.position.set(-0.14, 0.885, 0);
      g.add(bung2);

      enableShadows(g);
      return g;
    }

    case 'flight_case': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.42, shadowTex, 0.3));

      const shell = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.42, 0.46), m.anodizedBlack);
      shell.position.y = 0.21;
      g.add(shell);

      const seam = new THREE.Mesh(new THREE.BoxGeometry(0.695, 0.032, 0.475), m.brushedSteel);
      seam.position.y = 0.32;
      g.add(seam);

      const latchGeo = new THREE.BoxGeometry(0.055, 0.07, 0.025);
      for (const lx of [-0.18, 0.18]) {
        const latch = new THREE.Mesh(latchGeo, m.chrome);
        latch.position.set(lx, 0.32, 0.238);
        g.add(latch);
      }

      const cornerGeo = new THREE.SphereGeometry(0.026, 10, 8);
      for (const cx of [-0.34, 0.34]) {
        for (const cy of [0.02, 0.41]) {
          for (const cz of [-0.23, 0.23]) {
            const c = new THREE.Mesh(cornerGeo, m.brushedSteel);
            c.position.set(cx, cy, cz);
            g.add(c);
          }
        }
      }

      enableShadows(g);
      return g;
    }

    case 'cargo_pallet': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.56, shadowTex, 0.46));

      const deckGeo = new THREE.BoxGeometry(0.88, 0.022, 0.12);
      for (let i = -2; i <= 2; i++) {
        const slat = new THREE.Mesh(deckGeo, m.woodCrate);
        slat.position.set(0, 0.11, i * 0.16);
        g.add(slat);
      }
      const blockGeo = new THREE.BoxGeometry(0.12, 0.085, 0.12);
      for (const bx of [-0.36, 0, 0.36]) {
        for (const bz of [-0.3, 0.3]) {
          const blk = new THREE.Mesh(blockGeo, m.woodCrate);
          blk.position.set(bx, 0.055, bz);
          g.add(blk);
        }
      }

      const crate = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.62, 0.64), m.woodCrate);
      crate.position.y = 0.43;
      g.add(crate);

      const bandGeo = new THREE.BoxGeometry(0.025, 0.64, 0.655);
      for (const bx of [-0.22, 0.22]) {
        const b = new THREE.Mesh(bandGeo, m.anodizedBlack);
        b.position.set(bx, 0.43, 0);
        g.add(b);
      }

      enableShadows(g);
      return g;
    }

    case 'spill_kit_bin': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.42, shadowTex, 0.34));

      // Rear wheels + front skid feet
      const wheelGeo = new THREE.CylinderGeometry(0.075, 0.075, 0.036, 16);
      wheelGeo.rotateZ(Math.PI / 2);
      for (const sx of [-0.24, 0.24]) {
        const w = new THREE.Mesh(wheelGeo, m.rubberDark);
        w.position.set(sx, 0.075, -0.18);
        g.add(w);
      }

      // High-vis yellow wheeled containment locker bin
      const bin = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.72, 0.44), m.safetyYellow);
      bin.position.y = 0.44;
      g.add(bin);

      const lid = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.07, 0.48), m.anodizedBlack);
      lid.position.y = 0.83;
      g.add(lid);

      const hazardBand = new THREE.Mesh(new THREE.BoxGeometry(0.51, 0.085, 0.45), m.hazardYellowBlack);
      hazardBand.position.y = 0.56;
      g.add(hazardBand);

      // Rear push bar
      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.44, 10), m.anodizedBlack);
      handle.rotation.z = Math.PI / 2;
      handle.position.set(0, 0.88, -0.26);
      g.add(handle);

      enableShadows(g);
      return g;
    }

    case 'first_aid_case': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.38, shadowTex, 0.28));

      // Rescue-orange molded trauma trunk
      const box = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.28, 0.38), m.hdpeOrange);
      box.position.y = 0.14;
      g.add(box);

      const lid = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.075, 0.4), m.darkSlate);
      lid.position.y = 0.3;
      g.add(lid);

      // Medical cross emblem plate on front & top
      const frontCross = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 0.14), m.firstAidPlate);
      frontCross.position.set(0, 0.16, 0.192);
      g.add(frontCross);
      const topCross = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.16), m.firstAidPlate);
      topCross.rotation.x = -Math.PI / 2;
      topCross.position.set(0, 0.339, 0);
      g.add(topCross);

      // Heavy latches
      for (const lx of [-0.18, 0.18]) {
        const latch = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.08, 0.025), m.anodizedBlack);
        latch.position.set(lx, 0.26, 0.2);
        g.add(latch);
      }

      enableShadows(g);
      return g;
    }

    case 'cable_reel_drum': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.38, shadowTex, 0.3));

      // A-frame tubular steel stand
      for (const sx of [-0.21, 0.21]) {
        const foot = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.032, 0.42), m.rubberDark);
        foot.position.set(sx, 0.016, 0);
        g.add(foot);
        g.add(
          createStrutBetween(
            new THREE.Vector3(sx, 0.03, -0.18),
            new THREE.Vector3(sx, 0.36, 0),
            0.014,
            0.014,
            m.brushedSteel,
            8,
          ),
        );
        g.add(
          createStrutBetween(
            new THREE.Vector3(sx, 0.03, 0.18),
            new THREE.Vector3(sx, 0.36, 0),
            0.014,
            0.014,
            m.brushedSteel,
            8,
          ),
        );
      }

      // Flanged steel reel drum wound with thick coiled orange 3-phase power cable
      for (const fx of [-0.16, 0.16]) {
        const flange = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.018, 24), m.anodizedBlack);
        flange.rotation.z = Math.PI / 2;
        flange.position.set(fx, 0.32, 0);
        g.add(flange);
      }

      const woundCable = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.3, 24), m.hdpeOrange);
      woundCable.rotation.z = Math.PI / 2;
      woundCable.position.y = 0.32;
      g.add(woundCable);

      // Triple industrial IP67 power socket cluster on drum hub
      for (const sy of [0.25, 0.34, 0.41]) {
        const sock = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.045, 14), m.fiaBlue);
        sock.rotation.z = Math.PI / 2;
        sock.position.set(0.185, sy, sy === 0.34 ? 0.07 : -0.05);
        g.add(sock);
      }

      const handle = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.014, 8, 16, Math.PI), m.safetyYellow);
      handle.position.y = 0.56;
      g.add(handle);

      enableShadows(g);
      return g;
    }

    case 'tire_warmer_rack': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.7, shadowTex, 0.44));

      // Powered tire blanket heater cart (4 racing slicks wrapped in quilted red thermal warmers)
      const wheelGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.03, 14);
      wheelGeo.rotateZ(Math.PI / 2);
      for (const cx of [-0.54, 0.54]) {
        for (const cz of [-0.26, 0.26]) {
          const c = new THREE.Mesh(wheelGeo, m.rubberDark);
          c.position.set(cx, 0.045, cz);
          g.add(c);
        }
      }

      for (const rx of [-0.58, 0.58]) {
        for (const rz of [-0.24, 0.24]) {
          const post = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.92, 12), m.anodizedBlack);
          post.position.set(rx, 0.5, rz);
          g.add(post);
        }
      }
      const railGeo = new THREE.CylinderGeometry(0.016, 0.016, 1.18, 12);
      railGeo.rotateZ(Math.PI / 2);
      for (const rz of [-0.22, 0.22]) {
        const r = new THREE.Mesh(railGeo, m.anodizedBlack);
        r.position.set(0, 0.14, rz);
        g.add(r);
      }

      // 4 Blanket-wrapped slicks
      for (let i = 0; i < 4; i++) {
        const px = -0.42 + i * 0.28;
        const blanket = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.26, 28), m.fiaRed);
        blanket.rotation.z = Math.PI / 2;
        blanket.position.set(px, 0.46, 0);
        g.add(blanket);

        const strap = new THREE.Mesh(new THREE.CylinderGeometry(0.328, 0.328, 0.045, 28), m.matteBlack);
        strap.rotation.z = Math.PI / 2;
        strap.position.set(px, 0.46, 0);
        g.add(strap);

        const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.27, 20), m.gunmetal);
        rim.rotation.z = Math.PI / 2;
        rim.position.set(px, 0.46, 0);
        g.add(rim);
      }

      // Heater control power box + amber LED temp indicator on end rail
      const ctrlBox = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.22, 0.34), m.darkSlate);
      ctrlBox.position.set(0.62, 0.62, 0);
      g.add(ctrlBox);
      const tempLed = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.08, 0.16), m.amberBeacon);
      tempLed.position.set(0.682, 0.65, 0);
      g.add(tempLed);

      enableShadows(g);
      return g;
    }

    case 'diag_laptop_stand': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.36, shadowTex));

      // 5-star caster diagnostic workshop roll-stand + rugged motorsport ECU Toughbook laptop
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.055, 0.06, 16), m.anodizedBlack);
      hub.position.y = 0.075;
      g.add(hub);

      for (let i = 0; i < 5; i++) {
        const a = (i * Math.PI * 2) / 5;
        g.add(
          createStrutBetween(
            new THREE.Vector3(0, 0.07, 0),
            new THREE.Vector3(Math.cos(a) * 0.28, 0.04, Math.sin(a) * 0.28),
            0.014,
            0.014,
            m.brushedSteel,
            8,
          ),
        );
        const w = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.02, 12), m.rubberDark);
        w.rotation.z = Math.PI / 2;
        w.position.set(Math.cos(a) * 0.28, 0.025, Math.sin(a) * 0.28);
        g.add(w);
      }

      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.024, 0.96, 14), m.anodizedBlack);
      post.position.y = 0.56;
      g.add(post);

      const obdPod = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.18, 0.07), m.fiaBlue);
      obdPod.position.set(0, 0.68, -0.045);
      g.add(obdPod);

      const tray = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.024, 0.34), m.darkSlate);
      tray.position.y = 1.04;
      g.add(tray);

      // Rugged laptop base & hinged ECU telemetry lid
      const base = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.026, 0.25), m.matteBlack);
      base.position.set(0, 1.065, 0.02);
      g.add(base);

      const lid = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.23, 0.022), m.safetyYellow);
      lid.position.set(0, 1.18, -0.105);
      lid.rotation.x = -0.18;
      g.add(lid);
      const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.19), m.ecuLaptopScreen);
      scr.position.set(0, 1.18, -0.092);
      scr.rotation.x = -0.18;
      g.add(scr);

      enableShadows(g);
      return g;
    }

    case 'hv_safety_locker': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.42, shadowTex, 0.34));

      // Rolling HV Battery Rescue & Insulated Safety Locker with HV lightning sign + side hook pole
      const wheelGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.028, 12);
      wheelGeo.rotateZ(Math.PI / 2);
      for (const sx of [-0.22, 0.22]) {
        for (const sz of [-0.18, 0.18]) {
          const c = new THREE.Mesh(wheelGeo, m.rubberDark);
          c.position.set(sx, 0.045, sz);
          g.add(c);
        }
      }

      const cabinet = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.86, 0.44), m.safetyYellow);
      cabinet.position.y = 0.52;
      g.add(cabinet);

      const topTray = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.06, 0.46), m.anodizedBlack);
      topTray.position.y = 0.96;
      g.add(topTray);

      const badge = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 0.24), m.hvBoltPlate);
      badge.position.set(0, 0.62, 0.222);
      g.add(badge);

      // Insulated dielectric rescue hook pole mounted vertically on side
      const hookPole = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.12, 12), m.hdpeOrange);
      hookPole.position.set(0.31, 0.64, 0);
      g.add(hookPole);
      const hookTip = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.01, 8, 14, Math.PI * 1.2), m.brushedSteel);
      hookTip.position.set(0.31, 1.22, 0);
      g.add(hookTip);

      enableShadows(g);
      return g;
    }

    default:
      return null;
  }
}
