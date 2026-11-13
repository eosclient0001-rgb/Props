import {
  Camera,
  Fan,
  FolderOpen,
  Grid3X3,
  Magnet,
  Maximize2,
  Move,
  Pause,
  RotateCw,
  Trash2,
} from 'lucide-react';
import { PROP_ASSETS } from '../assets/propCatalog';
import type { TransformMode } from '../types/editor';

interface TopToolbarProps {
  transformMode: TransformMode;
  snapEnabled: boolean;
  gridSize: number;
  actorCount: number;
  drawerOpen: boolean;
  animationsPlaying: boolean;
  onChangeMode: (mode: TransformMode) => void;
  onToggleSnap: () => void;
  onToggleAnimations: () => void;
  onResetCamera: () => void;
  onClearScene: () => void;
  onToggleDrawer: () => void;
}

export function TopToolbar({
  transformMode,
  snapEnabled,
  gridSize,
  actorCount,
  drawerOpen,
  animationsPlaying,
  onChangeMode,
  onToggleSnap,
  onToggleAnimations,
  onResetCamera,
  onClearScene,
  onToggleDrawer,
}: TopToolbarProps) {
  const modeBtnClass = (active: boolean) =>
    `inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-colors ${
      active
        ? 'bg-sky-500/20 text-sky-300 border border-sky-400/50'
        : 'text-slate-300 hover:text-white hover:bg-slate-800 border border-transparent'
    }`;

  return (
    <header className="h-12 shrink-0 px-3 flex items-center justify-between gap-3 bg-[#141923] border-b border-slate-800 z-20">
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded bg-orange-500/15 border border-orange-500/40 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
              <path d="M12 3L16.5 18H7.5L12 3Z" fill="#F97316" />
              <path d="M9.6 11H14.4L15.1 13.4H8.9L9.6 11Z" fill="#F8FAFC" />
              <rect x="5" y="18" width="14" height="2.6" rx="0.8" fill="#475569" />
            </svg>
          </div>
          <span className="text-sm font-semibold tracking-tight text-slate-100 whitespace-nowrap">
            ApexTrack Studio
          </span>
        </div>
        <span className="hidden sm:inline-block h-4 w-px bg-slate-800" />
        <span className="hidden md:inline-block text-xs text-slate-400 whitespace-nowrap">
          Proving Ground Kit · {PROP_ASSETS.length} Props
        </span>
      </div>

      <div className="flex items-center gap-1 bg-[#0e1219] px-1.5 py-1 rounded border border-slate-800">
        <button
          type="button"
          onClick={() => onChangeMode('translate')}
          title="Move (W)"
          aria-pressed={transformMode === 'translate'}
          className={modeBtnClass(transformMode === 'translate')}
        >
          <Move className="w-3.5 h-3.5" />
          <span>Move</span>
        </button>
        <button
          type="button"
          onClick={() => onChangeMode('rotate')}
          title="Rotate (E)"
          aria-pressed={transformMode === 'rotate'}
          className={modeBtnClass(transformMode === 'rotate')}
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>Rotate</span>
        </button>
        <button
          type="button"
          onClick={() => onChangeMode('scale')}
          title="Scale (R)"
          aria-pressed={transformMode === 'scale'}
          className={modeBtnClass(transformMode === 'scale')}
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Scale</span>
        </button>

        <span className="mx-1 h-4 w-px bg-slate-800" />

        <button
          type="button"
          onClick={onToggleSnap}
          title="Toggle Grid Snapping"
          aria-pressed={snapEnabled}
          className={modeBtnClass(snapEnabled)}
        >
          {snapEnabled ? (
            <Magnet className="w-3.5 h-3.5 text-amber-400" />
          ) : (
            <Grid3X3 className="w-3.5 h-3.5" />
          )}
          <span className="font-mono tabular-nums">
            {snapEnabled ? `${gridSize}m` : 'Free'}
          </span>
        </button>

        <button
          type="button"
          onClick={onToggleAnimations}
          title="Toggle Animated Fans & Beacons"
          aria-pressed={animationsPlaying}
          className={modeBtnClass(animationsPlaying)}
        >
          {animationsPlaying ? (
            <Fan className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Pause className="w-3.5 h-3.5 text-slate-400" />
          )}
          <span className="hidden lg:inline">{animationsPlaying ? 'Fans On' : 'Paused'}</span>
        </button>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 font-mono tabular-nums px-2 py-1 rounded bg-[#0e1219] border border-slate-800 whitespace-nowrap">
          Props: <strong className="text-slate-100 font-semibold">{actorCount}</strong>
        </span>

        <button
          type="button"
          onClick={onResetCamera}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/70 whitespace-nowrap transition-colors"
        >
          <Camera className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset Cam</span>
        </button>

        <button
          type="button"
          onClick={onClearScene}
          disabled={actorCount === 0}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium text-slate-300 hover:text-rose-300 hover:bg-rose-950/40 border border-slate-700/70 disabled:opacity-40 disabled:pointer-events-none whitespace-nowrap transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Clear</span>
        </button>

        <button
          type="button"
          onClick={onToggleDrawer}
          aria-expanded={drawerOpen}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition-colors border ${
            drawerOpen
              ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
              : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
          }`}
        >
          <FolderOpen className="w-3.5 h-3.5" />
          <span>Content Browser</span>
        </button>
      </div>
    </header>
  );
}
