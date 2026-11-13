import * as THREE from 'three';
import {
  createContactShadowMesh,
  createStrutBetween,
  enableShadows,
  type PropPalette,
} from './propMaterials';

export function buildTrackProp(id: string, p: PropPalette): THREE.Group | null {
  const m = p.materials;
  const shadowTex = p.textures.contactShadowMap;

  switch (id) {
    case 'apex_cone': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.32, shadowTex));
      const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.215, 0.235, 0.036, 8), m.rubberDark);
      pad.position.y = 0.018;
      pad.rotation.y = Math.PI / 8;
      g.add(pad);

      const flange = new THREE.Mesh(new THREE.CylinderGeometry(0.165, 0.195, 0.026, 24), m.rubberDark);
      flange.position.y = 0.049;
      g.add(flange);

      const cleatGeo = new THREE.BoxGeometry(0.055, 0.018, 0.032);
      for (let i = 0; i < 4; i++) {
        const a = (i * Math.PI) / 2 + Math.PI / 4;
        const c = new THREE.Mesh(cleatGeo, m.rubberDark);
        c.position.set(Math.cos(a) * 0.19, 0.04, Math.sin(a) * 0.19);
        c.rotation.y = -a;
        g.add(c);
      }

      const profile = [
        new THREE.Vector2(0.156, 0.055),
        new THREE.Vector2(0.148, 0.12),
        new THREE.Vector2(0.052, 0.728),
        new THREE.Vector2(0.047, 0.748),
        new THREE.Vector2(0.037, 0.75),
        new THREE.Vector2(0.035, 0.72),
      ];
      g.add(new THREE.Mesh(new THREE.LatheGeometry(profile, 32), m.hdpeOrange));

      const throat = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.046, 0.12, 24, 1, true), m.matteBlack);
      throat.position.y = 0.685;
      g.add(throat);

      const b1 = new THREE.Mesh(new THREE.CylinderGeometry(0.116, 0.132, 0.105, 32, 1, true), m.retroWhite);
      b1.position.y = 0.282;
      g.add(b1);

      const b2 = new THREE.Mesh(new THREE.CylinderGeometry(0.083, 0.099, 0.105, 32, 1, true), m.retroWhite);
      b2.position.y = 0.498;
      g.add(b2);

      enableShadows(g);
      return g;
    }

    case 'slalom_cone': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.3, shadowTex));
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.195, 0.026, 32), m.rubberDark);
      base.position.y = 0.013;
      g.add(base);

      const ribGeo = new THREE.BoxGeometry(0.075, 0.024, 0.02);
      for (let i = 0; i < 4; i++) {
        const a = (i * Math.PI) / 2;
        const r = new THREE.Mesh(ribGeo, m.rubberDark);
        r.position.set(Math.cos(a) * 0.148, 0.032, Math.sin(a) * 0.148);
        r.rotation.y = -a;
        g.add(r);
      }

      const skirt = new THREE.Mesh(new THREE.CylinderGeometry(0.132, 0.158, 0.084, 32), m.carbonWeave);
      skirt.position.y = 0.068;
      g.add(skirt);

      const profile = [
        new THREE.Vector2(0.133, 0.105),
        new THREE.Vector2(0.066, 0.425),
        new THREE.Vector2(0.056, 0.448),
        new THREE.Vector2(0.044, 0.448),
        new THREE.Vector2(0.042, 0.415),
      ];
      g.add(new THREE.Mesh(new THREE.LatheGeometry(profile, 32), m.limeSafety));

      const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.092, 0.111, 0.085, 32, 1, true), m.retroWhite);
      collar.position.y = 0.262;
      g.add(collar);

      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.051, 0.011, 12, 28), m.limeSafety);
      rim.rotation.x = Math.PI / 2;
      rim.position.y = 0.446;
      g.add(rim);

      enableShadows(g);
      return g;
    }

    case 'bollard_cone': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.28, shadowTex));
      const hex = new THREE.Mesh(new THREE.CylinderGeometry(0.165, 0.178, 0.032, 6), m.rubberDark);
      hex.position.y = 0.016;
      g.add(hex);

      const boltGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.016, 6);
      for (let i = 0; i < 4; i++) {
        const a = (i * Math.PI) / 2 + Math.PI / 4;
        const b = new THREE.Mesh(boltGeo, m.brushedSteel);
        b.position.set(Math.cos(a) * 0.122, 0.036, Math.sin(a) * 0.122);
        g.add(b);
      }

      const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.072, 0.088, 0.083, 24), m.matteBlack);
      neck.position.y = 0.0735;
      g.add(neck);

      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.078, 0.01, 10, 24), m.matteBlack);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 0.075;
      g.add(ring);

      const postProfile = [
        new THREE.Vector2(0.068, 0.115),
        new THREE.Vector2(0.062, 0.55),
        new THREE.Vector2(0.056, 0.945),
        new THREE.Vector2(0.048, 0.962),
        new THREE.Vector2(0.0, 0.965),
      ];
      g.add(new THREE.Mesh(new THREE.LatheGeometry(postProfile, 28), m.fiaRed));

      const s1 = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.0675, 0.18, 28, 1, true), m.retroWhite);
      s1.position.y = 0.34;
      g.add(s1);

      const s2 = new THREE.Mesh(new THREE.CylinderGeometry(0.0595, 0.062, 0.18, 28, 1, true), m.retroWhite);
      s2.position.y = 0.67;
      g.add(s2);

      const crown = new THREE.Mesh(
        new THREE.SphereGeometry(0.052, 24, 14, 0, Math.PI * 2, 0, Math.PI * 0.55),
        m.amberBeacon,
      );
      crown.position.y = 0.95;
      g.add(crown);

      enableShadows(g);
      return g;
    }

    case 'cone_stack': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.36, shadowTex));
      // Wheeled steel caddy deck
      const deck = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.23, 0.032, 24), m.anodizedBlack);
      deck.position.y = 0.065;
      g.add(deck);

      // 4 swivel casters
      const wheelGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.018, 14);
      wheelGeo.rotateZ(Math.PI / 2);
      for (let i = 0; i < 4; i++) {
        const a = (i * Math.PI) / 2 + Math.PI / 4;
        const w = new THREE.Mesh(wheelGeo, m.rubberDark);
        w.position.set(Math.cos(a) * 0.16, 0.025, Math.sin(a) * 0.16);
        g.add(w);
      }

      // Vertical caddy pull bar at rear
      const pullPost = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.92, 10), m.brushedSteel);
      pullPost.position.set(0, 0.52, -0.22);
      g.add(pullPost);
      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.013, 0.24, 10), m.rubberDark);
      handle.rotation.z = Math.PI / 2;
      handle.position.set(0, 0.98, -0.22);
      g.add(handle);

      // 5 nested cones stacked vertically (+0.075m each)
      const coneShellGeo = new THREE.CylinderGeometry(0.044, 0.155, 0.68, 24, 1, true);
      const baseGeo = new THREE.BoxGeometry(0.35, 0.024, 0.35);
      const bandGeo = new THREE.CylinderGeometry(0.088, 0.106, 0.1, 24, 1, true);
      for (let i = 0; i < 5; i++) {
        const yOff = 0.085 + i * 0.072;
        const b = new THREE.Mesh(baseGeo, m.rubberDark);
        b.position.y = yOff;
        b.rotation.y = i * 0.04;
        g.add(b);

        const c = new THREE.Mesh(coneShellGeo, m.hdpeOrange);
        c.position.y = yOff + 0.34;
        g.add(c);

        if (i === 4) {
          const band = new THREE.Mesh(bandGeo, m.retroWhite);
          band.position.y = yOff + 0.44;
          g.add(band);
        }
      }

      enableShadows(g);
      return g;
    }

    case 'foldable_cone': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.28, shadowTex));
      const plinth = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.036, 0.32), m.rubberDark);
      plinth.position.y = 0.018;
      g.add(plinth);

      // Ribbed telescopic safety rings
      for (let i = 0; i < 6; i++) {
        const rTop = 0.135 - i * 0.016;
        const rBot = rTop + 0.012;
        const seg = new THREE.Mesh(
          new THREE.CylinderGeometry(rTop, rBot, 0.09, 24),
          i === 3 ? m.retroWhite : m.hdpeOrange,
        );
        seg.position.y = 0.08 + i * 0.086;
        g.add(seg);
      }

      // LED warning beacon cap
      const capBase = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.046, 0.03, 18), m.anodizedBlack);
      capBase.position.y = 0.59;
      g.add(capBase);

      const beacon = new THREE.Mesh(
        new THREE.CylinderGeometry(0.034, 0.038, 0.065, 18),
        m.amberBeacon,
      );
      beacon.position.y = 0.635;
      g.add(beacon);

      enableShadows(g);
      return g;
    }

    case 'lane_divider': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.25, shadowTex));
      const basePlate = new THREE.Mesh(new THREE.CylinderGeometry(0.135, 0.145, 0.028, 20), m.rubberDark);
      basePlate.position.y = 0.014;
      g.add(basePlate);

      // Steel spring coil housing
      const springCoil = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.036, 0.12, 16), m.brushedSteel);
      springCoil.position.y = 0.085;
      g.add(springCoil);

      // Yellow flat paddle blade with hazard stripe insert
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.72, 0.026), m.safetyYellow);
      blade.position.y = 0.5;
      g.add(blade);

      const stripeFace = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.56, 0.03), m.hazardYellowBlack);
      stripeFace.position.y = 0.52;
      g.add(stripeFace);

      enableShadows(g);
      return g;
    }

    case 'tire_stack': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.46, shadowTex));
      const baseRing = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.255, 0.014, 24), m.brushedSteel);
      baseRing.position.y = 0.007;
      g.add(baseRing);

      const tireProfile = [
        new THREE.Vector2(0.175, 0.012),
        new THREE.Vector2(0.21, 0.0),
        new THREE.Vector2(0.32, 0.0),
        new THREE.Vector2(0.34, 0.032),
        new THREE.Vector2(0.34, 0.208),
        new THREE.Vector2(0.32, 0.24),
        new THREE.Vector2(0.21, 0.24),
        new THREE.Vector2(0.175, 0.228),
        new THREE.Vector2(0.175, 0.2),
        new THREE.Vector2(0.205, 0.18),
        new THREE.Vector2(0.205, 0.06),
        new THREE.Vector2(0.175, 0.04),
        new THREE.Vector2(0.175, 0.012),
      ];
      const tireGeo = new THREE.LatheGeometry(tireProfile, 32);

      const layers = [
        { y: 0.004, x: 0, z: 0, rot: 0.1, mat: m.tireBlack },
        { y: 0.242, x: 0.014, z: -0.01, rot: 1.4, mat: m.tireWhite },
        { y: 0.48, x: -0.012, z: 0.012, rot: 2.3, mat: m.tireRed },
      ];
      const beadGeo = new THREE.TorusGeometry(0.184, 0.01, 10, 28);
      for (const l of layers) {
        const t = new THREE.Mesh(tireGeo, l.mat);
        t.position.set(l.x, l.y, l.z);
        t.rotation.y = l.rot;
        g.add(t);

        const cav = new THREE.Mesh(
          new THREE.CylinderGeometry(0.185, 0.185, 0.18, 22, 1, true),
          m.matteBlack,
        );
        cav.position.set(l.x, l.y + 0.12, l.z);
        g.add(cav);

        const bead = new THREE.Mesh(beadGeo, m.matteBlack);
        bead.rotation.x = Math.PI / 2;
        bead.position.set(l.x, l.y + 0.228, l.z);
        g.add(bead);
      }

      const strapGeo = new THREE.BoxGeometry(0.036, 0.72, 0.014);
      const clampGeo = new THREE.BoxGeometry(0.052, 0.022, 0.046);
      const boltGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.018, 6);
      for (const s of [-1, 1]) {
        const strap = new THREE.Mesh(strapGeo, m.brushedSteel);
        strap.position.set(0, 0.365, s * 0.344);
        g.add(strap);
        const clamp = new THREE.Mesh(clampGeo, m.brushedSteel);
        clamp.position.set(0, 0.722, s * 0.33);
        g.add(clamp);
        const bolt = new THREE.Mesh(boltGeo, m.brushedSteel);
        bolt.position.set(0, 0.735, s * 0.33);
        g.add(bolt);
      }

      enableShadows(g);
      return g;
    }

    case 'jersey_barrier': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.92, shadowTex, 0.38));

      const profile = new THREE.Shape();
      profile.moveTo(-0.26, 0);
      profile.lineTo(0.26, 0);
      profile.lineTo(0.26, 0.085);
      profile.lineTo(0.14, 0.23);
      profile.lineTo(0.095, 0.8);
      profile.lineTo(0.075, 0.82);
      profile.lineTo(-0.075, 0.82);
      profile.lineTo(-0.095, 0.8);
      profile.lineTo(-0.14, 0.23);
      profile.lineTo(-0.26, 0.085);
      profile.closePath();

      const extrudeGeo = new THREE.ExtrudeGeometry(profile, {
        depth: 1.46,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 1,
        bevelSize: 0.015,
        bevelThickness: 0.015,
      });
      extrudeGeo.rotateY(Math.PI / 2);
      extrudeGeo.translate(-0.73, 0.014, 0);
      g.add(new THREE.Mesh(extrudeGeo, m.polymerOrange));

      const pocketGeo = new THREE.BoxGeometry(0.22, 0.072, 0.545);
      for (const px of [-0.42, 0.42]) {
        const pocket = new THREE.Mesh(pocketGeo, m.rubberDark);
        pocket.position.set(px, 0.04, 0);
        g.add(pocket);
      }

      const ribGeo = new THREE.BoxGeometry(0.045, 0.42, 0.24);
      for (const px of [-0.48, 0, 0.48]) {
        const rib = new THREE.Mesh(ribGeo, m.polymerOrange);
        rib.position.set(px, 0.5, 0);
        g.add(rib);
      }

      const stripGeo = new THREE.BoxGeometry(1.16, 0.105, 0.012);
      for (const side of [-1, 1]) {
        const strip = new THREE.Mesh(stripGeo, m.hazardRedWhite);
        strip.position.set(0, 0.675, side * 0.129);
        strip.rotation.x = side > 0 ? -0.078 : 0.078;
        g.add(strip);
      }

      const lugGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.14, 16);
      const lLug = new THREE.Mesh(lugGeo, m.polymerOrange);
      lLug.position.set(-0.78, 0.48, 0);
      g.add(lLug);

      const rLug1 = new THREE.Mesh(lugGeo, m.polymerOrange);
      rLug1.position.set(0.78, 0.62, 0);
      g.add(rLug1);
      const rLug2 = new THREE.Mesh(lugGeo, m.polymerOrange);
      rLug2.position.set(0.78, 0.34, 0);
      g.add(rLug2);

      const lockPin = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.46, 12), m.brushedSteel);
      lockPin.position.set(0.78, 0.5, 0);
      g.add(lockPin);

      const fillNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.052, 0.025, 20), m.rubberDark);
      fillNeck.position.set(0.32, 0.835, 0);
      g.add(fillNeck);
      const fillCap = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.042, 0.02, 8), m.brushedSteel);
      fillCap.position.set(0.32, 0.85, 0);
      g.add(fillCap);

      enableShadows(g);
      return g;
    }

    case 'tecpro_block': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.72, shadowTex, 0.44));

      // Red energy-absorbing core block
      const core = new THREE.Mesh(new THREE.BoxGeometry(1.16, 0.88, 0.56), m.fiaRed);
      core.position.y = 0.46;
      g.add(core);

      // Front & rear white high-density foam bumper pads
      const padGeo = new THREE.BoxGeometry(1.06, 0.64, 0.08);
      for (const side of [-1, 1]) {
        const pad = new THREE.Mesh(padGeo, m.pureWhite);
        pad.position.set(0, 0.44, side * 0.285);
        g.add(pad);
      }

      // Black molded internal reinforcement ribs + top grab recess
      const strapGeo = new THREE.BoxGeometry(0.06, 0.91, 0.66);
      for (const sx of [-0.36, 0.36]) {
        const strap = new THREE.Mesh(strapGeo, m.matteBlack);
        strap.position.set(sx, 0.46, 0);
        g.add(strap);
      }

      // Interlocking steel side linkage pin
      const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.72, 12), m.brushedSteel);
      pin.position.set(0.61, 0.46, 0);
      g.add(pin);

      enableShadows(g);
      return g;
    }

    case 'armco_section': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(1.06, shadowTex, 0.28));

      // Two heavy steel baseplates + gussets
      const plateGeo = new THREE.BoxGeometry(0.28, 0.024, 0.28);
      const postGeo = new THREE.BoxGeometry(0.08, 0.76, 0.11);
      for (const px of [-0.68, 0.68]) {
        const plate = new THREE.Mesh(plateGeo, m.anodizedBlack);
        plate.position.set(px, 0.012, -0.05);
        g.add(plate);

        const post = new THREE.Mesh(postGeo, m.gunmetal);
        post.position.set(px, 0.39, -0.05);
        g.add(post);
      }

      // Corrugated W-beam double-wave steel guardrail
      const upperBeam = new THREE.Mesh(new THREE.BoxGeometry(1.98, 0.12, 0.06), m.brushedSteel);
      upperBeam.position.set(0, 0.62, 0.04);
      g.add(upperBeam);

      const centerRecess = new THREE.Mesh(new THREE.BoxGeometry(1.98, 0.09, 0.04), m.gunmetal);
      centerRecess.position.set(0, 0.51, 0.025);
      g.add(centerRecess);

      const lowerBeam = new THREE.Mesh(new THREE.BoxGeometry(1.98, 0.12, 0.06), m.brushedSteel);
      lowerBeam.position.set(0, 0.4, 0.04);
      g.add(lowerBeam);

      // Reflective red/white delineator tabs on guardrail
      const refGeo = new THREE.BoxGeometry(0.12, 0.07, 0.015);
      for (const rx of [-0.68, 0, 0.68]) {
        const ref = new THREE.Mesh(refGeo, m.hazardRedWhite);
        ref.position.set(rx, 0.51, 0.055);
        g.add(ref);
      }

      enableShadows(g);
      return g;
    }

    case 'rumble_curb': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.95, shadowTex, 0.36));

      // Wedged sawtooth kerb profile extruded along 1.76m
      const kerbShape = new THREE.Shape();
      kerbShape.moveTo(-0.28, 0);
      kerbShape.lineTo(0.28, 0);
      kerbShape.lineTo(0.28, 0.035);
      kerbShape.lineTo(0.08, 0.115);
      kerbShape.lineTo(-0.18, 0.085);
      kerbShape.lineTo(-0.28, 0.02);
      kerbShape.closePath();

      const segDepth = 0.28;
      const geo = new THREE.ExtrudeGeometry(kerbShape, { depth: segDepth, bevelEnabled: false });
      geo.rotateY(Math.PI / 2);

      for (let i = 0; i < 6; i++) {
        const seg = new THREE.Mesh(geo, i % 2 === 0 ? m.fiaRed : m.pureWhite);
        seg.position.set(-0.84 + i * 0.28, 0, 0);
        g.add(seg);
      }

      // Recessed anchor bolts
      const boltGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.02, 6);
      for (const bx of [-0.7, -0.14, 0.42]) {
        const b = new THREE.Mesh(boltGeo, m.brushedSteel);
        b.position.set(bx, 0.095, -0.05);
        g.add(b);
      }

      enableShadows(g);
      return g;
    }

    case 'speed_bump': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.56, shadowTex, 0.24));

      const ramp = new THREE.Mesh(new THREE.BoxGeometry(0.98, 0.075, 0.34), m.rubberDark);
      ramp.position.y = 0.0375;
      g.add(ramp);

      // Sloped side bevels
      const bevelGeo = new THREE.BoxGeometry(0.98, 0.032, 0.09);
      for (const side of [-1, 1]) {
        const bev = new THREE.Mesh(bevelGeo, m.rubberDark);
        bev.position.set(0, 0.026, side * 0.19);
        bev.rotation.x = side * 0.42;
        g.add(bev);
      }

      // Twin hinged yellow cable-bridge lids
      const lidGeo = new THREE.BoxGeometry(0.45, 0.022, 0.26);
      for (const lx of [-0.24, 0.24]) {
        const lid = new THREE.Mesh(lidGeo, m.safetyYellow);
        lid.position.set(lx, 0.078, 0);
        g.add(lid);
      }

      enableShadows(g);
      return g;
    }

    case 'crowd_barricade': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.86, shadowTex, 0.28));

      // Splayed bridge feet
      const footGeo = new THREE.BoxGeometry(0.05, 0.035, 0.46);
      for (const fx of [-0.66, 0.66]) {
        const foot = new THREE.Mesh(footGeo, m.brushedSteel);
        foot.position.set(fx, 0.0175, 0);
        g.add(foot);
      }

      // Outer U-frame uprights & top/bottom rails
      const uprightGeo = new THREE.CylinderGeometry(0.019, 0.019, 1.04, 12);
      for (const fx of [-0.76, 0.76]) {
        const up = new THREE.Mesh(uprightGeo, m.brushedSteel);
        up.position.set(fx, 0.54, 0);
        g.add(up);
      }
      const railGeo = new THREE.CylinderGeometry(0.019, 0.019, 1.54, 12);
      railGeo.rotateZ(Math.PI / 2);
      for (const ry of [0.16, 1.05]) {
        const rail = new THREE.Mesh(railGeo, m.brushedSteel);
        rail.position.set(0, ry, 0);
        g.add(rail);
      }

      // Welded vertical pickets
      const picketGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.88, 8);
      for (let i = -3; i <= 3; i++) {
        const pck = new THREE.Mesh(picketGeo, m.brushedSteel);
        pck.position.set(i * 0.19, 0.605, 0);
        g.add(pck);
      }

      // Interlocking side hook lugs
      const hook = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.04, 0.02), m.gunmetal);
      hook.position.set(0.79, 0.78, 0);
      g.add(hook);

      enableShadows(g);
      return g;
    }

    case 'catch_post': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.34, shadowTex));

      const base = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.035, 0.4), m.anodizedBlack);
      base.position.y = 0.0175;
      g.add(base);

      // Heavy vertical I-beam mast
      const mast = new THREE.Mesh(new THREE.BoxGeometry(0.09, 1.45, 0.09), m.gunmetal);
      mast.position.set(0, 0.74, 0);
      g.add(mast);

      // Angled top debris overhang arm
      const topArm = createStrutBetween(
        new THREE.Vector3(0, 1.44, 0),
        new THREE.Vector3(0, 1.88, 0.34),
        0.04,
        0.045,
        m.gunmetal,
        8,
      );
      g.add(topArm);

      // Gusset brace & horizontal tension wire arms
      g.add(
        createStrutBetween(
          new THREE.Vector3(0, 0.04, -0.16),
          new THREE.Vector3(0, 0.55, -0.04),
          0.016,
          0.016,
          m.brushedSteel,
          8,
        ),
      );

      // 3 wire catch cables running across front face
      const cableGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.54, 8);
      cableGeo.rotateZ(Math.PI / 2);
      for (const cy of [0.55, 0.95, 1.35]) {
        const cab = new THREE.Mesh(cableGeo, m.brushedSteel);
        cab.position.set(0, cy, 0.055);
        g.add(cab);
      }

      enableShadows(g);
      return g;
    }

    case 'sand_barrel': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.44, shadowTex));

      const barrelProfile = [
        new THREE.Vector2(0.0, 0.0),
        new THREE.Vector2(0.32, 0.0),
        new THREE.Vector2(0.36, 0.08),
        new THREE.Vector2(0.37, 0.8),
        new THREE.Vector2(0.34, 0.86),
        new THREE.Vector2(0.28, 0.91),
        new THREE.Vector2(0.0, 0.92),
      ];
      g.add(new THREE.Mesh(new THREE.LatheGeometry(barrelProfile, 28), m.safetyYellow));

      // Black molded lid cap & hazard belly band
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.29, 0.34, 0.05, 28), m.matteBlack);
      cap.position.y = 0.88;
      g.add(cap);

      const band = new THREE.Mesh(
        new THREE.CylinderGeometry(0.374, 0.374, 0.14, 28, 1, true),
        m.hazardYellowBlack,
      );
      band.position.y = 0.52;
      g.add(band);

      enableShadows(g);
      return g;
    }

    case 'slalom_gate_pole': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.28, shadowTex));

      // Weighted square rubber gate base + spring pivot + red/white striped gate pole + pennant
      const base = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.036, 0.36), m.rubberDark);
      base.position.y = 0.018;
      g.add(base);

      const spring = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.032, 0.09, 14), m.brushedSteel);
      spring.position.y = 0.08;
      g.add(spring);

      const poleSegs = [
        [0.12, 0.42, m.fiaRed],
        [0.42, 0.72, m.pureWhite],
        [0.72, 1.02, m.fiaRed],
        [1.02, 1.32, m.pureWhite],
      ] as const;
      for (const [y0, y1, mat] of poleSegs) {
        const seg = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, y1 - y0, 14), mat);
        seg.position.y = (y0 + y1) / 2;
        g.add(seg);
      }

      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.022, 12, 10), m.safetyYellow);
      cap.position.y = 1.335;
      g.add(cap);

      // Triangular autocross gate pennant flag
      const pennant = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.16, 0.008), m.hdpeOrange);
      pennant.position.set(0.14, 1.22, 0);
      g.add(pennant);

      enableShadows(g);
      return g;
    }

    case 'safer_barrier_module': {
      const g = new THREE.Group();
      g.add(createContactShadowMesh(0.95, shadowTex, 0.42));

      // Base rubber curb plinth + steel backing frame + 3 red/blue foam shock blocks + front HSS steel box impact tubes
      const sleeper = new THREE.Mesh(new THREE.BoxGeometry(1.72, 0.06, 0.56), m.rubberDark);
      sleeper.position.y = 0.03;
      g.add(sleeper);

      const rearWall = new THREE.Mesh(new THREE.BoxGeometry(1.68, 0.86, 0.08), m.gunmetal);
      rearWall.position.set(0, 0.49, -0.2);
      g.add(rearWall);

      for (const [bx, mat] of [[-0.5, m.fiaRed], [0, m.fiaBlue], [0.5, m.fiaRed]] as const) {
        const foam = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.78, 0.22), mat);
        foam.position.set(bx, 0.46, -0.04);
        g.add(foam);
      }

      // 3 stacked HSS rectangular steel impact rails on front face + hazard stripe
      for (const ry of [0.22, 0.47, 0.72]) {
        const rail = new THREE.Mesh(new THREE.BoxGeometry(1.74, 0.16, 0.09), m.pureWhite);
        rail.position.set(0, ry, 0.13);
        g.add(rail);
      }
      const strip = new THREE.Mesh(new THREE.BoxGeometry(1.72, 0.09, 0.015), m.hazardRedWhite);
      strip.position.set(0, 0.47, 0.18);
      g.add(strip);

      enableShadows(g);
      return g;
    }

    default:
      return null;
  }
}
