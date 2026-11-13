import type {
  ContentFolderId,
  PlacedActor,
  PropAssetDefinition,
  PropModelId,
  UnifiedIconEntry,
} from '../types/editor';

export const TRACK_HALF_EXTENT = 22;

const BASE_LABELS: Record<PropModelId, string> = {
  // Cones & Delineators (7)
  apex_cone: 'FIA_Apex_Cone',
  slalom_cone: 'Slalom_Gate_Cone',
  bollard_cone: 'Chicane_Bollard',
  cone_stack: 'Cone_Caddy_Stack',
  foldable_cone: 'LED_Safety_Cone',
  lane_divider: 'Spring_Lane_Paddle',
  slalom_gate_pole: 'Slalom_Gate_Flag',
  // Barriers & Track Safety (10)
  tire_stack: 'FIA_Tire_Stack',
  jersey_barrier: 'Chicane_Barrier',
  tecpro_block: 'Tecpro_Impact_Block',
  armco_section: 'Armco_Rail_Section',
  rumble_curb: 'Apex_Rumble_Kerb',
  speed_bump: 'Cable_Bridge_Ramp',
  crowd_barricade: 'Paddock_Barricade',
  catch_post: 'Catch_Fence_Post',
  sand_barrel: 'Crash_Sand_Barrel',
  safer_barrier_module: 'SAFER_Barrier_Wall',
  // Cameras, Fans & Broadcast (11)
  cinema_camera: 'Cinema_Camera_Rig',
  gimbal_camera: 'Gimbal_Camera_Rig',
  dolly_track_camera: 'Dolly_Track_Camera',
  eng_camera_case: 'ENG_Camera_Deck',
  highspeed_phantom_cam: 'Phantom_HiHat_Cam',
  low_hat_chase_cam: 'Isolator_Chase_Cam',
  broadcast_monitor_village: 'Director_Video_Village',
  wind_fan: 'Brake_Cooling_Fan',
  aero_blower: 'Aero_Turbine_Fan',
  vent_extractor: 'Exhaust_Blower_Fan',
  parabolic_mic: 'Parabolic_Mic_Rig',
  // Lighting & Stage (9)
  floodlight_tower: 'Stadium_Floodlight_Rig',
  led_panel_stand: 'BiColor_LED_Panel',
  softbox_cinema_light: 'Octagon_Softbox_Light',
  sky_panel_truss_bar: 'SkyPanel_Truss_Rig',
  overhead_balloon_light: 'Balloon_Light_Tower',
  pit_worklight_tripod: 'Paddock_Worklight',
  track_beacon_gantry: 'Marshal_LED_Panel',
  portable_battery_worklight: 'Cordless_COB_Flood',
  cine_tube_stand: 'Pixel_Tube_Bank',
  // Signs, Signals & Timing (10)
  timing_gate: 'Laser_Timing_Gate',
  pit_board: 'Brake_Distance_Board',
  speed_radar_sign: 'Radar_Speed_Sign',
  weather_station: 'Anemometer_Mast',
  aframe_pit_sign: 'Pit_Limit_60_Sign',
  lap_tower_display: 'Timing_Leaderboard_Totem',
  pit_lollipop_stand: 'Pit_Lollipop_Stand',
  grid_slot_marker: 'Grid_Slot_01_Marker',
  pit_exit_signal_light: 'Pit_Exit_Signal',
  drs_zone_sign: 'DRS_Zone_Sign',
  // Pit-Lane, Energy & Garage Equipment (14)
  fuel_station_pump: 'Racing_Fuel_Station',
  ev_charger_station: 'EV_Fast_Charger',
  wheel_rack: 'Pit_Wheel_Cart',
  race_tire_single: 'Centerlock_Slick',
  pit_toolbox: 'Mechanic_Tool_Chest',
  quick_jack: 'Racing_Floor_Jack',
  pit_canopy_weight: 'Iron_Ballast_Weight',
  mechanic_workbench: 'Pit_Mechanic_Bench',
  tire_balancing_rig: 'Wheel_Balancer_Rig',
  engine_hoist_crane: 'Engine_Hoist_Crane',
  carbon_pit_trolley: 'Carbon_Pit_Trolley',
  corner_weight_pad: 'Corner_Weight_Scale',
  tire_warmer_rack: 'Tire_Warmer_Cart',
  diag_laptop_stand: 'ECU_Diag_Stand',
  // Safety & Cargo (7)
  oil_drum: 'Race_Fuel_Drum_200L',
  flight_case: 'Equipment_Flight_Case',
  cargo_pallet: 'Pit_Cargo_Pallet',
  spill_kit_bin: 'Oil_Spill_Cart',
  first_aid_case: 'Track_Trauma_Trunk',
  cable_reel_drum: 'Power_Cable_Reel',
  hv_safety_locker: 'HV_Safety_Locker',
};

const VALID_PROP_IDS = new Set<string>(Object.keys(BASE_LABELS));

export function isPropModelId(value: string): value is PropModelId {
  return VALID_PROP_IDS.has(value);
}

export function snapValue(value: number, gridSize: number, enabled: boolean): number {
  if (!enabled || gridSize <= 0) return Number(value.toFixed(3));
  return Number((Math.round(value / gridSize) * gridSize).toFixed(3));
}

export function clampTrackCoord(value: number, halfExtent = TRACK_HALF_EXTENT): number {
  return Math.max(-halfExtent, Math.min(halfExtent, value));
}

export function snapWorldPosition(
  x: number,
  z: number,
  gridSize: number,
  snapEnabled: boolean,
  halfExtent = TRACK_HALF_EXTENT,
): [number, number, number] {
  const sx = snapValue(clampTrackCoord(x, halfExtent), gridSize, snapEnabled);
  const sz = snapValue(clampTrackCoord(z, halfExtent), gridSize, snapEnabled);
  return [sx, 0, sz];
}

export function nextActorName(modelId: PropModelId, existingActors: PlacedActor[]): string {
  const prefix = BASE_LABELS[modelId];
  const existingSet = new Set(existingActors.map((a) => a.name));
  let index = 1;
  while (index < 1000) {
    const candidate = `${prefix}_${String(index).padStart(2, '0')}`;
    if (!existingSet.has(candidate)) {
      return candidate;
    }
    index += 1;
  }
  return `${prefix}_${Date.now()}`;
}

export function filterPropsByFolderAndQuery(
  props: PropAssetDefinition[],
  folder: ContentFolderId,
  query: string,
): PropAssetDefinition[] {
  const q = query.trim().toLowerCase();
  return props.filter((prop) => {
    if (folder === 'props_cones' && prop.category !== 'cones') return false;
    if (folder === 'props_barriers' && prop.category !== 'barriers') return false;
    if (folder === 'props_camera_fan' && prop.category !== 'camera_fan') return false;
    if (folder === 'props_lighting' && prop.category !== 'lighting') return false;
    if (folder === 'props_signs_timing' && prop.category !== 'signs_timing') return false;
    if (folder === 'props_pit_garage' && prop.category !== 'pit_garage') return false;
    if (folder === 'props_safety_cargo' && prop.category !== 'safety_cargo') return false;

    if (!q) return true;
    return (
      prop.name.toLowerCase().includes(q) ||
      prop.assetCode.toLowerCase().includes(q) ||
      prop.specLabel.toLowerCase().includes(q) ||
      prop.description.toLowerCase().includes(q) ||
      (prop.animated && 'animated'.includes(q))
    );
  });
}

export function filterIconsByFolderAndQuery(
  icons: UnifiedIconEntry[],
  folder: ContentFolderId,
  query: string,
): UnifiedIconEntry[] {
  const normalizedQuery = query.trim().toLowerCase();
  return icons.filter((icon) => {
    if (folder === 'icons_physics' && icon.category !== 'physics') return false;
    if (folder === 'icons_diagnostics' && icon.category !== 'diagnostics') return false;
    if (folder === 'icons_uv' && icon.category !== 'uv') return false;

    if (!normalizedQuery) return true;
    return (
      icon.name.toLowerCase().includes(normalizedQuery) ||
      icon.id.toLowerCase().includes(normalizedQuery) ||
      icon.styleVariant.toLowerCase().includes(normalizedQuery) ||
      icon.category.toLowerCase().includes(normalizedQuery)
    );
  });
}

export function buildCombinedIconSpriteSvg(icons: UnifiedIconEntry[]): string {
  const defs = icons.map((icon) => `    <!-- ${icon.id} -->\n${icon.defsMarkup.trim()}`).join('\n');
  const symbols = icons
    .map(
      (icon) =>
        `  <symbol id="icon-${icon.id}" viewBox="0 0 128 128">\n    ${icon.bodyMarkup.trim()}\n  </symbol>`,
    )
    .join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position: absolute; width: 0; height: 0; overflow: hidden;" aria-hidden="true">
  <defs>
${defs}
  </defs>
${symbols}
</svg>`;
}
