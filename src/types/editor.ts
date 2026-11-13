export type PropModelId =
  // Cones & Delineators (7)
  | 'apex_cone'
  | 'slalom_cone'
  | 'bollard_cone'
  | 'cone_stack'
  | 'foldable_cone'
  | 'lane_divider'
  | 'slalom_gate_pole'
  // Barriers & Track Safety (10)
  | 'tire_stack'
  | 'jersey_barrier'
  | 'tecpro_block'
  | 'armco_section'
  | 'rumble_curb'
  | 'speed_bump'
  | 'crowd_barricade'
  | 'catch_post'
  | 'sand_barrel'
  | 'safer_barrier_module'
  // Cameras, Fans & Broadcast (11)
  | 'cinema_camera'
  | 'gimbal_camera'
  | 'dolly_track_camera'
  | 'eng_camera_case'
  | 'highspeed_phantom_cam'
  | 'low_hat_chase_cam'
  | 'broadcast_monitor_village'
  | 'wind_fan'
  | 'aero_blower'
  | 'vent_extractor'
  | 'parabolic_mic'
  // Lighting & Stage (9)
  | 'floodlight_tower'
  | 'led_panel_stand'
  | 'softbox_cinema_light'
  | 'sky_panel_truss_bar'
  | 'overhead_balloon_light'
  | 'pit_worklight_tripod'
  | 'track_beacon_gantry'
  | 'portable_battery_worklight'
  | 'cine_tube_stand'
  // Signs, Signals & Timing (10)
  | 'timing_gate'
  | 'pit_board'
  | 'speed_radar_sign'
  | 'weather_station'
  | 'aframe_pit_sign'
  | 'lap_tower_display'
  | 'pit_lollipop_stand'
  | 'grid_slot_marker'
  | 'pit_exit_signal_light'
  | 'drs_zone_sign'
  // Pit-Lane, Energy & Garage Equipment (14)
  | 'fuel_station_pump'
  | 'ev_charger_station'
  | 'wheel_rack'
  | 'race_tire_single'
  | 'pit_toolbox'
  | 'quick_jack'
  | 'pit_canopy_weight'
  | 'mechanic_workbench'
  | 'tire_balancing_rig'
  | 'engine_hoist_crane'
  | 'carbon_pit_trolley'
  | 'corner_weight_pad'
  | 'tire_warmer_rack'
  | 'diag_laptop_stand'
  // Safety & Cargo (7)
  | 'oil_drum'
  | 'flight_case'
  | 'cargo_pallet'
  | 'spill_kit_bin'
  | 'first_aid_case'
  | 'cable_reel_drum'
  | 'hv_safety_locker';

export type ConeModelId = PropModelId;

export type PropCategory =
  | 'cones'
  | 'barriers'
  | 'camera_fan'
  | 'lighting'
  | 'signs_timing'
  | 'pit_garage'
  | 'safety_cargo';

export type TransformMode = 'translate' | 'rotate' | 'scale';

export type ContentFolderId =
  | 'props_all'
  | 'props_cones'
  | 'props_barriers'
  | 'props_camera_fan'
  | 'props_lighting'
  | 'props_signs_timing'
  | 'props_pit_garage'
  | 'props_safety_cargo'
  | 'icons_all'
  | 'icons_physics'
  | 'icons_diagnostics'
  | 'icons_uv';

export type IconCategory = 'physics' | 'diagnostics' | 'uv';

export interface UnifiedIconEntry {
  id: string;
  name: string;
  category: IconCategory;
  styleVariant: string;
  sourceSize: 64 | 128;
  defsMarkup: string;
  bodyMarkup: string;
  note?: string;
}

export interface PropAssetDefinition {
  id: PropModelId;
  category: PropCategory;
  name: string;
  assetCode: string;
  specLabel: string;
  heightCm: number;
  baseDiameterCm: number;
  footprintRadiusM: number;
  accentHex: string;
  animated?: boolean;
  description: string;
}

export type ConeAssetDefinition = PropAssetDefinition;

export interface PlacedActor {
  uid: string;
  modelId: PropModelId;
  name: string;
  position: [number, number, number];
  rotationY: number;
  scale: number;
}

export interface ActiveDragPayload {
  kind: 'prop';
  modelId: PropModelId;
  pointerX: number;
  pointerY: number;
  isOverViewport: boolean;
}
