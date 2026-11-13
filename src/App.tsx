import { useCallback, useEffect, useMemo, useState } from 'react';
import { PROP_ASSETS } from './assets/propCatalog';
import { ContentBrowser } from './components/ContentBrowser';
import { OutlinerInspectorBar } from './components/OutlinerInspectorBar';
import { TopToolbar } from './components/TopToolbar';
import { Viewport3D } from './components/Viewport3D';
import { generatePropThumbnailsAsync } from './three/coneModels';
import type {
  ActiveDragPayload,
  ContentFolderId,
  PlacedActor,
  PropModelId,
  TransformMode,
} from './types/editor';
import { nextActorName, snapWorldPosition } from './utils/editorLogic';

const INITIAL_ACTORS: PlacedActor[] = [
  {
    uid: 'actor-seed-cam',
    modelId: 'cinema_camera',
    name: 'Cinema_Camera_Rig_01',
    position: [-5.0, 0, 1.5],
    rotationY: 0.68,
    scale: 1,
  },
  {
    uid: 'actor-seed-gimbal',
    modelId: 'gimbal_camera',
    name: 'Gimbal_Camera_Rig_01',
    position: [-2.5, 0, 2.0],
    rotationY: 0.42,
    scale: 1,
  },
  {
    uid: 'actor-seed-phantom',
    modelId: 'highspeed_phantom_cam',
    name: 'Phantom_HiHat_Cam_01',
    position: [0.0, 0, 2.2],
    rotationY: 0.12,
    scale: 1,
  },
  {
    uid: 'actor-seed-lowhat',
    modelId: 'low_hat_chase_cam',
    name: 'Isolator_Chase_Cam_01',
    position: [-0.8, 0, -0.5],
    rotationY: 0.3,
    scale: 1,
  },
  {
    uid: 'actor-seed-led',
    modelId: 'led_panel_stand',
    name: 'BiColor_LED_Panel_01',
    position: [-4.5, 0, -1.8],
    rotationY: 0.72,
    scale: 1,
  },
  {
    uid: 'actor-seed-softbox',
    modelId: 'softbox_cinema_light',
    name: 'Octagon_Softbox_Light_01',
    position: [2.5, 0, -1.8],
    rotationY: -0.68,
    scale: 1,
  },
  {
    uid: 'actor-seed-balloon',
    modelId: 'overhead_balloon_light',
    name: 'Balloon_Light_Tower_01',
    position: [4.8, 0, 2.0],
    rotationY: -0.4,
    scale: 1,
  },
  {
    uid: 'actor-seed-fan',
    modelId: 'wind_fan',
    name: 'Brake_Cooling_Fan_01',
    position: [2.4, 0, 1.8],
    rotationY: -0.5,
    scale: 1,
  },
  {
    uid: 'actor-seed-fuel',
    modelId: 'fuel_station_pump',
    name: 'Racing_Fuel_Station_01',
    position: [-5.5, 0, -4.5],
    rotationY: 0.35,
    scale: 1,
  },
  {
    uid: 'actor-seed-ev',
    modelId: 'ev_charger_station',
    name: 'EV_Fast_Charger_01',
    position: [-2.5, 0, -4.5],
    rotationY: 0.2,
    scale: 1,
  },
  {
    uid: 'actor-seed-light',
    modelId: 'floodlight_tower',
    name: 'Stadium_Floodlight_Rig_01',
    position: [5.5, 0, -3.5],
    rotationY: -0.65,
    scale: 1,
  },
  {
    uid: 'actor-seed-1',
    modelId: 'apex_cone',
    name: 'FIA_Apex_Cone_01',
    position: [0.5, 0, -3.2],
    rotationY: 0,
    scale: 1,
  },
];

export default function App() {
  const [actors, setActors] = useState<PlacedActor[]>(INITIAL_ACTORS);
  const [selectedUid, setSelectedUid] = useState<string | null>(INITIAL_ACTORS[0].uid);
  const [transformMode, setTransformMode] = useState<TransformMode>('translate');
  const [snapEnabled, setSnapEnabled] = useState(true);
  const [animationsPlaying, setAnimationsPlaying] = useState(true);
  const gridSize = 0.5;
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [activeFolder, setActiveFolder] = useState<ContentFolderId>('props_all');
  const [cameraResetToken, setCameraResetToken] = useState(0);
  const [activeDrag, setActiveDrag] = useState<ActiveDragPayload | null>(null);
  const [ghostCoords, setGhostCoords] = useState<[number, number, number] | null>(null);
  const [threeThumbnails, setThreeThumbnails] = useState<Partial<Record<PropModelId, string>>>({});

  // Render real 3D studio thumbnails for all 68 Engine props in non-blocking batches
  useEffect(() => {
    const cancel = generatePropThumbnailsAsync((batch) => {
      setThreeThumbnails(batch);
    });
    return cancel;
  }, []);

  const selectedActor = useMemo(
    () => actors.find((a) => a.uid === selectedUid) ?? null,
    [actors, selectedUid],
  );

  const activeDragModelName = useMemo(() => {
    if (!activeDrag) return null;
    return PROP_ASSETS.find((a) => a.id === activeDrag.modelId)?.name ?? null;
  }, [activeDrag]);

  const handleUpdateActorTransform = useCallback(
    (
      uid: string,
      position: [number, number, number],
      rotationY: number,
      scale: number,
    ) => {
      setActors((prev) =>
        prev.map((actor) =>
          actor.uid === uid ? { ...actor, position, rotationY, scale } : actor,
        ),
      );
    },
    [],
  );

  const handleDropNewCone = useCallback(
    (modelId: PropModelId, rawPosition: [number, number, number]) => {
      const snapped = snapWorldPosition(
        rawPosition[0],
        rawPosition[2],
        gridSize,
        snapEnabled,
      );
      const newUid = `actor-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setActors((prev) => {
        const nextName = nextActorName(modelId, prev);
        return [
          ...prev,
          {
            uid: newUid,
            modelId,
            name: nextName,
            position: snapped,
            rotationY: 0,
            scale: 1,
          },
        ];
      });
      setSelectedUid(newUid);
      setActiveDrag(null);
      setGhostCoords(null);
    },
    [gridSize, snapEnabled],
  );

  const handleSpawnConeCenter = useCallback(
    (modelId: PropModelId) => {
      setActors((prev) => {
        let chosen: [number, number, number] = [0, 0, 2];
        let found = false;
        for (let row = 0; row < 6 && !found; row++) {
          for (let col = -3; col <= 3 && !found; col++) {
            const cx = col * 2.1;
            const cz = 1.6 + row * 2.1;
            const occupied = prev.some(
              (a) => Math.hypot(a.position[0] - cx, a.position[2] - cz) < 1.75,
            );
            if (!occupied) {
              chosen = snapWorldPosition(cx, cz, gridSize, snapEnabled);
              found = true;
            }
          }
        }
        if (!found) {
          const count = prev.length;
          chosen = snapWorldPosition(
            ((count % 6) - 2.5) * 1.8,
            2 + Math.floor(count / 6) * 1.8,
            gridSize,
            snapEnabled,
          );
        }
        const newUid = `actor-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        const nextName = nextActorName(modelId, prev);
        setSelectedUid(newUid);
        return [
          ...prev,
          {
            uid: newUid,
            modelId,
            name: nextName,
            position: chosen,
            rotationY: 0,
            scale: 1,
          },
        ];
      });
    },
    [gridSize, snapEnabled],
  );

  const handleDeleteActor = useCallback((uid: string) => {
    setActors((prev) => prev.filter((a) => a.uid !== uid));
    setSelectedUid((prevSel) => (prevSel === uid ? null : prevSel));
  }, []);

  const handleRotate90 = useCallback((uid: string) => {
    setActors((prev) =>
      prev.map((a) =>
        a.uid === uid ? { ...a, rotationY: a.rotationY + Math.PI / 2 } : a,
      ),
    );
  }, []);

  const handleDuplicateActor = useCallback(
    (uid: string) => {
      setActors((prev) => {
        const source = prev.find((a) => a.uid === uid);
        if (!source) return prev;
        const snapped = snapWorldPosition(
          source.position[0] + 0.5,
          source.position[2] + 0.5,
          gridSize,
          snapEnabled,
        );
        const newUid = `actor-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        const nextName = nextActorName(source.modelId, prev);
        setSelectedUid(newUid);
        return [
          ...prev,
          {
            ...source,
            uid: newUid,
            name: nextName,
            position: snapped,
          },
        ];
      });
    },
    [gridSize, snapEnabled],
  );

  const handleClearScene = useCallback(() => {
    setActors([]);
    setSelectedUid(null);
  }, []);

  const handleStartConeDrag = useCallback((modelId: PropModelId) => {
    setActiveDrag({
      kind: 'prop',
      modelId,
      pointerX: 0,
      pointerY: 0,
      isOverViewport: false,
    });
  }, []);

  const handleEndConeDrag = useCallback(() => {
    setActiveDrag(null);
    setGhostCoords(null);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === 'w' || e.key === 'W') {
        setTransformMode('translate');
      } else if (e.key === 'e' || e.key === 'E') {
        setTransformMode('rotate');
      } else if (e.key === 'r' || e.key === 'R') {
        setTransformMode('scale');
      } else if ((e.key === 'Delete' || e.key === 'Backspace') && selectedUid) {
        e.preventDefault();
        handleDeleteActor(selectedUid);
      } else if (e.key === 'Escape') {
        setSelectedUid(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedUid, handleDeleteActor]);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-[#0e1116] text-slate-100">
      <TopToolbar
        transformMode={transformMode}
        snapEnabled={snapEnabled}
        gridSize={gridSize}
        actorCount={actors.length}
        drawerOpen={drawerOpen}
        animationsPlaying={animationsPlaying}
        onChangeMode={setTransformMode}
        onToggleSnap={() => setSnapEnabled((v) => !v)}
        onToggleAnimations={() => setAnimationsPlaying((v) => !v)}
        onResetCamera={() => setCameraResetToken((n) => n + 1)}
        onClearScene={handleClearScene}
        onToggleDrawer={() => setDrawerOpen((v) => !v)}
      />

      <main className="relative flex-1 min-h-0 flex flex-col">
        <Viewport3D
          actors={actors}
          selectedUid={selectedUid}
          transformMode={transformMode}
          snapEnabled={snapEnabled}
          gridSize={gridSize}
          animationsPlaying={animationsPlaying}
          activeDrag={activeDrag}
          cameraResetToken={cameraResetToken}
          onSelectActor={setSelectedUid}
          onUpdateActorTransform={handleUpdateActorTransform}
          onDropNewCone={handleDropNewCone}
          onGhostCoordsChange={setGhostCoords}
        />

        <OutlinerInspectorBar
          selectedActor={selectedActor}
          ghostCoords={ghostCoords}
          activeDragModelName={activeDragModelName}
          onRotate90={handleRotate90}
          onDuplicate={handleDuplicateActor}
          onDelete={handleDeleteActor}
        />
      </main>

      <ContentBrowser
        open={drawerOpen}
        activeFolder={activeFolder}
        threeThumbnails={threeThumbnails}
        onSelectFolder={setActiveFolder}
        onStartConeDrag={handleStartConeDrag}
        onEndConeDrag={handleEndConeDrag}
        onSpawnConeCenter={handleSpawnConeCenter}
      />
    </div>
  );
}
