import { Copy, RotateCw, Trash2 } from 'lucide-react';
import { PROP_ASSETS } from '../assets/coneThumbnails';
import type { PlacedActor } from '../types/editor';

interface OutlinerInspectorBarProps {
  selectedActor: PlacedActor | null;
  ghostCoords: [number, number, number] | null;
  activeDragModelName: string | null;
  onRotate90: (uid: string) => void;
  onDuplicate: (uid: string) => void;
  onDelete: (uid: string) => void;
}

export function OutlinerInspectorBar({
  selectedActor,
  ghostCoords,
  activeDragModelName,
  onRotate90,
  onDuplicate,
  onDelete,
}: OutlinerInspectorBarProps) {
  if (activeDragModelName) {
    return (
      <div className="pointer-events-none absolute bottom-3 left-3 z-10 flex items-center gap-2.5 px-3 py-2 rounded bg-[#141923] border border-sky-500/50 text-xs shadow-lg">
        <span className="font-semibold text-sky-300 whitespace-nowrap">
          Placing {activeDragModelName}
        </span>
        {ghostCoords ? (
          <span className="font-mono tabular-nums text-slate-300 whitespace-nowrap">
            X {ghostCoords[0].toFixed(2)}m · Z {ghostCoords[2].toFixed(2)}m
          </span>
        ) : (
          <span className="text-slate-400 whitespace-nowrap">Move over track tarmac to snap</span>
        )}
      </div>
    );
  }

  if (!selectedActor) {
    return null;
  }

  const assetDef = PROP_ASSETS.find((a) => a.id === selectedActor.modelId);
  const yawDegrees = Math.round(((selectedActor.rotationY * 180) / Math.PI) % 360);

  return (
    <div
      data-testid="actor-inspector"
      className="absolute bottom-3 left-3 z-10 flex flex-wrap items-center gap-3 px-3 py-2 rounded bg-[#141923] border border-slate-700/90 text-xs shadow-xl"
    >
      <div className="flex items-center gap-2 pr-2 border-r border-slate-800">
        <span
          className="w-2.5 h-2.5 rounded-sm shrink-0"
          style={{ backgroundColor: assetDef?.accentHex ?? '#F97316' }}
        />
        <div className="leading-tight">
          <div className="font-semibold text-slate-100 whitespace-nowrap">
            {selectedActor.name}
          </div>
          <div className="text-[11px] text-slate-400 whitespace-nowrap">
            {assetDef?.specLabel ?? selectedActor.modelId}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 font-mono tabular-nums text-slate-300">
        <span className="whitespace-nowrap">
          <span className="text-slate-500 mr-1">X</span>
          {selectedActor.position[0].toFixed(2)}m
        </span>
        <span className="whitespace-nowrap">
          <span className="text-slate-500 mr-1">Z</span>
          {selectedActor.position[2].toFixed(2)}m
        </span>
        <span className="whitespace-nowrap">
          <span className="text-slate-500 mr-1">YAW</span>
          {yawDegrees}°
        </span>
        <span className="whitespace-nowrap">
          <span className="text-slate-500 mr-1">SCL</span>
          {selectedActor.scale.toFixed(2)}×
        </span>
      </div>

      <div className="flex items-center gap-1 pl-2 border-l border-slate-800">
        <button
          type="button"
          onClick={() => onRotate90(selectedActor.uid)}
          title="Rotate 90 degrees"
          className="inline-flex items-center gap-1 px-2 py-1 rounded text-slate-300 hover:text-white hover:bg-slate-800 whitespace-nowrap transition-colors"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>90°</span>
        </button>
        <button
          type="button"
          onClick={() => onDuplicate(selectedActor.uid)}
          title="Duplicate cone"
          className="inline-flex items-center gap-1 px-2 py-1 rounded text-slate-300 hover:text-white hover:bg-slate-800 whitespace-nowrap transition-colors"
        >
          <Copy className="w-3.5 h-3.5" />
          <span>Duplicate</span>
        </button>
        <button
          type="button"
          onClick={() => onDelete(selectedActor.uid)}
          title="Delete cone (Del)"
          className="inline-flex items-center gap-1 px-2 py-1 rounded text-rose-300 hover:text-rose-200 hover:bg-rose-950/50 whitespace-nowrap transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}
