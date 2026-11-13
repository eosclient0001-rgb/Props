import { useMemo, useState } from 'react';
import {
  Box,
  Check,
  ChevronRight,
  Copy,
  Download,
  Folder,
  FolderOpen,
  GripVertical,
  Layers,
  Plus,
  Search,
  Sparkles,
} from 'lucide-react';
import { getFallbackPropSvg, PROP_ASSETS } from '../assets/propCatalog';
import { renderStandaloneIconSvg, UNIFIED_ICON_SET } from '../assets/iconSet';
import type { ContentFolderId, PropModelId, UnifiedIconEntry } from '../types/editor';
import {
  buildCombinedIconSpriteSvg,
  filterIconsByFolderAndQuery,
  filterPropsByFolderAndQuery,
} from '../utils/editorLogic';

interface ContentBrowserProps {
  open: boolean;
  activeFolder: ContentFolderId;
  threeThumbnails: Partial<Record<PropModelId, string>>;
  onSelectFolder: (folder: ContentFolderId) => void;
  onStartConeDrag: (modelId: PropModelId) => void;
  onEndConeDrag: () => void;
  onSpawnConeCenter: (modelId: PropModelId) => void;
}

interface FolderNode {
  id: ContentFolderId;
  label: string;
  count: number;
  group: 'props' | 'icons';
}

const FOLDERS: FolderNode[] = [
  { id: 'props_all', label: 'All Props', count: PROP_ASSETS.length, group: 'props' },
  {
    id: 'props_cones',
    label: 'Cones & Delineators',
    count: PROP_ASSETS.filter((p) => p.category === 'cones').length,
    group: 'props',
  },
  {
    id: 'props_barriers',
    label: 'Barriers & Safety',
    count: PROP_ASSETS.filter((p) => p.category === 'barriers').length,
    group: 'props',
  },
  {
    id: 'props_camera_fan',
    label: 'Cameras & Fans',
    count: PROP_ASSETS.filter((p) => p.category === 'camera_fan').length,
    group: 'props',
  },
  {
    id: 'props_lighting',
    label: 'Lighting & Stage',
    count: PROP_ASSETS.filter((p) => p.category === 'lighting').length,
    group: 'props',
  },
  {
    id: 'props_signs_timing',
    label: 'Signs & Timing',
    count: PROP_ASSETS.filter((p) => p.category === 'signs_timing').length,
    group: 'props',
  },
  {
    id: 'props_pit_garage',
    label: 'Pit & Garage',
    count: PROP_ASSETS.filter((p) => p.category === 'pit_garage').length,
    group: 'props',
  },
  {
    id: 'props_safety_cargo',
    label: 'Safety & Cargo',
    count: PROP_ASSETS.filter((p) => p.category === 'safety_cargo').length,
    group: 'props',
  },
  { id: 'icons_all', label: 'All Icons', count: UNIFIED_ICON_SET.length, group: 'icons' },
  {
    id: 'icons_physics',
    label: 'Physics & Forces',
    count: UNIFIED_ICON_SET.filter((i) => i.category === 'physics').length,
    group: 'icons',
  },
  {
    id: 'icons_diagnostics',
    label: 'Diagnostics & Gauges',
    count: UNIFIED_ICON_SET.filter((i) => i.category === 'diagnostics').length,
    group: 'icons',
  },
  {
    id: 'icons_uv',
    label: 'UV & Mesh',
    count: UNIFIED_ICON_SET.filter((i) => i.category === 'uv').length,
    group: 'icons',
  },
];

function isPropFolder(folder: ContentFolderId): boolean {
  return folder.startsWith('props_');
}

export function ContentBrowser({
  open,
  activeFolder,
  threeThumbnails,
  onSelectFolder,
  onStartConeDrag,
  onEndConeDrag,
  onSpawnConeCenter,
}: ContentBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const viewingProps = isPropFolder(activeFolder);

  const combinedSpriteSvg = useMemo(
    () => buildCombinedIconSpriteSvg(UNIFIED_ICON_SET),
    [],
  );

  const visibleIcons = useMemo(() => {
    if (viewingProps) return [];
    return filterIconsByFolderAndQuery(UNIFIED_ICON_SET, activeFolder, searchQuery);
  }, [viewingProps, activeFolder, searchQuery]);

  const visibleProps = useMemo(() => {
    if (!viewingProps) return [];
    return filterPropsByFolderAndQuery(PROP_ASSETS, activeFolder, searchQuery);
  }, [viewingProps, activeFolder, searchQuery]);

  const currentFolderMeta = FOLDERS.find((f) => f.id === activeFolder) ?? FOLDERS[0];

  const triggerCopiedFeedback = (key: string) => {
    setCopiedId(key);
    window.setTimeout(() => {
      setCopiedId((prev) => (prev === key ? null : prev));
    }, 1600);
  };

  const handleCopyIcon = async (icon: UnifiedIconEntry) => {
    const svgText = renderStandaloneIconSvg(icon);
    try {
      await navigator.clipboard.writeText(svgText);
    } catch {
      // Ignore clipboard restrictions
    }
    triggerCopiedFeedback(icon.id);
  };

  const handleCopyCombinedSprite = async () => {
    try {
      await navigator.clipboard.writeText(combinedSpriteSvg);
    } catch {
      // Ignore clipboard restrictions
    }
    triggerCopiedFeedback('__sprite__');
  };

  const handleDownloadCombinedSprite = () => {
    const blob = new Blob([combinedSpriteSvg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'apextrack-unified-37-icons.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    triggerCopiedFeedback('__download__');
  };

  return (
    <>
      {open && (
        <section
          data-testid="content-browser"
          aria-label="Content Browser"
          className="h-[286px] shrink-0 flex bg-[#12161f] border-t border-slate-800 z-20"
        >
          {/* Left Folder Tree */}
          <aside className="w-56 shrink-0 flex flex-col border-r border-slate-800 bg-[#0e1219] p-2 overflow-y-auto editor-scroll">
            <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Content / Props
            </div>
            <div className="space-y-0.5 mb-3">
              {FOLDERS.filter((f) => f.group === 'props').map((folder) => {
                const active = folder.id === activeFolder;
                return (
                  <button
                    key={folder.id}
                    type="button"
                    onClick={() => onSelectFolder(folder.id)}
                    className={`w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded text-xs transition-colors ${
                      active
                        ? 'bg-sky-500/15 text-sky-300 font-semibold'
                        : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2 min-w-0">
                      {active ? (
                        <FolderOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      ) : (
                        <Folder className="w-3.5 h-3.5 text-amber-500/80 shrink-0" />
                      )}
                      <span className="truncate">{folder.label}</span>
                    </span>
                    <span className="font-mono tabular-nums text-[11px] text-slate-400">
                      {folder.count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Content / IconSet_Unified
            </div>
            <div className="space-y-0.5">
              {FOLDERS.filter((f) => f.group === 'icons').map((folder) => {
                const active = folder.id === activeFolder;
                return (
                  <button
                    key={folder.id}
                    type="button"
                    onClick={() => onSelectFolder(folder.id)}
                    className={`w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded text-xs transition-colors ${
                      active
                        ? 'bg-sky-500/15 text-sky-300 font-semibold'
                        : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2 min-w-0">
                      {active ? (
                        <FolderOpen className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      ) : (
                        <Folder className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      )}
                      <span className="truncate">{folder.label}</span>
                    </span>
                    <span className="font-mono tabular-nums text-[11px] text-slate-400">
                      {folder.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Right Asset Browser Area */}
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="h-10 shrink-0 px-3 flex items-center justify-between gap-3 border-b border-slate-800 bg-[#151a24]">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 min-w-0">
                <Layers className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="whitespace-nowrap">Content</span>
                <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                <span className="whitespace-nowrap">
                  {currentFolderMeta.group === 'props' ? 'Props' : 'IconSet_Unified'}
                </span>
                <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                <span className="font-semibold text-slate-200 truncate">
                  {currentFolderMeta.label}
                </span>
                <span className="font-mono tabular-nums text-[11px] text-slate-500 ml-1">
                  ({viewingProps ? visibleProps.length : visibleIcons.length})
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="relative w-64">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      viewingProps
                        ? `Search ${PROP_ASSETS.length} props (camera, light, fan...)`
                        : 'Search 37 icons...'
                    }
                    aria-label="Filter content browser assets"
                    className="w-full pl-8 pr-2.5 py-1 rounded text-xs bg-[#0b0e14] border border-slate-700/80 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
                  />
                </div>

                {!viewingProps && (
                  <>
                    <button
                      type="button"
                      onClick={handleCopyCombinedSprite}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 whitespace-nowrap transition-colors"
                    >
                      {copiedId === '__sprite__' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copiedId === '__sprite__' ? 'Copied Sprite' : 'Copy SVG Sprite'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDownloadCombinedSprite}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 whitespace-nowrap transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>
                        {copiedId === '__download__' ? 'Exported' : 'Export 37-Icon Set (.svg)'}
                      </span>
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto p-3 editor-scroll">
              {viewingProps ? (
                visibleProps.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 text-xs gap-1.5">
                    <Box className="w-4 h-4 text-slate-500" />
                    <span>No Engine props matched &ldquo;{searchQuery}&rdquo;</span>
                  </div>
                ) : (
                  <div
                    data-testid="prop-asset-grid"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5"
                  >
                    {visibleProps.map((prop) => {
                      const thumbSrc = threeThumbnails[prop.id];
                      return (
                        <div
                          key={prop.id}
                          data-testid={`cone-asset-${prop.id}`}
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData('application/x-apextrack-cone', prop.id);
                            e.dataTransfer.setData('text/plain', prop.id);
                            e.dataTransfer.effectAllowed = 'copy';
                            onStartConeDrag(prop.id);
                          }}
                          onDragEnd={onEndConeDrag}
                          onDoubleClick={() => onSpawnConeCenter(prop.id)}
                          title={prop.description}
                          className="group relative flex items-center gap-2.5 p-2.5 rounded-md bg-[#181e29] border border-slate-800 hover:border-sky-500/60 cursor-grab active:cursor-grabbing transition-colors"
                        >
                          <div
                            className="w-1 h-full absolute left-0 top-0 bottom-0 rounded-l-md"
                            style={{ backgroundColor: prop.accentHex }}
                          />
                          <div className="w-[72px] h-[72px] shrink-0 rounded bg-gradient-to-b from-[#1f2939] to-[#111722] border border-slate-700/70 flex items-center justify-center p-1 pointer-events-none overflow-hidden">
                            {thumbSrc ? (
                              <img
                                src={thumbSrc}
                                alt={prop.name}
                                className="w-full h-full object-contain"
                                draggable={false}
                              />
                            ) : (
                              <div
                                className="w-full h-full"
                                dangerouslySetInnerHTML={{ __html: getFallbackPropSvg(prop) }}
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col justify-between gap-1.5">
                            <div>
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-[10px] font-mono text-slate-400 truncate">
                                  {prop.assetCode}
                                </span>
                                <div className="flex items-center gap-1 shrink-0">
                                  {prop.animated && (
                                    <span className="text-[9px] font-mono font-semibold uppercase text-emerald-400">
                                      SPIN
                                    </span>
                                  )}
                                  <GripVertical className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400" />
                                </div>
                              </div>
                              <div className="text-xs font-semibold text-slate-100 truncate">
                                {prop.name}
                              </div>
                              <div className="text-[11px] text-slate-400 truncate">
                                {prop.specLabel}
                              </div>
                            </div>
                            <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/80">
                              <span className="inline-flex items-center gap-1 text-[11px] text-sky-300/90 whitespace-nowrap">
                                <Box className="w-3 h-3" />
                                Drag to Track
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onSpawnConeCenter(prop.id);
                                }}
                                aria-label={`Add ${prop.name} to scene`}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 hover:bg-sky-500/25 hover:text-sky-200 text-slate-200 border border-slate-700 whitespace-nowrap transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                                <span>Add</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              ) : visibleIcons.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-xs gap-1.5">
                  <Sparkles className="w-4 h-4 text-slate-500" />
                  <span>No icons matched &ldquo;{searchQuery}&rdquo;</span>
                </div>
              ) : (
                <div
                  data-testid="icon-asset-grid"
                  className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 xl:grid-cols-10 gap-2.5"
                >
                  {visibleIcons.map((icon) => {
                    const isCopied = copiedId === icon.id;
                    return (
                      <button
                        key={icon.id}
                        type="button"
                        data-testid={`icon-tile-${icon.id}`}
                        onClick={() => handleCopyIcon(icon)}
                        title={`${icon.name} (${icon.styleVariant}) · Click to copy 128×128 SVG`}
                        className="group flex flex-col items-center p-2 rounded-md bg-[#181e29] border border-slate-800 hover:border-sky-500/60 hover:bg-[#1c2330] text-left transition-colors"
                      >
                        <div className="w-14 h-14 rounded bg-[#0c1017] border border-slate-800/80 flex items-center justify-center p-1.5 mb-1.5 relative">
                          <svg
                            viewBox="0 0 128 128"
                            className="w-full h-full"
                            aria-hidden="true"
                            dangerouslySetInnerHTML={{
                              __html: `<defs>${icon.defsMarkup}</defs>${icon.bodyMarkup}`,
                            }}
                          />
                          {isCopied && (
                            <span className="absolute inset-0 rounded bg-emerald-950/90 flex items-center justify-center text-[10px] font-semibold text-emerald-300">
                              Copied
                            </span>
                          )}
                        </div>
                        <span className="w-full text-[11px] font-medium text-slate-200 truncate text-center">
                          {icon.name}
                        </span>
                        <span className="w-full text-[10px] text-slate-500 truncate text-center">
                          {icon.styleVariant}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
