import test from 'node:test';
import assert from 'node:assert/strict';
import { UNIFIED_ICON_SET } from '../assets/iconSet';
import { PROP_ASSETS } from '../assets/propCatalog';
import {
  buildCombinedIconSpriteSvg,
  filterIconsByFolderAndQuery,
  filterPropsByFolderAndQuery,
  isPropModelId,
  nextActorName,
  snapValue,
  snapWorldPosition,
} from './editorLogic';

test('snapValue snaps cleanly when enabled and preserves precision when disabled', () => {
  assert.equal(snapValue(1.24, 0.5, true), 1);
  assert.equal(snapValue(1.26, 0.5, true), 1.5);
  assert.equal(snapValue(-2.74, 0.5, true), -2.5);
  assert.equal(snapValue(1.23456, 0.5, false), 1.235);
});

test('snapWorldPosition clamps within track extent and sits on Y = 0 ground', () => {
  const [x, y, z] = snapWorldPosition(99, -99, 0.5, true, 20);
  assert.equal(x, 20);
  assert.equal(y, 0);
  assert.equal(z, -20);
});

test('nextActorName increments cleanly without collisions across cones, camera, fans, and workshop props', () => {
  assert.equal(nextActorName('apex_cone', []), 'FIA_Apex_Cone_01');
  assert.equal(
    nextActorName('apex_cone', [
      { uid: '1', modelId: 'apex_cone', name: 'FIA_Apex_Cone_01', position: [0, 0, 0], rotationY: 0, scale: 1 },
    ]),
    'FIA_Apex_Cone_02',
  );
  assert.equal(nextActorName('cinema_camera', []), 'Cinema_Camera_Rig_01');
  assert.equal(nextActorName('gimbal_camera', []), 'Gimbal_Camera_Rig_01');
  assert.equal(nextActorName('highspeed_phantom_cam', []), 'Phantom_HiHat_Cam_01');
  assert.equal(nextActorName('led_panel_stand', []), 'BiColor_LED_Panel_01');
  assert.equal(nextActorName('wind_fan', []), 'Brake_Cooling_Fan_01');
  assert.equal(nextActorName('fuel_station_pump', []), 'Racing_Fuel_Station_01');
  assert.equal(nextActorName('ev_charger_station', []), 'EV_Fast_Charger_01');
});

test('unified icon set has all 37 icons with unique IDs and zero duplicate gradient/filter IDs', () => {
  assert.equal(UNIFIED_ICON_SET.length, 37);

  const iconIds = new Set(UNIFIED_ICON_SET.map((i) => i.id));
  assert.equal(iconIds.size, 37, 'All 37 icon IDs must be unique');

  const sprite = buildCombinedIconSpriteSvg(UNIFIED_ICON_SET);
  for (const icon of UNIFIED_ICON_SET) {
    assert.ok(sprite.includes(`<symbol id="icon-${icon.id}" viewBox="0 0 128 128">`));
  }

  const defsMatch = sprite.match(/<defs>([\s\S]*?)<\/defs>/);
  assert.ok(defsMatch, 'Combined sprite must include <defs>');
  const idMatches = [...defsMatch[1].matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  const uniqueDefIds = new Set(idMatches);
  assert.equal(idMatches.length, uniqueDefIds.size, 'Defs IDs in combined SVG sprite must not collide');
});

test('filterIconsByFolderAndQuery filters categories and search terms accurately', () => {
  assert.equal(filterIconsByFolderAndQuery(UNIFIED_ICON_SET, 'icons_all', '').length, 37);
  assert.equal(filterIconsByFolderAndQuery(UNIFIED_ICON_SET, 'icons_physics', '').length, 13);
  assert.equal(filterIconsByFolderAndQuery(UNIFIED_ICON_SET, 'icons_diagnostics', '').length, 6);
  assert.equal(filterIconsByFolderAndQuery(UNIFIED_ICON_SET, 'icons_uv', '').length, 18);
});

test('prop catalog includes all 68 high-detail Engine props, dedicated Lighting & Stage rigs, upgraded non-tripod cameras, animated fans, and zero removed/filler props', () => {
  assert.equal(PROP_ASSETS.length, 68);

  const uniquePropIds = new Set(PROP_ASSETS.map((p) => p.id));
  assert.equal(uniquePropIds.size, 68, 'All 68 prop IDs must be unique');

  assert.equal(filterPropsByFolderAndQuery(PROP_ASSETS, 'props_all', '').length, 68);
  assert.equal(filterPropsByFolderAndQuery(PROP_ASSETS, 'props_cones', '').length, 7);
  assert.equal(filterPropsByFolderAndQuery(PROP_ASSETS, 'props_barriers', '').length, 10);
  assert.equal(filterPropsByFolderAndQuery(PROP_ASSETS, 'props_camera_fan', '').length, 11);
  assert.equal(filterPropsByFolderAndQuery(PROP_ASSETS, 'props_lighting', '').length, 9);
  assert.equal(filterPropsByFolderAndQuery(PROP_ASSETS, 'props_signs_timing', '').length, 10);
  assert.equal(filterPropsByFolderAndQuery(PROP_ASSETS, 'props_pit_garage', '').length, 14);
  assert.equal(filterPropsByFolderAndQuery(PROP_ASSETS, 'props_safety_cargo', '').length, 7);

  // Verify cameras (including 5 non-tripod rigs), 9 lighting props, animated fans, fuel + EV stations, and single brake marker
  assert.equal(filterPropsByFolderAndQuery(PROP_ASSETS, 'props_camera_fan', 'camera').length, 6);
  assert.equal(filterPropsByFolderAndQuery(PROP_ASSETS, 'props_camera_fan', 'no tripod').length, 5);
  assert.ok(filterPropsByFolderAndQuery(PROP_ASSETS, 'props_lighting', 'led').length >= 4);
  assert.ok(filterPropsByFolderAndQuery(PROP_ASSETS, 'props_all', 'fan').length >= 3);
  assert.ok(filterPropsByFolderAndQuery(PROP_ASSETS, 'props_all', 'animated').length >= 4);
  assert.equal(filterPropsByFolderAndQuery(PROP_ASSETS, 'props_all', 'brake').length, 2);
  assert.equal(filterPropsByFolderAndQuery(PROP_ASSETS, 'props_signs_timing', 'brake').length, 1);
  assert.ok(filterPropsByFolderAndQuery(PROP_ASSETS, 'props_all', 'fuel dispenser').length >= 1);
  assert.ok(filterPropsByFolderAndQuery(PROP_ASSETS, 'props_all', 'fast-charger').length >= 1);

  // Verify explicitly removed props are gone and zero architectural doors/windows
  for (const removed of [
    'ptz_camera',
    'action_cam_rig',
    'camera_jib',
    'brake_board_50',
    'brake_board_150',
    'start_light_post',
    'flag_marshal_stand',
    'jack_stand_pair',
    'air_compressor',
    'overhead_air_boom',
    'generator_unit',
    'telemetry_cart',
    'fire_extinguisher',
    'extinguisher_bottle',
    'fuel_rig_churn',
    'jerry_can',
  ]) {
    assert.equal(isPropModelId(removed), false, `Removed prop ${removed} should not exist`);
  }

  for (const prop of PROP_ASSETS) {
    assert.ok(!/\b(door|doors|window|windows)\b/i.test(`${prop.name} ${prop.description}`), `Architectural filler found in ${prop.id}`);
    assert.ok(isPropModelId(prop.id), `Missing validator entry for ${prop.id}`);
    assert.ok(prop.footprintRadiusM >= 0.2);
  }
  assert.equal(isPropModelId('unknown_prop'), false);
});
