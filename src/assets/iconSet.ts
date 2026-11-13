import type { UnifiedIconEntry } from '../types/editor';

export const UNIFIED_ICON_SET: UnifiedIconEntry[] = [
  // =========================================================================
  // PHYSICS & FORCES (13)
  // =========================================================================
  {
    id: 'vortex-turbulence-obsidian',
    name: 'Vortex Turbulence',
    category: 'physics',
    styleVariant: 'Obsidian',
    sourceSize: 128,
    defsMarkup: `
      <linearGradient id="vortex-turbulence-obsidian-body" x1="18%" y1="10%" x2="85%" y2="92%">
        <stop offset="0%" stop-color="#64748B" />
        <stop offset="52%" stop-color="#273244" />
        <stop offset="100%" stop-color="#0B101B" />
      </linearGradient>
      <radialGradient id="vortex-turbulence-obsidian-sphere-body" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#64748B" />
        <stop offset="55%" stop-color="#273244" />
        <stop offset="100%" stop-color="#0B101B" />
      </radialGradient>
      <linearGradient id="vortex-turbulence-obsidian-inset" x1="20%" y1="10%" x2="80%" y2="95%">
        <stop offset="0%" stop-color="#060911" />
        <stop offset="55%" stop-color="#182232" />
        <stop offset="100%" stop-color="#334155" />
      </linearGradient>
      <linearGradient id="vortex-turbulence-obsidian-accent" x1="15%" y1="10%" x2="85%" y2="90%">
        <stop offset="0%" stop-color="#34D399" />
        <stop offset="50%" stop-color="#10B981" />
        <stop offset="100%" stop-color="#065F46" />
      </linearGradient>
      <radialGradient id="vortex-turbulence-obsidian-accent-sphere" cx="34%" cy="28%" r="70%">
        <stop offset="0%" stop-color="#A7F3D0" />
        <stop offset="32%" stop-color="#34D399" />
        <stop offset="72%" stop-color="#10B981" />
        <stop offset="100%" stop-color="#065F46" />
      </radialGradient>
      <filter id="vortex-turbulence-obsidian-shadow" x="-22%" y="-22%" width="144%" height="148%">
        <feDropShadow dx="0" dy="5" stdDeviation="4.2" flood-color="#020617" flood-opacity="0.48" />
      </filter>
    `,
    bodyMarkup: `
      <g filter="url(#vortex-turbulence-obsidian-shadow)">
        <path d="M22,36 C22,20 106,20 106,36" fill="none" stroke="url(#vortex-turbulence-obsidian-inset)" stroke-width="10" stroke-linecap="round" />
        <path d="M31,58 C31,45 97,45 97,58" fill="none" stroke="url(#vortex-turbulence-obsidian-inset)" stroke-width="9" stroke-linecap="round" />
        <path d="M40,79 C40,69 88,69 88,79" fill="none" stroke="url(#vortex-turbulence-obsidian-inset)" stroke-width="8" stroke-linecap="round" />
        <path d="M49,98 C49,91 79,91 79,98" fill="none" stroke="url(#vortex-turbulence-obsidian-inset)" stroke-width="7" stroke-linecap="round" />
        <path d="M22,36 C22,52 106,52 106,36" fill="none" stroke="url(#vortex-turbulence-obsidian-body)" stroke-width="11" stroke-linecap="round" />
        <path d="M25,38 C32,48 96,48 103,38" fill="none" stroke="#F1F5F9" stroke-width="1.6" stroke-linecap="round" opacity="0.75" />
        <path d="M31,58 C31,72 97,72 97,58" fill="none" stroke="url(#vortex-turbulence-obsidian-accent)" stroke-width="10" stroke-linecap="round" />
        <path d="M34,60 C41,69 87,69 94,60" fill="none" stroke="#A7F3D0" stroke-width="1.4" stroke-linecap="round" opacity="0.85" />
        <path d="M40,79 C40,91 88,91 88,79" fill="none" stroke="url(#vortex-turbulence-obsidian-body)" stroke-width="9" stroke-linecap="round" />
        <path d="M49,98 C49,107 79,107 79,98" fill="none" stroke="url(#vortex-turbulence-obsidian-accent)" stroke-width="8" stroke-linecap="round" />
        <path d="M101,25 L116,35 L100,44 Z" fill="url(#vortex-turbulence-obsidian-accent)" stroke="#A7F3D0" stroke-width="0.9" />
        <circle cx="64" cy="111" r="6" fill="url(#vortex-turbulence-obsidian-accent-sphere)" />
        <circle cx="24" cy="52" r="5.5" fill="url(#vortex-turbulence-obsidian-sphere-body)" stroke="#475569" stroke-width="0.7" />
      </g>
    `,
  },
  {
    id: 'radial-attractor-ceramic',
    name: 'Radial Attractor',
    category: 'physics',
    styleVariant: 'Ceramic',
    sourceSize: 128,
    defsMarkup: `
      <linearGradient id="radial-attractor-ceramic-body" x1="18%" y1="10%" x2="85%" y2="92%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="52%" stop-color="#E9EEF5" />
        <stop offset="100%" stop-color="#B8C4D4" />
      </linearGradient>
      <linearGradient id="radial-attractor-ceramic-body-rev" x1="85%" y1="12%" x2="15%" y2="88%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="55%" stop-color="#E9EEF5" />
        <stop offset="100%" stop-color="#B8C4D4" />
      </linearGradient>
      <linearGradient id="radial-attractor-ceramic-inset" x1="20%" y1="10%" x2="80%" y2="95%">
        <stop offset="0%" stop-color="#94A3B8" />
        <stop offset="55%" stop-color="#DCE4EE" />
        <stop offset="100%" stop-color="#F8FAFC" />
      </linearGradient>
      <radialGradient id="radial-attractor-ceramic-accent-sphere" cx="34%" cy="28%" r="70%">
        <stop offset="0%" stop-color="#BFDBFE" />
        <stop offset="32%" stop-color="#60A5FA" />
        <stop offset="72%" stop-color="#2563EB" />
        <stop offset="100%" stop-color="#1E3A8A" />
      </radialGradient>
      <linearGradient id="radial-attractor-ceramic-dark-trim" x1="15%" y1="10%" x2="85%" y2="90%">
        <stop offset="0%" stop-color="#475569" />
        <stop offset="48%" stop-color="#1E293B" />
        <stop offset="100%" stop-color="#090D16" />
      </linearGradient>
      <filter id="radial-attractor-ceramic-shadow" x="-22%" y="-22%" width="144%" height="148%">
        <feDropShadow dx="0" dy="5" stdDeviation="4.2" flood-color="#0F172A" flood-opacity="0.22" />
      </filter>
      <filter id="radial-attractor-ceramic-soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2.5" stdDeviation="2.2" flood-color="#0F172A" flood-opacity="0.19" />
      </filter>
    `,
    bodyMarkup: `
      <g filter="url(#radial-attractor-ceramic-shadow)">
        <ellipse cx="64" cy="84" rx="46" ry="22" fill="url(#radial-attractor-ceramic-body-rev)" stroke="#94A3B8" stroke-width="1" />
        <ellipse cx="64" cy="80" rx="45" ry="20.5" fill="url(#radial-attractor-ceramic-body)" />
        <ellipse cx="64" cy="78" rx="35" ry="15" fill="url(#radial-attractor-ceramic-inset)" />
        <ellipse cx="64" cy="76" rx="25" ry="10.5" fill="url(#radial-attractor-ceramic-dark-trim)" opacity="0.88" />
        <path d="M22,76 A45,20.5 0 0,1 106,76" fill="none" stroke="#FFFFFF" stroke-width="1.5" opacity="0.7" />
        <g filter="url(#radial-attractor-ceramic-soft-shadow)">
          <circle cx="64" cy="62" r="18" fill="url(#radial-attractor-ceramic-accent-sphere)" />
          <ellipse cx="58" cy="55" rx="6" ry="3.5" transform="rotate(-30 58 55)" fill="#FFFFFF" opacity="0.7" />
        </g>
        <g filter="url(#radial-attractor-ceramic-soft-shadow)">
          <path d="M64,39 L55,22 L61,22 L61,12 L67,12 L67,22 L73,22 Z" fill="url(#radial-attractor-ceramic-body)" stroke="#94A3B8" stroke-width="0.9" />
          <path d="M41,62 L24,53 L24,59 L14,59 L14,65 L24,65 L24,71 Z" fill="url(#radial-attractor-ceramic-body)" stroke="#94A3B8" stroke-width="0.9" />
          <path d="M87,62 L104,53 L104,59 L114,59 L114,65 L104,65 L104,71 Z" fill="url(#radial-attractor-ceramic-body-rev)" stroke="#94A3B8" stroke-width="0.9" />
          <path d="M64,85 L55,102 L61,102 L61,113 L67,113 L67,102 L73,102 Z" fill="url(#radial-attractor-ceramic-body-rev)" stroke="#94A3B8" stroke-width="0.9" />
        </g>
      </g>
    `,
  },
  {
    id: 'buoyancy-updraft-isometric',
    name: 'Buoyancy Updraft',
    category: 'physics',
    styleVariant: 'Isometric',
    sourceSize: 128,
    defsMarkup: `
      <linearGradient id="buoyancy-updraft-isometric-body" x1="18%" y1="10%" x2="85%" y2="92%">
        <stop offset="0%" stop-color="#F1F5F9" />
        <stop offset="52%" stop-color="#CBD5E1" />
        <stop offset="100%" stop-color="#64748B" />
      </linearGradient>
      <linearGradient id="buoyancy-updraft-isometric-inset" x1="20%" y1="10%" x2="80%" y2="95%">
        <stop offset="0%" stop-color="#334155" />
        <stop offset="55%" stop-color="#94A3B8" />
        <stop offset="100%" stop-color="#E2E8F0" />
      </linearGradient>
      <radialGradient id="buoyancy-updraft-isometric-accent-sphere" cx="34%" cy="28%" r="70%">
        <stop offset="0%" stop-color="#BFDBFE" />
        <stop offset="32%" stop-color="#60A5FA" />
        <stop offset="72%" stop-color="#2563EB" />
        <stop offset="100%" stop-color="#1E3A8A" />
      </radialGradient>
      <linearGradient id="buoyancy-updraft-isometric-glass-plane" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F1F5F9" stop-opacity="0.88" />
        <stop offset="100%" stop-color="#CBD5E1" stop-opacity="0.58" />
      </linearGradient>
      <filter id="buoyancy-updraft-isometric-shadow" x="-22%" y="-22%" width="144%" height="148%">
        <feDropShadow dx="0" dy="5" stdDeviation="4.2" flood-color="#0F172A" flood-opacity="0.2" />
      </filter>
    `,
    bodyMarkup: `
      <g filter="url(#buoyancy-updraft-isometric-shadow)">
        <ellipse cx="64" cy="96" rx="44" ry="15" fill="url(#buoyancy-updraft-isometric-inset)" stroke="#475569" stroke-width="1.3" />
        <ellipse cx="64" cy="82" rx="38" ry="13" fill="url(#buoyancy-updraft-isometric-glass-plane)" stroke="#60A5FA" stroke-width="1.4" />
        <circle cx="64" cy="54" r="18" fill="url(#buoyancy-updraft-isometric-accent-sphere)" stroke="#BFDBFE" stroke-width="1.3" />
        <path d="M30,66 L30,36 L24,36 L33,22 L42,36 L36,36 L36,66 Z" fill="url(#buoyancy-updraft-isometric-body)" stroke="#475569" stroke-width="1" />
        <path d="M92,66 L92,36 L86,36 L95,22 L104,36 L98,36 L98,66 Z" fill="url(#buoyancy-updraft-isometric-body)" stroke="#475569" stroke-width="1" />
      </g>
    `,
  },
  {
    id: 'spline-guide-isometric',
    name: 'Spline Guide',
    category: 'physics',
    styleVariant: 'Isometric',
    sourceSize: 128,
    defsMarkup: `
      <linearGradient id="spline-guide-isometric-body" x1="18%" y1="10%" x2="85%" y2="92%">
        <stop offset="0%" stop-color="#F1F5F9" />
        <stop offset="52%" stop-color="#CBD5E1" />
        <stop offset="100%" stop-color="#64748B" />
      </linearGradient>
      <linearGradient id="spline-guide-isometric-accent" x1="15%" y1="10%" x2="85%" y2="90%">
        <stop offset="0%" stop-color="#FDE047" />
        <stop offset="50%" stop-color="#F59E0B" />
        <stop offset="100%" stop-color="#B45309" />
      </linearGradient>
      <radialGradient id="spline-guide-isometric-accent-sphere" cx="34%" cy="28%" r="70%">
        <stop offset="0%" stop-color="#FEF08A" />
        <stop offset="32%" stop-color="#FDE047" />
        <stop offset="72%" stop-color="#F59E0B" />
        <stop offset="100%" stop-color="#B45309" />
      </radialGradient>
      <linearGradient id="spline-guide-isometric-glass-plane" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F1F5F9" stop-opacity="0.88" />
        <stop offset="100%" stop-color="#CBD5E1" stop-opacity="0.58" />
      </linearGradient>
      <filter id="spline-guide-isometric-shadow" x="-22%" y="-22%" width="144%" height="148%">
        <feDropShadow dx="0" dy="5" stdDeviation="4.2" flood-color="#0F172A" flood-opacity="0.2" />
      </filter>
    `,
    bodyMarkup: `
      <g filter="url(#spline-guide-isometric-shadow)">
        <line x1="22" y1="92" x2="48" y2="28" stroke="#475569" stroke-width="2" stroke-dasharray="4 3" />
        <line x1="106" y1="36" x2="80" y2="100" stroke="#475569" stroke-width="2" stroke-dasharray="4 3" />
        <path d="M22,92 C48,28 80,100 106,36" fill="none" stroke="url(#spline-guide-isometric-accent)" stroke-width="8" stroke-linecap="round" />
        <circle cx="48" cy="28" r="7" fill="url(#spline-guide-isometric-glass-plane)" stroke="#475569" stroke-width="1.6" />
        <circle cx="80" cy="100" r="7" fill="url(#spline-guide-isometric-glass-plane)" stroke="#475569" stroke-width="1.6" />
        <circle cx="22" cy="92" r="8" fill="url(#spline-guide-isometric-body)" stroke="#475569" stroke-width="1.4" />
        <circle cx="106" cy="36" r="8" fill="url(#spline-guide-isometric-body)" stroke="#475569" stroke-width="1.4" />
        <circle cx="64" cy="64" r="10" fill="url(#spline-guide-isometric-accent-sphere)" stroke="#FEF08A" stroke-width="1.3" />
      </g>
    `,
  },
  {
    id: 'spring-tether-isometric',
    name: 'Spring Tether',
    category: 'physics',
    styleVariant: 'Isometric',
    sourceSize: 128,
    defsMarkup: `
      <linearGradient id="spring-tether-isometric-body" x1="18%" y1="10%" x2="85%" y2="92%">
        <stop offset="0%" stop-color="#F1F5F9" />
        <stop offset="52%" stop-color="#CBD5E1" />
        <stop offset="100%" stop-color="#64748B" />
      </linearGradient>
      <linearGradient id="spring-tether-isometric-body-rev" x1="85%" y1="12%" x2="15%" y2="88%">
        <stop offset="0%" stop-color="#F1F5F9" />
        <stop offset="55%" stop-color="#CBD5E1" />
        <stop offset="100%" stop-color="#64748B" />
      </linearGradient>
      <linearGradient id="spring-tether-isometric-accent" x1="15%" y1="10%" x2="85%" y2="90%">
        <stop offset="0%" stop-color="#FB7185" />
        <stop offset="50%" stop-color="#E11D48" />
        <stop offset="100%" stop-color="#881337" />
      </linearGradient>
      <radialGradient id="spring-tether-isometric-accent-sphere" cx="34%" cy="28%" r="70%">
        <stop offset="0%" stop-color="#FECDD3" />
        <stop offset="32%" stop-color="#FB7185" />
        <stop offset="72%" stop-color="#E11D48" />
        <stop offset="100%" stop-color="#881337" />
      </radialGradient>
      <filter id="spring-tether-isometric-shadow" x="-22%" y="-22%" width="144%" height="148%">
        <feDropShadow dx="0" dy="5" stdDeviation="4.2" flood-color="#0F172A" flood-opacity="0.2" />
      </filter>
    `,
    bodyMarkup: `
      <g filter="url(#spring-tether-isometric-shadow)">
        <rect x="28" y="16" width="72" height="12" rx="4" fill="url(#spring-tether-isometric-body)" stroke="#475569" stroke-width="1.4" />
        <rect x="28" y="100" width="72" height="12" rx="4" fill="url(#spring-tether-isometric-body-rev)" stroke="#475569" stroke-width="1.4" />
        <polyline points="64,28 90,40 38,54 90,68 38,82 64,100" fill="none" stroke="url(#spring-tether-isometric-accent)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
        <circle cx="64" cy="22" r="4" fill="url(#spring-tether-isometric-accent-sphere)" />
        <circle cx="64" cy="106" r="4" fill="url(#spring-tether-isometric-accent-sphere)" />
      </g>
    `,
  },
  {
    id: 'particle-trails-obsidian',
    name: 'Particle Trails',
    category: 'physics',
    styleVariant: 'Obsidian',
    sourceSize: 128,
    defsMarkup: `
      <radialGradient id="particle-trails-obsidian-sphere-body" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#64748B" />
        <stop offset="55%" stop-color="#273244" />
        <stop offset="100%" stop-color="#0B101B" />
      </radialGradient>
      <linearGradient id="particle-trails-obsidian-inset" x1="20%" y1="10%" x2="80%" y2="95%">
        <stop offset="0%" stop-color="#060911" />
        <stop offset="55%" stop-color="#182232" />
        <stop offset="100%" stop-color="#334155" />
      </linearGradient>
      <radialGradient id="particle-trails-obsidian-accent-sphere" cx="34%" cy="28%" r="70%">
        <stop offset="0%" stop-color="#BFDBFE" />
        <stop offset="32%" stop-color="#60A5FA" />
        <stop offset="72%" stop-color="#2563EB" />
        <stop offset="100%" stop-color="#1E3A8A" />
      </radialGradient>
      <linearGradient id="particle-trails-obsidian-secondary" x1="15%" y1="10%" x2="85%" y2="90%">
        <stop offset="0%" stop-color="#38BDF8" />
        <stop offset="55%" stop-color="#0284C7" />
        <stop offset="100%" stop-color="#0C4A6E" />
      </linearGradient>
      <filter id="particle-trails-obsidian-shadow" x="-22%" y="-22%" width="144%" height="148%">
        <feDropShadow dx="0" dy="5" stdDeviation="4.2" flood-color="#020617" flood-opacity="0.48" />
      </filter>
    `,
    bodyMarkup: `
      <g filter="url(#particle-trails-obsidian-shadow)">
        <path d="M20,98 C38,94 54,74 72,54 C84,40 94,34 102,30" fill="none" stroke="url(#particle-trails-obsidian-inset)" stroke-width="5" stroke-linecap="round" />
        <circle cx="22" cy="97" r="5.5" fill="url(#particle-trails-obsidian-sphere-body)" stroke="#475569" stroke-width="0.7" />
        <circle cx="40" cy="87" r="7.5" fill="url(#particle-trails-obsidian-sphere-body)" stroke="#475569" stroke-width="0.8" />
        <circle cx="59" cy="69" r="9.5" fill="url(#particle-trails-obsidian-secondary)" stroke="#BFDBFE" stroke-width="0.8" />
        <circle cx="79" cy="48" r="12" fill="url(#particle-trails-obsidian-accent-sphere)" />
        <circle cx="102" cy="30" r="15.5" fill="url(#particle-trails-obsidian-accent-sphere)" />
        <ellipse cx="97" cy="24" rx="5" ry="3" transform="rotate(-30 97 24)" fill="#F1F5F9" opacity="0.78" />
      </g>
    `,
  },
  {
    id: 'vorticity-axis-obsidian',
    name: 'Vorticity Spin Axis',
    category: 'physics',
    styleVariant: 'Obsidian',
    sourceSize: 128,
    defsMarkup: `
      <linearGradient id="vorticity-axis-obsidian-body" x1="18%" y1="10%" x2="85%" y2="92%">
        <stop offset="0%" stop-color="#64748B" />
        <stop offset="52%" stop-color="#273244" />
        <stop offset="100%" stop-color="#0B101B" />
      </linearGradient>
      <linearGradient id="vorticity-axis-obsidian-inset" x1="20%" y1="10%" x2="80%" y2="95%">
        <stop offset="0%" stop-color="#060911" />
        <stop offset="55%" stop-color="#182232" />
        <stop offset="100%" stop-color="#334155" />
      </linearGradient>
      <linearGradient id="vorticity-axis-obsidian-accent" x1="15%" y1="10%" x2="85%" y2="90%">
        <stop offset="0%" stop-color="#34D399" />
        <stop offset="50%" stop-color="#10B981" />
        <stop offset="100%" stop-color="#065F46" />
      </linearGradient>
      <filter id="vorticity-axis-obsidian-shadow" x="-22%" y="-22%" width="144%" height="148%">
        <feDropShadow dx="0" dy="5" stdDeviation="4.2" flood-color="#020617" flood-opacity="0.48" />
      </filter>
    `,
    bodyMarkup: `
      <g filter="url(#vorticity-axis-obsidian-shadow)">
        <path d="M26,64 C26,46 102,46 102,64" fill="none" stroke="url(#vorticity-axis-obsidian-inset)" stroke-width="9" stroke-linecap="round" />
        <rect x="59.5" y="28" width="9" height="84" rx="4.5" fill="url(#vorticity-axis-obsidian-body)" stroke="#475569" stroke-width="0.9" />
        <line x1="62" y1="32" x2="62" y2="108" stroke="#F1F5F9" stroke-width="1.5" opacity="0.7" />
        <polygon points="64,12 53,31 75,31" fill="url(#vorticity-axis-obsidian-body)" stroke="#475569" stroke-width="0.8" />
        <path d="M26,64 C26,84 96,84 102,68" fill="none" stroke="url(#vorticity-axis-obsidian-accent)" stroke-width="10.5" stroke-linecap="round" />
        <path d="M28,66 C34,81 92,81 99,68" fill="none" stroke="#A7F3D0" stroke-width="1.8" stroke-linecap="round" opacity="0.85" />
        <polygon points="112,58 91,63 105,78" fill="url(#vorticity-axis-obsidian-accent)" stroke="#A7F3D0" stroke-width="0.8" />
      </g>
    `,
  },
  {
    id: 'vorticity-axis-ceramic',
    name: 'Vorticity Spin Axis',
    category: 'physics',
    styleVariant: 'Ceramic',
    sourceSize: 128,
    defsMarkup: `
      <linearGradient id="vorticity-axis-ceramic-body" x1="18%" y1="10%" x2="85%" y2="92%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="52%" stop-color="#E9EEF5" />
        <stop offset="100%" stop-color="#B8C4D4" />
      </linearGradient>
      <linearGradient id="vorticity-axis-ceramic-inset" x1="20%" y1="10%" x2="80%" y2="95%">
        <stop offset="0%" stop-color="#94A3B8" />
        <stop offset="55%" stop-color="#DCE4EE" />
        <stop offset="100%" stop-color="#F8FAFC" />
      </linearGradient>
      <linearGradient id="vorticity-axis-ceramic-accent" x1="15%" y1="10%" x2="85%" y2="90%">
        <stop offset="0%" stop-color="#34D399" />
        <stop offset="50%" stop-color="#10B981" />
        <stop offset="100%" stop-color="#065F46" />
      </linearGradient>
      <filter id="vorticity-axis-ceramic-shadow" x="-22%" y="-22%" width="144%" height="148%">
        <feDropShadow dx="0" dy="5" stdDeviation="4.2" flood-color="#0F172A" flood-opacity="0.22" />
      </filter>
    `,
    bodyMarkup: `
      <g filter="url(#vorticity-axis-ceramic-shadow)">
        <path d="M26,64 C26,46 102,46 102,64" fill="none" stroke="url(#vorticity-axis-ceramic-inset)" stroke-width="9" stroke-linecap="round" />
        <rect x="59.5" y="28" width="9" height="84" rx="4.5" fill="url(#vorticity-axis-ceramic-body)" stroke="#94A3B8" stroke-width="0.9" />
        <line x1="62" y1="32" x2="62" y2="108" stroke="#FFFFFF" stroke-width="1.5" opacity="0.7" />
        <polygon points="64,12 53,31 75,31" fill="url(#vorticity-axis-ceramic-body)" stroke="#94A3B8" stroke-width="0.8" />
        <path d="M26,64 C26,84 96,84 102,68" fill="none" stroke="url(#vorticity-axis-ceramic-accent)" stroke-width="10.5" stroke-linecap="round" />
        <path d="M28,66 C34,81 92,81 99,68" fill="none" stroke="#A7F3D0" stroke-width="1.8" stroke-linecap="round" opacity="0.85" />
        <polygon points="112,58 91,63 105,78" fill="url(#vorticity-axis-ceramic-accent)" stroke="#A7F3D0" stroke-width="0.8" />
      </g>
    `,
  },
  {
    id: 'surface-cohesion-ceramic',
    name: 'Surface Cohesion',
    category: 'physics',
    styleVariant: 'Ceramic',
    sourceSize: 128,
    defsMarkup: `
      <radialGradient id="surface-cohesion-ceramic-sphere-body" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="55%" stop-color="#E9EEF5" />
        <stop offset="100%" stop-color="#B8C4D4" />
      </radialGradient>
      <linearGradient id="surface-cohesion-ceramic-accent" x1="15%" y1="10%" x2="85%" y2="90%">
        <stop offset="0%" stop-color="#60A5FA" />
        <stop offset="50%" stop-color="#2563EB" />
        <stop offset="100%" stop-color="#1E3A8A" />
      </linearGradient>
      <radialGradient id="surface-cohesion-ceramic-accent-sphere" cx="34%" cy="28%" r="70%">
        <stop offset="0%" stop-color="#BFDBFE" />
        <stop offset="32%" stop-color="#60A5FA" />
        <stop offset="72%" stop-color="#2563EB" />
        <stop offset="100%" stop-color="#1E3A8A" />
      </radialGradient>
      <filter id="surface-cohesion-ceramic-shadow" x="-22%" y="-22%" width="144%" height="148%">
        <feDropShadow dx="0" dy="5" stdDeviation="4.2" flood-color="#0F172A" flood-opacity="0.22" />
      </filter>
    `,
    bodyMarkup: `
      <g filter="url(#surface-cohesion-ceramic-shadow)">
        <path d="M32,40 C44,44 50,52 54,58 L46,66 C42,56 34,48 26,44 Z" fill="url(#surface-cohesion-ceramic-accent)" />
        <path d="M96,40 C84,44 78,52 74,58 L82,66 C86,56 94,48 102,44 Z" fill="url(#surface-cohesion-ceramic-accent)" />
        <path d="M58,80 L70,80 L68,102 L60,102 Z" fill="url(#surface-cohesion-ceramic-accent)" />
        <circle cx="28" cy="38" r="11.5" fill="url(#surface-cohesion-ceramic-sphere-body)" stroke="#94A3B8" stroke-width="0.9" />
        <circle cx="100" cy="38" r="11.5" fill="url(#surface-cohesion-ceramic-sphere-body)" stroke="#94A3B8" stroke-width="0.9" />
        <circle cx="64" cy="103" r="11.5" fill="url(#surface-cohesion-ceramic-sphere-body)" stroke="#94A3B8" stroke-width="0.9" />
        <circle cx="64" cy="62" r="22" fill="url(#surface-cohesion-ceramic-accent-sphere)" />
        <ellipse cx="56" cy="53" rx="7" ry="4" transform="rotate(-30 56 53)" fill="#FFFFFF" opacity="0.75" />
      </g>
    `,
  },
  {
    id: 'surface-cohesion-obsidian',
    name: 'Surface Cohesion',
    category: 'physics',
    styleVariant: 'Obsidian',
    sourceSize: 128,
    defsMarkup: `
      <radialGradient id="surface-cohesion-obsidian-sphere-body" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#64748B" />
        <stop offset="55%" stop-color="#273244" />
        <stop offset="100%" stop-color="#0B101B" />
      </radialGradient>
      <linearGradient id="surface-cohesion-obsidian-accent" x1="15%" y1="10%" x2="85%" y2="90%">
        <stop offset="0%" stop-color="#60A5FA" />
        <stop offset="50%" stop-color="#2563EB" />
        <stop offset="100%" stop-color="#1E3A8A" />
      </linearGradient>
      <radialGradient id="surface-cohesion-obsidian-accent-sphere" cx="34%" cy="28%" r="70%">
        <stop offset="0%" stop-color="#BFDBFE" />
        <stop offset="32%" stop-color="#60A5FA" />
        <stop offset="72%" stop-color="#2563EB" />
        <stop offset="100%" stop-color="#1E3A8A" />
      </radialGradient>
      <filter id="surface-cohesion-obsidian-shadow" x="-22%" y="-22%" width="144%" height="148%">
        <feDropShadow dx="0" dy="5" stdDeviation="4.2" flood-color="#020617" flood-opacity="0.48" />
      </filter>
    `,
    bodyMarkup: `
      <g filter="url(#surface-cohesion-obsidian-shadow)">
        <path d="M32,40 C44,44 50,52 54,58 L46,66 C42,56 34,48 26,44 Z" fill="url(#surface-cohesion-obsidian-accent)" />
        <path d="M96,40 C84,44 78,52 74,58 L82,66 C86,56 94,48 102,44 Z" fill="url(#surface-cohesion-obsidian-accent)" />
        <path d="M58,80 L70,80 L68,102 L60,102 Z" fill="url(#surface-cohesion-obsidian-accent)" />
        <circle cx="28" cy="38" r="11.5" fill="url(#surface-cohesion-obsidian-sphere-body)" stroke="#475569" stroke-width="0.9" />
        <circle cx="100" cy="38" r="11.5" fill="url(#surface-cohesion-obsidian-sphere-body)" stroke="#475569" stroke-width="0.9" />
        <circle cx="64" cy="103" r="11.5" fill="url(#surface-cohesion-obsidian-sphere-body)" stroke="#475569" stroke-width="0.9" />
        <circle cx="64" cy="62" r="22" fill="url(#surface-cohesion-obsidian-accent-sphere)" />
        <ellipse cx="56" cy="53" rx="7" ry="4" transform="rotate(-30 56 53)" fill="#F1F5F9" opacity="0.75" />
      </g>
    `,
  },
  {
    id: 'collision-cage-obsidian',
    name: 'Collision Cage',
    category: 'physics',
    styleVariant: 'Obsidian',
    sourceSize: 128,
    defsMarkup: `
      <linearGradient id="collision-cage-obsidian-body" x1="18%" y1="10%" x2="85%" y2="92%">
        <stop offset="0%" stop-color="#64748B" />
        <stop offset="52%" stop-color="#273244" />
        <stop offset="100%" stop-color="#0B101B" />
      </linearGradient>
      <linearGradient id="collision-cage-obsidian-body-rev" x1="85%" y1="12%" x2="15%" y2="88%">
        <stop offset="0%" stop-color="#64748B" />
        <stop offset="55%" stop-color="#273244" />
        <stop offset="100%" stop-color="#0B101B" />
      </linearGradient>
      <radialGradient id="collision-cage-obsidian-sphere-body" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#64748B" />
        <stop offset="55%" stop-color="#273244" />
        <stop offset="100%" stop-color="#0B101B" />
      </radialGradient>
      <linearGradient id="collision-cage-obsidian-accent" x1="15%" y1="10%" x2="85%" y2="90%">
        <stop offset="0%" stop-color="#FDE047" />
        <stop offset="50%" stop-color="#F59E0B" />
        <stop offset="100%" stop-color="#B45309" />
      </linearGradient>
      <radialGradient id="collision-cage-obsidian-accent-sphere" cx="34%" cy="28%" r="70%">
        <stop offset="0%" stop-color="#FEF08A" />
        <stop offset="32%" stop-color="#FDE047" />
        <stop offset="72%" stop-color="#F59E0B" />
        <stop offset="100%" stop-color="#B45309" />
      </radialGradient>
      <linearGradient id="collision-cage-obsidian-secondary" x1="15%" y1="10%" x2="85%" y2="90%">
        <stop offset="0%" stop-color="#FB923C" />
        <stop offset="55%" stop-color="#EA580C" />
        <stop offset="100%" stop-color="#7C2D12" />
      </linearGradient>
      <filter id="collision-cage-obsidian-shadow" x="-22%" y="-22%" width="144%" height="148%">
        <feDropShadow dx="0" dy="5" stdDeviation="4.2" flood-color="#020617" flood-opacity="0.48" />
      </filter>
    `,
    bodyMarkup: `
      <g filter="url(#collision-cage-obsidian-shadow)">
        <polygon points="64,16 105,40 105,88 64,112 23,88 23,40" fill="none" stroke="url(#collision-cage-obsidian-body)" stroke-width="5.5" stroke-linejoin="round" />
        <polygon points="64,16 94,64 34,64" fill="url(#collision-cage-obsidian-accent)" opacity="0.22" stroke="url(#collision-cage-obsidian-accent)" stroke-width="3.5" stroke-linejoin="round" />
        <polygon points="64,112 94,64 34,64" fill="url(#collision-cage-obsidian-secondary)" opacity="0.22" stroke="url(#collision-cage-obsidian-accent)" stroke-width="3.5" stroke-linejoin="round" />
        <line x1="23" y1="40" x2="34" y2="64" stroke="url(#collision-cage-obsidian-body)" stroke-width="4" />
        <line x1="105" y1="40" x2="94" y2="64" stroke="url(#collision-cage-obsidian-body)" stroke-width="4" />
        <line x1="23" y1="88" x2="34" y2="64" stroke="url(#collision-cage-obsidian-body-rev)" stroke-width="4" />
        <line x1="105" y1="88" x2="94" y2="64" stroke="url(#collision-cage-obsidian-body-rev)" stroke-width="4" />
        <circle cx="64" cy="16" r="6" fill="url(#collision-cage-obsidian-accent-sphere)" />
        <circle cx="64" cy="112" r="6" fill="url(#collision-cage-obsidian-accent-sphere)" />
        <circle cx="34" cy="64" r="6" fill="url(#collision-cage-obsidian-accent-sphere)" />
        <circle cx="94" cy="64" r="6" fill="url(#collision-cage-obsidian-accent-sphere)" />
        <circle cx="23" cy="40" r="5" fill="url(#collision-cage-obsidian-sphere-body)" stroke="#475569" stroke-width="0.8" />
        <circle cx="105" cy="40" r="5" fill="url(#collision-cage-obsidian-sphere-body)" stroke="#475569" stroke-width="0.8" />
        <circle cx="23" cy="88" r="5" fill="url(#collision-cage-obsidian-sphere-body)" stroke="#475569" stroke-width="0.8" />
        <circle cx="105" cy="88" r="5" fill="url(#collision-cage-obsidian-sphere-body)" stroke="#475569" stroke-width="0.8" />
      </g>
    `,
  },
  {
    id: 'collision-cage-ceramic',
    name: 'Collision Cage',
    category: 'physics',
    styleVariant: 'Ceramic',
    sourceSize: 128,
    defsMarkup: `
      <linearGradient id="collision-cage-ceramic-body" x1="18%" y1="10%" x2="85%" y2="92%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="52%" stop-color="#E9EEF5" />
        <stop offset="100%" stop-color="#B8C4D4" />
      </linearGradient>
      <linearGradient id="collision-cage-ceramic-body-rev" x1="85%" y1="12%" x2="15%" y2="88%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="55%" stop-color="#E9EEF5" />
        <stop offset="100%" stop-color="#B8C4D4" />
      </linearGradient>
      <radialGradient id="collision-cage-ceramic-sphere-body" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="55%" stop-color="#E9EEF5" />
        <stop offset="100%" stop-color="#B8C4D4" />
      </radialGradient>
      <linearGradient id="collision-cage-ceramic-accent" x1="15%" y1="10%" x2="85%" y2="90%">
        <stop offset="0%" stop-color="#FDE047" />
        <stop offset="50%" stop-color="#F59E0B" />
        <stop offset="100%" stop-color="#B45309" />
      </linearGradient>
      <radialGradient id="collision-cage-ceramic-accent-sphere" cx="34%" cy="28%" r="70%">
        <stop offset="0%" stop-color="#FEF08A" />
        <stop offset="32%" stop-color="#FDE047" />
        <stop offset="72%" stop-color="#F59E0B" />
        <stop offset="100%" stop-color="#B45309" />
      </radialGradient>
      <linearGradient id="collision-cage-ceramic-secondary" x1="15%" y1="10%" x2="85%" y2="90%">
        <stop offset="0%" stop-color="#FB923C" />
        <stop offset="55%" stop-color="#EA580C" />
        <stop offset="100%" stop-color="#7C2D12" />
      </linearGradient>
      <filter id="collision-cage-ceramic-shadow" x="-22%" y="-22%" width="144%" height="148%">
        <feDropShadow dx="0" dy="5" stdDeviation="4.2" flood-color="#0F172A" flood-opacity="0.22" />
      </filter>
    `,
    bodyMarkup: `
      <g filter="url(#collision-cage-ceramic-shadow)">
        <polygon points="64,16 105,40 105,88 64,112 23,88 23,40" fill="none" stroke="url(#collision-cage-ceramic-body)" stroke-width="5.5" stroke-linejoin="round" />
        <polygon points="64,16 94,64 34,64" fill="url(#collision-cage-ceramic-accent)" opacity="0.22" stroke="url(#collision-cage-ceramic-accent)" stroke-width="3.5" stroke-linejoin="round" />
        <polygon points="64,112 94,64 34,64" fill="url(#collision-cage-ceramic-secondary)" opacity="0.22" stroke="url(#collision-cage-ceramic-accent)" stroke-width="3.5" stroke-linejoin="round" />
        <line x1="23" y1="40" x2="34" y2="64" stroke="url(#collision-cage-ceramic-body)" stroke-width="4" />
        <line x1="105" y1="40" x2="94" y2="64" stroke="url(#collision-cage-ceramic-body)" stroke-width="4" />
        <line x1="23" y1="88" x2="34" y2="64" stroke="url(#collision-cage-ceramic-body-rev)" stroke-width="4" />
        <line x1="105" y1="88" x2="94" y2="64" stroke="url(#collision-cage-ceramic-body-rev)" stroke-width="4" />
        <circle cx="64" cy="16" r="6" fill="url(#collision-cage-ceramic-accent-sphere)" />
        <circle cx="64" cy="112" r="6" fill="url(#collision-cage-ceramic-accent-sphere)" />
        <circle cx="34" cy="64" r="6" fill="url(#collision-cage-ceramic-accent-sphere)" />
        <circle cx="94" cy="64" r="6" fill="url(#collision-cage-ceramic-accent-sphere)" />
        <circle cx="23" cy="40" r="5" fill="url(#collision-cage-ceramic-sphere-body)" stroke="#94A3B8" stroke-width="0.8" />
        <circle cx="105" cy="40" r="5" fill="url(#collision-cage-ceramic-sphere-body)" stroke="#94A3B8" stroke-width="0.8" />
        <circle cx="23" cy="88" r="5" fill="url(#collision-cage-ceramic-sphere-body)" stroke="#94A3B8" stroke-width="0.8" />
        <circle cx="105" cy="88" r="5" fill="url(#collision-cage-ceramic-sphere-body)" stroke="#94A3B8" stroke-width="0.8" />
      </g>
    `,
  },
  {
    id: 'spring-mass-anchor',
    name: 'Oscillating Mass Anchor',
    category: 'physics',
    styleVariant: 'Steel',
    sourceSize: 128,
    defsMarkup: `
      <filter id="spring-mass-anchor-drop" x="-18%" y="-18%" width="140%" height="145%">
        <feDropShadow dx="0" dy="5" stdDeviation="4.5" flood-color="#020617" flood-opacity="0.36" />
      </filter>
      <linearGradient id="spring-mass-anchor-body" x1="16%" y1="10%" x2="86%" y2="92%">
        <stop offset="0%" stop-color="#8C949E" />
        <stop offset="52%" stop-color="#525963" />
        <stop offset="100%" stop-color="#252930" />
      </linearGradient>
      <linearGradient id="spring-mass-anchor-face" x1="18%" y1="8%" x2="82%" y2="90%">
        <stop offset="0%" stop-color="#9BA3AE" />
        <stop offset="100%" stop-color="#4C525C" />
      </linearGradient>
      <radialGradient id="spring-mass-anchor-accent-sphere" cx="35%" cy="28%" r="70%" fx="30%" fy="24%">
        <stop offset="0%" stop-color="#E2E8F0" />
        <stop offset="55%" stop-color="#94A3B8" />
        <stop offset="100%" stop-color="#475569" />
      </radialGradient>
      <linearGradient id="spring-mass-anchor-rim" x1="12%" y1="8%" x2="88%" y2="88%">
        <stop offset="0%" stop-color="rgba(248,250,252,0.78)" />
        <stop offset="50%" stop-color="rgba(248,250,252,0.06)" />
        <stop offset="100%" stop-color="rgba(255,255,255,0)" />
      </linearGradient>
    `,
    bodyMarkup: `
      <g filter="url(#spring-mass-anchor-drop)">
        <rect x="32" y="16" width="64" height="15" rx="7" fill="url(#spring-mass-anchor-body)" />
        <path d="M64 31 L64 38 L46 46 L82 56 L46 66 L82 76 L64 83 L64 88" fill="none" stroke="url(#spring-mass-anchor-face)" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round" />
        <circle cx="64" cy="95" r="17" fill="url(#spring-mass-anchor-accent-sphere)" />
        <circle cx="64" cy="95" r="16" fill="none" stroke="url(#spring-mass-anchor-rim)" stroke-width="1.5" />
      </g>
    `,
  },

  // =========================================================================
  // DIAGNOSTICS & GAUGES (6)
  // =========================================================================
  {
    id: 'debug-dial-housing',
    name: 'Pressure Dial Housing',
    category: 'diagnostics',
    styleVariant: 'Amber Bevel',
    sourceSize: 128,
    note: 'Readings 0–3',
    defsMarkup: `
      <filter id="debug-dial-housing-drop" x="-18%" y="-18%" width="140%" height="145%">
        <feDropShadow dx="0" dy="5" stdDeviation="4.5" flood-color="#1E1B08" flood-opacity="0.28" />
      </filter>
      <linearGradient id="debug-dial-housing-body" x1="16%" y1="10%" x2="86%" y2="92%">
        <stop offset="0%" stop-color="#FFE55C" />
        <stop offset="52%" stop-color="#FFCC1A" />
        <stop offset="100%" stop-color="#DFA200" />
      </linearGradient>
      <linearGradient id="debug-dial-housing-face" x1="18%" y1="8%" x2="82%" y2="90%">
        <stop offset="0%" stop-color="#FFEA75" />
        <stop offset="100%" stop-color="#FFD024" />
      </linearGradient>
      <linearGradient id="debug-dial-housing-extrude" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#E5A800" />
        <stop offset="100%" stop-color="#B37B00" />
      </linearGradient>
      <linearGradient id="debug-dial-housing-core" x1="18%" y1="12%" x2="84%" y2="90%">
        <stop offset="0%" stop-color="#323438" />
        <stop offset="52%" stop-color="#212326" />
        <stop offset="100%" stop-color="#121316" />
      </linearGradient>
      <linearGradient id="debug-dial-housing-rim" x1="12%" y1="8%" x2="88%" y2="88%">
        <stop offset="0%" stop-color="rgba(255,252,224,0.88)" />
        <stop offset="50%" stop-color="rgba(255,244,179,0.08)" />
        <stop offset="100%" stop-color="rgba(255,255,255,0)" />
      </linearGradient>
    `,
    bodyMarkup: `
      <g filter="url(#debug-dial-housing-drop)">
        <circle cx="64" cy="67" r="46" fill="url(#debug-dial-housing-extrude)" />
        <circle cx="64" cy="63" r="46" fill="url(#debug-dial-housing-body)" />
        <circle cx="64" cy="63" r="35" fill="#17181B" />
        <path d="M38 78 A30 30 0 1 1 90 78" fill="none" stroke="url(#debug-dial-housing-face)" stroke-width="4.5" stroke-linecap="round" opacity="0.55" />
        <path d="M59 68 L84 36 L69 68 Z" fill="url(#debug-dial-housing-face)" />
        <circle cx="64" cy="66" r="9.5" fill="url(#debug-dial-housing-core)" stroke="rgba(255,252,224,0.88)" stroke-opacity="0.4" stroke-width="1" />
        <circle cx="64" cy="63" r="45" fill="none" stroke="url(#debug-dial-housing-rim)" stroke-width="1.5" />
      </g>
    `,
  },
  {
    id: 'debug-hazard-shield',
    name: 'Beveled Hazard Shield',
    category: 'diagnostics',
    styleVariant: 'Amber Bevel',
    sourceSize: 128,
    defsMarkup: `
      <filter id="debug-hazard-shield-drop" x="-18%" y="-18%" width="140%" height="145%">
        <feDropShadow dx="0" dy="5" stdDeviation="4.5" flood-color="#1E1B08" flood-opacity="0.28" />
      </filter>
      <filter id="debug-hazard-shield-inner" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#9E6D00" flood-opacity="0.35" />
      </filter>
      <linearGradient id="debug-hazard-shield-body" x1="16%" y1="10%" x2="86%" y2="92%">
        <stop offset="0%" stop-color="#FFE55C" />
        <stop offset="52%" stop-color="#FFCC1A" />
        <stop offset="100%" stop-color="#DFA200" />
      </linearGradient>
      <linearGradient id="debug-hazard-shield-extrude" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#E5A800" />
        <stop offset="100%" stop-color="#B37B00" />
      </linearGradient>
      <linearGradient id="debug-hazard-shield-core" x1="18%" y1="12%" x2="84%" y2="90%">
        <stop offset="0%" stop-color="#323438" />
        <stop offset="52%" stop-color="#212326" />
        <stop offset="100%" stop-color="#121316" />
      </linearGradient>
      <linearGradient id="debug-hazard-shield-rim" x1="12%" y1="8%" x2="88%" y2="88%">
        <stop offset="0%" stop-color="rgba(255,252,224,0.88)" />
        <stop offset="50%" stop-color="rgba(255,244,179,0.08)" />
        <stop offset="100%" stop-color="rgba(255,255,255,0)" />
      </linearGradient>
    `,
    bodyMarkup: `
      <g filter="url(#debug-hazard-shield-drop)">
        <path d="M55.5 23 C59.3 16.5, 68.7 16.5, 72.5 23 L109.5 87 C113.3 93.5, 108.6 102, 101 102 L27 102 C19.4 102, 14.7 93.5, 18.5 87 Z" fill="url(#debug-hazard-shield-extrude)" transform="translate(0,4.5)" />
        <path d="M55.5 21 C59.3 14.5, 68.7 14.5, 72.5 21 L109.5 85 C113.3 91.5, 108.6 100, 101 100 L27 100 C19.4 100, 14.7 91.5, 18.5 85 Z" fill="url(#debug-hazard-shield-body)" />
        <path d="M58.5 28 C60.9 23.8, 67.1 23.8, 69.5 28 L101.5 83.5 C103.9 87.7, 100.9 93, 96 93 L32 93 C27.1 93, 24.1 87.7, 26.5 83.5 Z" fill="none" stroke="url(#debug-hazard-shield-core)" stroke-width="5.2" stroke-linejoin="round" />
        <path d="M58.5 43 C58.5 39.5, 61 37.5, 64 37.5 C67 37.5, 69.5 39.5, 69.5 43 L68 68 C67.8 70.5, 66.2 72, 64 72 C61.8 72, 60.2 70.5, 60 68 Z" fill="url(#debug-hazard-shield-core)" filter="url(#debug-hazard-shield-inner)" />
        <circle cx="64" cy="81.5" r="5.8" fill="url(#debug-hazard-shield-core)" filter="url(#debug-hazard-shield-inner)" />
        <path d="M56 22 C59.6 15.8, 68.4 15.8, 72 22 L108.5 85" fill="none" stroke="url(#debug-hazard-shield-rim)" stroke-width="1.5" stroke-linecap="round" />
      </g>
    `,
  },
  {
    id: 'solver-substep-ceramic',
    name: 'Solver Substep',
    category: 'diagnostics',
    styleVariant: 'Ceramic',
    sourceSize: 128,
    defsMarkup: `
      <linearGradient id="solver-substep-ceramic-body" x1="18%" y1="10%" x2="85%" y2="92%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="52%" stop-color="#E9EEF5" />
        <stop offset="100%" stop-color="#B8C4D4" />
      </linearGradient>
      <linearGradient id="solver-substep-ceramic-body-rev" x1="85%" y1="12%" x2="15%" y2="88%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="55%" stop-color="#E9EEF5" />
        <stop offset="100%" stop-color="#B8C4D4" />
      </linearGradient>
      <linearGradient id="solver-substep-ceramic-inset" x1="20%" y1="10%" x2="80%" y2="95%">
        <stop offset="0%" stop-color="#94A3B8" />
        <stop offset="55%" stop-color="#DCE4EE" />
        <stop offset="100%" stop-color="#F8FAFC" />
      </linearGradient>
      <linearGradient id="solver-substep-ceramic-accent" x1="15%" y1="10%" x2="85%" y2="90%">
        <stop offset="0%" stop-color="#60A5FA" />
        <stop offset="50%" stop-color="#2563EB" />
        <stop offset="100%" stop-color="#1E3A8A" />
      </linearGradient>
      <radialGradient id="solver-substep-ceramic-accent-sphere" cx="34%" cy="28%" r="70%">
        <stop offset="0%" stop-color="#BFDBFE" />
        <stop offset="32%" stop-color="#60A5FA" />
        <stop offset="72%" stop-color="#2563EB" />
        <stop offset="100%" stop-color="#1E3A8A" />
      </radialGradient>
      <filter id="solver-substep-ceramic-shadow" x="-22%" y="-22%" width="144%" height="148%">
        <feDropShadow dx="0" dy="5" stdDeviation="4.2" flood-color="#0F172A" flood-opacity="0.22" />
      </filter>
    `,
    bodyMarkup: `
      <g filter="url(#solver-substep-ceramic-shadow)">
        <rect x="55" y="12" width="18" height="11" rx="4" fill="url(#solver-substep-ceramic-body)" stroke="#94A3B8" stroke-width="0.9" />
        <circle cx="64" cy="69" r="43" fill="url(#solver-substep-ceramic-body-rev)" stroke="#94A3B8" stroke-width="1" />
        <circle cx="64" cy="66" r="42" fill="url(#solver-substep-ceramic-body)" />
        <circle cx="64" cy="66" r="33" fill="url(#solver-substep-ceramic-inset)" />
        <path d="M64,66 L64,34 A32,32 0 0,1 92,50 Z" fill="url(#solver-substep-ceramic-accent)" opacity="0.9" />
        <path d="M32,40 A42,42 0 0,1 96,38" fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" opacity="0.8" />
        <line x1="64" y1="66" x2="64" y2="39" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" />
        <line x1="64" y1="66" x2="86" y2="53" stroke="#BFDBFE" stroke-width="3" stroke-linecap="round" />
        <circle cx="64" cy="66" r="7.5" fill="url(#solver-substep-ceramic-accent-sphere)" />
      </g>
    `,
  },
  {
    id: 'debug-chronometer-dial',
    name: 'Chronometer Dial Gauge',
    category: 'diagnostics',
    styleVariant: 'Amber Bevel',
    sourceSize: 128,
    defsMarkup: `
      <filter id="debug-chronometer-dial-drop" x="-18%" y="-18%" width="140%" height="145%">
        <feDropShadow dx="0" dy="5" stdDeviation="4.5" flood-color="#1E1B08" flood-opacity="0.28" />
      </filter>
      <linearGradient id="debug-chronometer-dial-body" x1="16%" y1="10%" x2="86%" y2="92%">
        <stop offset="0%" stop-color="#FFE55C" />
        <stop offset="52%" stop-color="#FFCC1A" />
        <stop offset="100%" stop-color="#DFA200" />
      </linearGradient>
      <linearGradient id="debug-chronometer-dial-face" x1="18%" y1="8%" x2="82%" y2="90%">
        <stop offset="0%" stop-color="#FFEA75" />
        <stop offset="100%" stop-color="#FFD024" />
      </linearGradient>
      <linearGradient id="debug-chronometer-dial-extrude" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#E5A800" />
        <stop offset="100%" stop-color="#B37B00" />
      </linearGradient>
      <linearGradient id="debug-chronometer-dial-core" x1="18%" y1="12%" x2="84%" y2="90%">
        <stop offset="0%" stop-color="#323438" />
        <stop offset="52%" stop-color="#212326" />
        <stop offset="100%" stop-color="#121316" />
      </linearGradient>
      <linearGradient id="debug-chronometer-dial-rim" x1="12%" y1="8%" x2="88%" y2="88%">
        <stop offset="0%" stop-color="rgba(255,252,224,0.88)" />
        <stop offset="50%" stop-color="rgba(255,244,179,0.08)" />
        <stop offset="100%" stop-color="rgba(255,255,255,0)" />
      </linearGradient>
    `,
    bodyMarkup: `
      <g filter="url(#debug-chronometer-dial-drop)">
        <rect x="57" y="13" width="14" height="12" rx="4" fill="url(#debug-chronometer-dial-core)" />
        <circle cx="64" cy="69" r="42" fill="url(#debug-chronometer-dial-extrude)" />
        <circle cx="64" cy="65" r="42" fill="url(#debug-chronometer-dial-body)" />
        <circle cx="64" cy="65" r="32" fill="#17181B" />
        <path d="M64 65 L64 38 A27 27 0 0 1 88 53 Z" fill="url(#debug-chronometer-dial-face)" />
        <circle cx="64" cy="65" r="7.5" fill="url(#debug-chronometer-dial-core)" />
        <circle cx="64" cy="65" r="41" fill="none" stroke="url(#debug-chronometer-dial-rim)" stroke-width="1.5" />
      </g>
    `,
  },
  {
    id: 'debug-frame-stack',
    name: 'Integration Frame Stack',
    category: 'diagnostics',
    styleVariant: 'Ceramic',
    sourceSize: 128,
    defsMarkup: `
      <filter id="debug-frame-stack-drop" x="-18%" y="-18%" width="140%" height="145%">
        <feDropShadow dx="0" dy="5" stdDeviation="4.5" flood-color="#0F172A" flood-opacity="0.22" />
      </filter>
      <linearGradient id="debug-frame-stack-body" x1="16%" y1="10%" x2="86%" y2="92%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="52%" stop-color="#F1F4F8" />
        <stop offset="100%" stop-color="#CFD6E0" />
      </linearGradient>
      <linearGradient id="debug-frame-stack-face" x1="18%" y1="8%" x2="82%" y2="90%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="100%" stop-color="#E8EDF4" />
      </linearGradient>
      <linearGradient id="debug-frame-stack-extrude" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#DCE2EC" />
        <stop offset="100%" stop-color="#B4BECC" />
      </linearGradient>
      <linearGradient id="debug-frame-stack-accent" x1="18%" y1="12%" x2="84%" y2="90%">
        <stop offset="0%" stop-color="#3D4858" />
        <stop offset="55%" stop-color="#242B36" />
        <stop offset="100%" stop-color="#11161E" />
      </linearGradient>
      <linearGradient id="debug-frame-stack-rim" x1="12%" y1="8%" x2="88%" y2="88%">
        <stop offset="0%" stop-color="rgba(255,255,255,0.96)" />
        <stop offset="50%" stop-color="rgba(255,255,255,0.12)" />
        <stop offset="100%" stop-color="rgba(255,255,255,0)" />
      </linearGradient>
    `,
    bodyMarkup: `
      <g filter="url(#debug-frame-stack-drop)">
        <rect x="20" y="20" width="60" height="64" rx="12" fill="url(#debug-frame-stack-extrude)" />
        <rect x="34" y="34" width="60" height="64" rx="12" fill="url(#debug-frame-stack-face)" />
        <rect x="48" y="48" width="60" height="64" rx="12" fill="url(#debug-frame-stack-body)" />
        <path d="M70 67 L92 80 L70 93 Z" fill="url(#debug-frame-stack-accent)" />
        <rect x="49" y="49" width="58" height="62" rx="11" fill="none" stroke="url(#debug-frame-stack-rim)" stroke-width="1.4" />
      </g>
    `,
  },
  {
    id: 'dbg-warning-obsidian',
    name: 'Caution Shield',
    category: 'diagnostics',
    styleVariant: 'Obsidian',
    sourceSize: 128,
    defsMarkup: `
      <linearGradient id="dbg-warning-obsidian-body" x1="16%" y1="10%" x2="86%" y2="90%">
        <stop offset="0%" stop-color="#71717A" />
        <stop offset="32%" stop-color="#3F3F46" />
        <stop offset="75%" stop-color="#18181B" />
        <stop offset="100%" stop-color="#09090B" />
      </linearGradient>
      <linearGradient id="dbg-warning-obsidian-accent" x1="15%" y1="10%" x2="85%" y2="90%">
        <stop offset="0%" stop-color="#F4F4F5" />
        <stop offset="60%" stop-color="#D4D4D8" />
        <stop offset="100%" stop-color="#71717A" />
      </linearGradient>
      <linearGradient id="dbg-warning-obsidian-rim" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F4F4F5" stop-opacity="0.85" />
        <stop offset="45%" stop-color="#71717A" stop-opacity="0.35" />
        <stop offset="100%" stop-color="#09090B" stop-opacity="0.8" />
      </linearGradient>
      <filter id="dbg-warning-obsidian-drop" x="-20%" y="-20%" width="145%" height="145%">
        <feDropShadow dx="0" dy="6" stdDeviation="4.5" flood-color="#000000" flood-opacity="0.32" />
      </filter>
      <filter id="dbg-warning-obsidian-soft" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#000000" flood-opacity="0.45" />
      </filter>
    `,
    bodyMarkup: `
      <g filter="url(#dbg-warning-obsidian-drop)">
        <path d="M56.2 22.5 C59.7 16.4 68.3 16.4 71.8 22.5 L110.2 89.2 C113.7 95.3 109.3 103 102.3 103 L25.7 103 C18.7 103 14.3 95.3 17.8 89.2 Z" fill="url(#dbg-warning-obsidian-body)" stroke="url(#dbg-warning-obsidian-rim)" stroke-width="1.8" stroke-linejoin="round" />
        <path d="M59.2 28.5 C61.3 24.8 66.7 24.8 68.8 28.5 L102.5 87.2 C104.6 90.9 101.9 95.5 97.6 95.5 L30.4 95.5 C26.1 95.5 23.4 90.9 25.5 87.2 Z" fill="none" stroke="#09090B" stroke-width="5.2" stroke-linejoin="round" />
        <path d="M59.2 28.5 C61.3 24.8 66.7 24.8 68.8 28.5 L102.5 87.2 C104.6 90.9 101.9 95.5 97.6 95.5 L30.4 95.5 C26.1 95.5 23.4 90.9 25.5 87.2 Z" fill="none" stroke="#FFFFFF" stroke-opacity="0.2" stroke-width="1" stroke-linejoin="round" />
        <g filter="url(#dbg-warning-obsidian-soft)">
          <path d="M58.5 46 C58.3 42.5 60.8 40 64 40 C67.2 40 69.7 42.5 69.5 46 L67.8 68.5 C67.6 71 66 72.5 64 72.5 C62 72.5 60.4 71 60.2 68.5 Z" fill="url(#dbg-warning-obsidian-accent)" stroke="#FFFFFF" stroke-opacity="0.22" stroke-width="1" />
          <circle cx="64" cy="82.5" r="6" fill="url(#dbg-warning-obsidian-accent)" stroke="#FFFFFF" stroke-opacity="0.22" stroke-width="1" />
        </g>
      </g>
    `,
  },

  // =========================================================================
  // UV & MESH TOOLS (18) — normalized from 64x64 to 128x128 via scale(2)
  // =========================================================================
  {
    id: 'uv-unwrap-beveled-25d',
    name: 'UV Unwrap',
    category: 'uv',
    styleVariant: '2.5D Bevel',
    sourceSize: 64,
    defsMarkup: `
      <radialGradient id="uv-unwrap-beveled-25d-shadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#05070B" stop-opacity="0.48" />
        <stop offset="65%" stop-color="#05070B" stop-opacity="0.18" />
        <stop offset="100%" stop-color="#05070B" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="uv-unwrap-beveled-25d-charcoal-front" x1="0%" y1="0%" x2="15%" y2="100%">
        <stop offset="0%" stop-color="#434A57" />
        <stop offset="55%" stop-color="#2D323C" />
        <stop offset="100%" stop-color="#1E222A" />
      </linearGradient>
      <linearGradient id="uv-unwrap-beveled-25d-amber-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FDE047" />
        <stop offset="45%" stop-color="#F59E0B" />
        <stop offset="100%" stop-color="#D97706" />
      </linearGradient>
      <linearGradient id="uv-unwrap-beveled-25d-sky-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#BAE6FD" />
        <stop offset="45%" stop-color="#38BDF8" />
        <stop offset="100%" stop-color="#0284C7" />
      </linearGradient>
      <linearGradient id="uv-unwrap-beveled-25d-ivory-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="100%" stop-color="#DCE3EC" />
      </linearGradient>
      <linearGradient id="uv-unwrap-beveled-25d-ivory-side" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#CBD5E1" />
        <stop offset="100%" stop-color="#94A3B8" />
      </linearGradient>
      <linearGradient id="uv-unwrap-beveled-25d-slab-rim" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#272C36" />
        <stop offset="100%" stop-color="#14171D" />
      </linearGradient>
      <filter id="uv-unwrap-beveled-25d-drop" x="-20%" y="-20%" width="140%" height="145%">
        <feDropShadow dx="0" dy="2.5" stdDeviation="1.8" flood-color="#020617" flood-opacity="0.42" />
      </filter>
    `,
    bodyMarkup: `
      <g transform="scale(2)">
        <ellipse cx="32" cy="57" rx="21" ry="3.5" fill="url(#uv-unwrap-beveled-25d-shadow)" />
        <rect x="8" y="13" width="48" height="42" rx="10" fill="url(#uv-unwrap-beveled-25d-slab-rim)" />
        <rect x="8" y="9" width="48" height="42" rx="10" fill="url(#uv-unwrap-beveled-25d-charcoal-front)" stroke="#64748B" stroke-opacity="0.35" stroke-width="1" />
        <path d="M18 10 H46" stroke="#FFFFFF" stroke-opacity="0.32" stroke-width="1.2" stroke-linecap="round" />
        <g filter="url(#uv-unwrap-beveled-25d-drop)">
          <rect x="26" y="15" width="12" height="10" rx="2" fill="url(#uv-unwrap-beveled-25d-amber-top)" />
          <rect x="14" y="25" width="12" height="10" rx="2" fill="url(#uv-unwrap-beveled-25d-sky-top)" />
          <rect x="26" y="25" width="12" height="10" rx="2" fill="url(#uv-unwrap-beveled-25d-ivory-top)" />
          <rect x="38" y="25" width="12" height="10" rx="2" fill="url(#uv-unwrap-beveled-25d-sky-top)" />
          <rect x="26" y="35" width="12" height="10" rx="2" fill="url(#uv-unwrap-beveled-25d-ivory-side)" />
          <path d="M14 33.5 V35 C14 36.1 14.9 37 16 37 H26 V45 C26 46.1 26.9 47 28 47 H36 C37.1 47 38 46.1 38 45 V37 H48 C49.1 37 50 36.1 50 35 V33.5" stroke="#0F172A" stroke-opacity="0.45" stroke-width="1.5" />
        </g>
      </g>
    `,
  },
  {
    id: 'planar-projection-tactile-3d',
    name: 'Planar Projection',
    category: 'uv',
    styleVariant: 'Tactile 3D Clay',
    sourceSize: 64,
    defsMarkup: `
      <radialGradient id="planar-projection-tactile-3d-shadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#05070B" stop-opacity="0.48" />
        <stop offset="65%" stop-color="#05070B" stop-opacity="0.18" />
        <stop offset="100%" stop-color="#05070B" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="planar-projection-tactile-3d-charcoal-front" x1="0%" y1="0%" x2="15%" y2="100%">
        <stop offset="0%" stop-color="#434A57" />
        <stop offset="55%" stop-color="#2D323C" />
        <stop offset="100%" stop-color="#1E222A" />
      </linearGradient>
      <linearGradient id="planar-projection-tactile-3d-charcoal-side" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#262B34" />
        <stop offset="100%" stop-color="#15181E" />
      </linearGradient>
      <linearGradient id="planar-projection-tactile-3d-amber-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FDE047" />
        <stop offset="45%" stop-color="#F59E0B" />
        <stop offset="100%" stop-color="#D97706" />
      </linearGradient>
      <linearGradient id="planar-projection-tactile-3d-amber-side" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#D97706" />
        <stop offset="100%" stop-color="#92400E" />
      </linearGradient>
      <linearGradient id="planar-projection-tactile-3d-sky-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#BAE6FD" />
        <stop offset="45%" stop-color="#38BDF8" />
        <stop offset="100%" stop-color="#0284C7" />
      </linearGradient>
      <filter id="planar-projection-tactile-3d-drop" x="-20%" y="-20%" width="140%" height="145%">
        <feDropShadow dx="0" dy="2.5" stdDeviation="1.8" flood-color="#020617" flood-opacity="0.42" />
      </filter>
    `,
    bodyMarkup: `
      <g transform="scale(2)">
        <ellipse cx="32" cy="56" rx="20" ry="4" fill="url(#planar-projection-tactile-3d-shadow)" />
        <g filter="url(#planar-projection-tactile-3d-drop)">
          <path d="M10 39 L34 27 L54 37 L30 49 Z" fill="url(#planar-projection-tactile-3d-charcoal-front)" stroke="#64748B" stroke-opacity="0.4" stroke-width="0.9" />
          <path d="M10 39 L30 49 L30 52 L10 42 Z" fill="url(#planar-projection-tactile-3d-charcoal-side)" />
          <path d="M30 49 L54 37 L54 40 L30 52 Z" fill="#11151C" />
          <path d="M22 38 L34 32 L42 36 L30 42 Z" fill="url(#planar-projection-tactile-3d-sky-top)" fill-opacity="0.85" />
        </g>
        <path d="M23 22 L22 38 M35 16 L34 32 M43 20 L42 36 M31 26 L30 42" stroke="#38BDF8" stroke-width="1.1" stroke-dasharray="2 2" stroke-opacity="0.85" />
        <g filter="url(#planar-projection-tactile-3d-drop)">
          <path d="M17 19 L36 10 L48 16 L29 25 Z" fill="url(#planar-projection-tactile-3d-amber-top)" />
          <path d="M17 19 L29 25 L29 27.5 L17 21.5 Z" fill="url(#planar-projection-tactile-3d-amber-side)" />
          <path d="M29 25 L48 16 L48 18.5 L29 27.5 Z" fill="#92400E" />
          <path d="M18 19 L36 10.5 L47 16" stroke="#FEF9C3" stroke-opacity="0.7" stroke-width="0.9" />
        </g>
      </g>
    `,
  },
  {
    id: 'cylindrical-projection-glass-wireframe',
    name: 'Cylindrical Map',
    category: 'uv',
    styleVariant: 'Volumetric Glass',
    sourceSize: 64,
    defsMarkup: `
      <linearGradient id="cylindrical-projection-glass-wireframe-glass-slab" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#293242" stop-opacity="0.92" />
        <stop offset="100%" stop-color="#111620" stop-opacity="0.96" />
      </linearGradient>
      <filter id="cylindrical-projection-glass-wireframe-amber-glow" x="-25%" y="-25%" width="150%" height="150%">
        <feDropShadow dx="0" dy="0" stdDeviation="1.6" flood-color="#F59E0B" flood-opacity="0.6" />
      </filter>
    `,
    bodyMarkup: `
      <g transform="scale(2)">
        <ellipse cx="32" cy="17" rx="15" ry="6" fill="#38BDF8" fill-opacity="0.14" stroke="#38BDF8" stroke-width="1.4" />
        <ellipse cx="32" cy="32" rx="15" ry="6" fill="none" stroke="#38BDF8" stroke-opacity="0.5" stroke-width="1.1" stroke-dasharray="2.5 2" />
        <ellipse cx="32" cy="47" rx="15" ry="6" fill="url(#cylindrical-projection-glass-wireframe-glass-slab)" stroke="#38BDF8" stroke-width="1.4" />
        <path d="M17 17 V47 M47 17 V47" stroke="#38BDF8" stroke-width="1.4" />
        <path d="M32 23 V53" stroke="#F59E0B" stroke-width="1.8" filter="url(#cylindrical-projection-glass-wireframe-amber-glow)" />
        <circle cx="32" cy="23" r="2" fill="#FDE047" />
        <circle cx="32" cy="53" r="2" fill="#FDE047" />
      </g>
    `,
  },
  {
    id: 'cylindrical-projection-beveled-25d',
    name: 'Cylindrical Map',
    category: 'uv',
    styleVariant: '2.5D Bevel',
    sourceSize: 64,
    defsMarkup: `
      <radialGradient id="cylindrical-projection-beveled-25d-shadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#05070B" stop-opacity="0.48" />
        <stop offset="65%" stop-color="#05070B" stop-opacity="0.18" />
        <stop offset="100%" stop-color="#05070B" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="cylindrical-projection-beveled-25d-charcoal-front" x1="0%" y1="0%" x2="15%" y2="100%">
        <stop offset="0%" stop-color="#434A57" />
        <stop offset="55%" stop-color="#2D323C" />
        <stop offset="100%" stop-color="#1E222A" />
      </linearGradient>
      <linearGradient id="cylindrical-projection-beveled-25d-amber-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FDE047" />
        <stop offset="45%" stop-color="#F59E0B" />
        <stop offset="100%" stop-color="#D97706" />
      </linearGradient>
      <linearGradient id="cylindrical-projection-beveled-25d-ivory-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="100%" stop-color="#DCE3EC" />
      </linearGradient>
      <linearGradient id="cylindrical-projection-beveled-25d-ivory-side" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#CBD5E1" />
        <stop offset="100%" stop-color="#94A3B8" />
      </linearGradient>
      <linearGradient id="cylindrical-projection-beveled-25d-slab-rim" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#272C36" />
        <stop offset="100%" stop-color="#14171D" />
      </linearGradient>
      <filter id="cylindrical-projection-beveled-25d-drop" x="-20%" y="-20%" width="140%" height="145%">
        <feDropShadow dx="0" dy="2.5" stdDeviation="1.8" flood-color="#020617" flood-opacity="0.42" />
      </filter>
    `,
    bodyMarkup: `
      <g transform="scale(2)">
        <ellipse cx="32" cy="57" rx="20" ry="3.5" fill="url(#cylindrical-projection-beveled-25d-shadow)" />
        <rect x="8" y="13" width="48" height="42" rx="10" fill="url(#cylindrical-projection-beveled-25d-slab-rim)" />
        <rect x="8" y="9" width="48" height="42" rx="10" fill="url(#cylindrical-projection-beveled-25d-charcoal-front)" stroke="#64748B" stroke-opacity="0.35" stroke-width="1" />
        <path d="M18 10 H46" stroke="#FFFFFF" stroke-opacity="0.3" stroke-width="1.2" stroke-linecap="round" />
        <path d="M22 20 V41 C22 44 26.5 46 32 46 C37.5 46 42 44 42 41 V20 Z" fill="url(#cylindrical-projection-beveled-25d-ivory-side)" />
        <ellipse cx="32" cy="20" rx="10" ry="4" fill="url(#cylindrical-projection-beveled-25d-ivory-top)" />
        <path d="M18 26 C18 29 24.3 31 32 31 C39.7 31 46 29 46 26 V34 C46 37 39.7 39 32 39 C24.3 39 18 37 18 34 Z" fill="url(#cylindrical-projection-beveled-25d-amber-top)" filter="url(#cylindrical-projection-beveled-25d-drop)" />
        <path d="M32 31 V39" stroke="#1E293B" stroke-width="1.5" stroke-dasharray="2 1.5" />
      </g>
    `,
  },
  {
    id: 'cylindrical-projection-tactile-3d',
    name: 'Cylindrical Map',
    category: 'uv',
    styleVariant: 'Tactile 3D Clay',
    sourceSize: 64,
    defsMarkup: `
      <radialGradient id="cylindrical-projection-tactile-3d-shadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#05070B" stop-opacity="0.48" />
        <stop offset="65%" stop-color="#05070B" stop-opacity="0.18" />
        <stop offset="100%" stop-color="#05070B" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="cylindrical-projection-tactile-3d-charcoal-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#5B6373" />
        <stop offset="100%" stop-color="#393F4A" />
      </linearGradient>
      <linearGradient id="cylindrical-projection-tactile-3d-charcoal-front" x1="0%" y1="0%" x2="15%" y2="100%">
        <stop offset="0%" stop-color="#434A57" />
        <stop offset="55%" stop-color="#2D323C" />
        <stop offset="100%" stop-color="#1E222A" />
      </linearGradient>
      <linearGradient id="cylindrical-projection-tactile-3d-sky-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#BAE6FD" />
        <stop offset="45%" stop-color="#38BDF8" />
        <stop offset="100%" stop-color="#0284C7" />
      </linearGradient>
      <filter id="cylindrical-projection-tactile-3d-drop" x="-20%" y="-20%" width="140%" height="145%">
        <feDropShadow dx="0" dy="2.5" stdDeviation="1.8" flood-color="#020617" flood-opacity="0.42" />
      </filter>
    `,
    bodyMarkup: `
      <g transform="scale(2)">
        <ellipse cx="32" cy="56" rx="19" ry="4" fill="url(#cylindrical-projection-tactile-3d-shadow)" />
        <g filter="url(#cylindrical-projection-tactile-3d-drop)">
          <path d="M19 20 V45 C19 49.5 24.8 53 32 53 C39.2 53 45 49.5 45 45 V20 Z" fill="url(#cylindrical-projection-tactile-3d-charcoal-front)" />
          <ellipse cx="32" cy="20" rx="13" ry="5.5" fill="url(#cylindrical-projection-tactile-3d-charcoal-top)" stroke="#94A3B8" stroke-opacity="0.4" stroke-width="0.9" />
          <path d="M16 26 C16 30.8 23.2 34 32 34 C40.8 34 48 30.8 48 26 V39 C48 43.8 40.8 47 32 47 C23.2 47 16 43.8 16 39 Z" fill="url(#cylindrical-projection-tactile-3d-sky-top)" fill-opacity="0.88" stroke="#E0F2FE" stroke-opacity="0.55" stroke-width="0.8" />
          <path d="M32 34 V47" stroke="#FDE047" stroke-width="2" stroke-linecap="round" />
          <path d="M48 31 H55 M52.5 28.5 L55.5 31 L52.5 33.5" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </g>
      </g>
    `,
  },
  {
    id: 'box-triplanar-map-glass-wireframe',
    name: 'Box / Triplanar Map',
    category: 'uv',
    styleVariant: 'Volumetric Glass',
    sourceSize: 64,
    defsMarkup: `
      <linearGradient id="box-triplanar-map-glass-wireframe-glass-slab" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#293242" stop-opacity="0.92" />
        <stop offset="100%" stop-color="#111620" stop-opacity="0.96" />
      </linearGradient>
    `,
    bodyMarkup: `
      <g transform="scale(2)">
        <path d="M32 8 L53 19 V43 L32 54 L11 43 V19 Z" fill="url(#box-triplanar-map-glass-wireframe-glass-slab)" stroke="#38BDF8" stroke-opacity="0.45" stroke-width="1.1" stroke-dasharray="3 2" />
        <path d="M32 16 L45 22.5 L32 29 L19 22.5 Z" fill="#F59E0B" fill-opacity="0.28" stroke="#F59E0B" stroke-width="1.3" />
        <path d="M19 22.5 L32 29 V43 L19 36.5 Z" fill="#38BDF8" fill-opacity="0.24" stroke="#38BDF8" stroke-width="1.3" />
        <path d="M32 29 L45 22.5 V36.5 L32 43 Z" fill="#94A3B8" fill-opacity="0.2" stroke="#94A3B8" stroke-width="1.3" />
        <circle cx="32" cy="8" r="1.8" fill="#38BDF8" />
        <circle cx="53" cy="19" r="1.8" fill="#38BDF8" />
        <circle cx="11" cy="19" r="1.8" fill="#38BDF8" />
      </g>
    `,
  },
  {
    id: 'uv-island-shell-glass-wireframe',
    name: 'UV Island / Shell',
    category: 'uv',
    styleVariant: 'Volumetric Glass',
    sourceSize: 64,
    defsMarkup: `
      <linearGradient id="uv-island-shell-glass-wireframe-glass-slab" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#293242" stop-opacity="0.92" />
        <stop offset="100%" stop-color="#111620" stop-opacity="0.96" />
      </linearGradient>
      <filter id="uv-island-shell-glass-wireframe-soft-glow" x="-25%" y="-25%" width="150%" height="150%">
        <feDropShadow dx="0" dy="0" stdDeviation="1.6" flood-color="#38BDF8" flood-opacity="0.55" />
      </filter>
      <filter id="uv-island-shell-glass-wireframe-amber-glow" x="-25%" y="-25%" width="150%" height="150%">
        <feDropShadow dx="0" dy="0" stdDeviation="1.6" flood-color="#F59E0B" flood-opacity="0.6" />
      </filter>
    `,
    bodyMarkup: `
      <g transform="scale(2)">
        <rect x="10" y="10" width="44" height="44" rx="6" fill="url(#uv-island-shell-glass-wireframe-glass-slab)" stroke="#475569" stroke-width="1.2" />
        <path d="M10 25 H54 M10 39 H54 M25 10 V54 M39 10 V54" stroke="#334155" stroke-width="0.9" />
        <g filter="url(#uv-island-shell-glass-wireframe-amber-glow)">
          <path d="M15 15 H31 L27 31 H15 Z" fill="#F59E0B" fill-opacity="0.25" stroke="#F59E0B" stroke-width="1.5" stroke-linejoin="round" />
        </g>
        <g filter="url(#uv-island-shell-glass-wireframe-soft-glow)">
          <path d="M34 22 H48 V46 H31 Z" fill="#38BDF8" fill-opacity="0.22" stroke="#38BDF8" stroke-width="1.5" stroke-linejoin="round" />
        </g>
        <circle cx="15" cy="15" r="1.6" fill="#FDE047" />
        <circle cx="31" cy="15" r="1.6" fill="#FDE047" />
        <circle cx="48" cy="22" r="1.6" fill="#7DD3FC" />
      </g>
    `,
  },
  {
    id: 'stitch-weld-beveled-25d',
    name: 'Stitch & Weld',
    category: 'uv',
    styleVariant: '2.5D Bevel',
    sourceSize: 64,
    defsMarkup: `
      <radialGradient id="stitch-weld-beveled-25d-shadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#05070B" stop-opacity="0.48" />
        <stop offset="65%" stop-color="#05070B" stop-opacity="0.18" />
        <stop offset="100%" stop-color="#05070B" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="stitch-weld-beveled-25d-charcoal-front" x1="0%" y1="0%" x2="15%" y2="100%">
        <stop offset="0%" stop-color="#434A57" />
        <stop offset="55%" stop-color="#2D323C" />
        <stop offset="100%" stop-color="#1E222A" />
      </linearGradient>
      <linearGradient id="stitch-weld-beveled-25d-amber-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FDE047" />
        <stop offset="45%" stop-color="#F59E0B" />
        <stop offset="100%" stop-color="#D97706" />
      </linearGradient>
      <linearGradient id="stitch-weld-beveled-25d-sky-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#BAE6FD" />
        <stop offset="45%" stop-color="#38BDF8" />
        <stop offset="100%" stop-color="#0284C7" />
      </linearGradient>
      <linearGradient id="stitch-weld-beveled-25d-ivory-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="100%" stop-color="#DCE3EC" />
      </linearGradient>
      <linearGradient id="stitch-weld-beveled-25d-slab-rim" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#272C36" />
        <stop offset="100%" stop-color="#14171D" />
      </linearGradient>
    `,
    bodyMarkup: `
      <g transform="scale(2)">
        <ellipse cx="32" cy="57" rx="20" ry="3.5" fill="url(#stitch-weld-beveled-25d-shadow)" />
        <rect x="8" y="13" width="48" height="42" rx="10" fill="url(#stitch-weld-beveled-25d-slab-rim)" />
        <rect x="8" y="9" width="48" height="42" rx="10" fill="url(#stitch-weld-beveled-25d-charcoal-front)" stroke="#64748B" stroke-opacity="0.35" stroke-width="1" />
        <path d="M18 10 H46" stroke="#FFFFFF" stroke-opacity="0.3" stroke-width="1.2" stroke-linecap="round" />
        <rect x="14" y="17" width="15" height="26" rx="3" fill="url(#stitch-weld-beveled-25d-sky-top)" />
        <rect x="35" y="17" width="15" height="26" rx="3" fill="url(#stitch-weld-beveled-25d-ivory-top)" />
        <rect x="25" y="21" width="14" height="3.5" rx="1.75" fill="url(#stitch-weld-beveled-25d-amber-top)" />
        <rect x="25" y="28.5" width="14" height="3.5" rx="1.75" fill="url(#stitch-weld-beveled-25d-amber-top)" />
        <rect x="25" y="36" width="14" height="3.5" rx="1.75" fill="url(#stitch-weld-beveled-25d-amber-top)" />
      </g>
    `,
  },
  {
    id: 'pack-islands-glass-wireframe',
    name: 'Pack Islands',
    category: 'uv',
    styleVariant: 'Volumetric Glass',
    sourceSize: 64,
    defsMarkup: `
      <linearGradient id="pack-islands-glass-wireframe-glass-slab" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#293242" stop-opacity="0.92" />
        <stop offset="100%" stop-color="#111620" stop-opacity="0.96" />
      </linearGradient>
    `,
    bodyMarkup: `
      <g transform="scale(2)">
        <rect x="10" y="10" width="44" height="44" rx="5" fill="url(#pack-islands-glass-wireframe-glass-slab)" stroke="#64748B" stroke-width="1.2" />
        <rect x="14" y="14" width="17" height="16" rx="2" fill="#F59E0B" fill-opacity="0.28" stroke="#F59E0B" stroke-width="1.4" />
        <rect x="34" y="14" width="16" height="10" rx="2" fill="#38BDF8" fill-opacity="0.25" stroke="#38BDF8" stroke-width="1.4" />
        <rect x="34" y="27" width="16" height="23" rx="2" fill="#94A3B8" fill-opacity="0.2" stroke="#CBD5E1" stroke-width="1.3" />
        <rect x="14" y="33" width="17" height="17" rx="2" fill="#22C55E" fill-opacity="0.22" stroke="#4ADE80" stroke-width="1.3" />
      </g>
    `,
  },
  {
    id: 'split-cut-uv-glass-wireframe',
    name: 'Split / Cut UV',
    category: 'uv',
    styleVariant: 'Volumetric Glass',
    sourceSize: 64,
    defsMarkup: `
      <linearGradient id="split-cut-uv-glass-wireframe-glass-slab" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#293242" stop-opacity="0.92" />
        <stop offset="100%" stop-color="#111620" stop-opacity="0.96" />
      </linearGradient>
      <filter id="split-cut-uv-glass-wireframe-amber-glow" x="-25%" y="-25%" width="150%" height="150%">
        <feDropShadow dx="0" dy="0" stdDeviation="1.6" flood-color="#F59E0B" flood-opacity="0.6" />
      </filter>
    `,
    bodyMarkup: `
      <g transform="scale(2)">
        <path d="M12 14 H37 L22 44 H12 Z" fill="url(#split-cut-uv-glass-wireframe-glass-slab)" stroke="#94A3B8" stroke-width="1.3" />
        <path d="M42 18 H52 V48 H27 Z" fill="#38BDF8" fill-opacity="0.2" stroke="#38BDF8" stroke-width="1.3" />
        <g filter="url(#split-cut-uv-glass-wireframe-amber-glow)">
          <path d="M43 10 L21 52" stroke="#F59E0B" stroke-width="2.2" stroke-linecap="round" stroke-dasharray="4 3" />
        </g>
      </g>
    `,
  },
  {
    id: 'uv-component-select-glass-wireframe',
    name: 'UV Vertex / Edge / Face',
    category: 'uv',
    styleVariant: 'Volumetric Glass',
    sourceSize: 64,
    defsMarkup: `
      <linearGradient id="uv-component-select-glass-wireframe-glass-slab" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#293242" stop-opacity="0.92" />
        <stop offset="100%" stop-color="#111620" stop-opacity="0.96" />
      </linearGradient>
      <filter id="uv-component-select-glass-wireframe-amber-glow" x="-25%" y="-25%" width="150%" height="150%">
        <feDropShadow dx="0" dy="0" stdDeviation="1.6" flood-color="#F59E0B" flood-opacity="0.6" />
      </filter>
    `,
    bodyMarkup: `
      <g transform="scale(2)">
        <path d="M14 20 H44 V46 H14 Z" fill="url(#uv-component-select-glass-wireframe-glass-slab)" stroke="#475569" stroke-width="1.1" />
        <path d="M20 14 H50 V40 H20 Z" fill="#38BDF8" fill-opacity="0.16" stroke="#38BDF8" stroke-width="1.4" />
        <path d="M20 14 H50" stroke="#F59E0B" stroke-width="2.5" filter="url(#uv-component-select-glass-wireframe-amber-glow)" />
        <circle cx="20" cy="14" r="3.2" fill="#FDE047" />
        <circle cx="50" cy="14" r="3.2" fill="#FDE047" />
        <circle cx="20" cy="40" r="2.2" fill="#7DD3FC" />
        <circle cx="50" cy="40" r="2.2" fill="#7DD3FC" />
      </g>
    `,
  },
  {
    id: 'uv-overlap-detect-tactile-3d',
    name: 'UV Overlap Alert',
    category: 'uv',
    styleVariant: 'Tactile 3D Clay',
    sourceSize: 64,
    defsMarkup: `
      <radialGradient id="uv-overlap-detect-tactile-3d-shadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#05070B" stop-opacity="0.48" />
        <stop offset="65%" stop-color="#05070B" stop-opacity="0.18" />
        <stop offset="100%" stop-color="#05070B" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="uv-overlap-detect-tactile-3d-charcoal-front" x1="0%" y1="0%" x2="15%" y2="100%">
        <stop offset="0%" stop-color="#434A57" />
        <stop offset="55%" stop-color="#2D323C" />
        <stop offset="100%" stop-color="#1E222A" />
      </linearGradient>
      <linearGradient id="uv-overlap-detect-tactile-3d-charcoal-side" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#262B34" />
        <stop offset="100%" stop-color="#15181E" />
      </linearGradient>
      <linearGradient id="uv-overlap-detect-tactile-3d-sky-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#BAE6FD" />
        <stop offset="45%" stop-color="#38BDF8" />
        <stop offset="100%" stop-color="#0284C7" />
      </linearGradient>
      <linearGradient id="uv-overlap-detect-tactile-3d-sky-side" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0284C7" />
        <stop offset="100%" stop-color="#075985" />
      </linearGradient>
      <linearGradient id="uv-overlap-detect-tactile-3d-crimson-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FDA4AF" />
        <stop offset="50%" stop-color="#F43F5E" />
        <stop offset="100%" stop-color="#BE123C" />
      </linearGradient>
      <filter id="uv-overlap-detect-tactile-3d-drop" x="-20%" y="-20%" width="140%" height="145%">
        <feDropShadow dx="0" dy="2.5" stdDeviation="1.8" flood-color="#020617" flood-opacity="0.42" />
      </filter>
    `,
    bodyMarkup: `
      <g transform="scale(2)">
        <ellipse cx="32" cy="56" rx="21" ry="4" fill="url(#uv-overlap-detect-tactile-3d-shadow)" />
        <g filter="url(#uv-overlap-detect-tactile-3d-drop)">
          <rect x="11" y="14" width="27" height="27" rx="5" fill="url(#uv-overlap-detect-tactile-3d-sky-top)" />
          <rect x="11" y="38" width="27" height="3.5" rx="1.7" fill="url(#uv-overlap-detect-tactile-3d-sky-side)" />
          <rect x="26" y="23" width="27" height="27" rx="5" fill="url(#uv-overlap-detect-tactile-3d-charcoal-front)" stroke="#64748B" stroke-opacity="0.4" stroke-width="0.9" />
          <rect x="26" y="48" width="27" height="3.5" rx="1.7" fill="url(#uv-overlap-detect-tactile-3d-charcoal-side)" />
          <rect x="26" y="23" width="12" height="18" rx="2.5" fill="url(#uv-overlap-detect-tactile-3d-crimson-top)" />
          <path d="M32 28 V33 M32 36 V36.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
        </g>
      </g>
    `,
  },
  {
    id: 'vertex-color-heatmap-tactile-3d',
    name: 'Vertex Color Mask',
    category: 'uv',
    styleVariant: 'Tactile 3D Clay',
    sourceSize: 64,
    defsMarkup: `
      <radialGradient id="vertex-color-heatmap-tactile-3d-shadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#05070B" stop-opacity="0.48" />
        <stop offset="65%" stop-color="#05070B" stop-opacity="0.18" />
        <stop offset="100%" stop-color="#05070B" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="vertex-color-heatmap-tactile-3d-charcoal-side" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#262B34" />
        <stop offset="100%" stop-color="#15181E" />
      </linearGradient>
      <linearGradient id="vertex-color-heatmap-tactile-3d-amber-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FDE047" />
        <stop offset="45%" stop-color="#F59E0B" />
        <stop offset="100%" stop-color="#D97706" />
      </linearGradient>
      <linearGradient id="vertex-color-heatmap-tactile-3d-sky-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#BAE6FD" />
        <stop offset="45%" stop-color="#38BDF8" />
        <stop offset="100%" stop-color="#0284C7" />
      </linearGradient>
      <linearGradient id="vertex-color-heatmap-tactile-3d-crimson-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FDA4AF" />
        <stop offset="50%" stop-color="#F43F5E" />
        <stop offset="100%" stop-color="#BE123C" />
      </linearGradient>
      <linearGradient id="vertex-color-heatmap-tactile-3d-emerald-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#86EFAC" />
        <stop offset="50%" stop-color="#22C55E" />
        <stop offset="100%" stop-color="#15803D" />
      </linearGradient>
      <linearGradient id="vertex-color-heatmap-tactile-3d-violet-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#DDD6FE" />
        <stop offset="50%" stop-color="#A78BFA" />
        <stop offset="100%" stop-color="#7C3AED" />
      </linearGradient>
      <linearGradient id="vertex-color-heatmap-tactile-3d-heat" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#0EA5E9" />
        <stop offset="30%" stop-color="#22C55E" />
        <stop offset="60%" stop-color="#FACC15" />
        <stop offset="82%" stop-color="#F97316" />
        <stop offset="100%" stop-color="#EF4444" />
      </linearGradient>
      <filter id="vertex-color-heatmap-tactile-3d-drop" x="-20%" y="-20%" width="140%" height="145%">
        <feDropShadow dx="0" dy="2.5" stdDeviation="1.8" flood-color="#020617" flood-opacity="0.42" />
      </filter>
    `,
    bodyMarkup: `
      <g transform="scale(2)">
        <ellipse cx="32" cy="56" rx="20" ry="4" fill="url(#vertex-color-heatmap-tactile-3d-shadow)" />
        <g filter="url(#vertex-color-heatmap-tactile-3d-drop)">
          <path d="M32 11 L52 43 L32 51 Z" fill="url(#vertex-color-heatmap-tactile-3d-charcoal-side)" />
          <path d="M32 11 L12 43 L32 51 Z" fill="url(#vertex-color-heatmap-tactile-3d-heat)" />
          <path d="M32 11 L52 43 L32 51 Z" fill="url(#vertex-color-heatmap-tactile-3d-violet-top)" fill-opacity="0.72" />
          <circle cx="32" cy="11" r="4.2" fill="url(#vertex-color-heatmap-tactile-3d-crimson-top)" />
          <circle cx="12" cy="43" r="4.2" fill="url(#vertex-color-heatmap-tactile-3d-sky-top)" />
          <circle cx="52" cy="43" r="4.2" fill="url(#vertex-color-heatmap-tactile-3d-emerald-top)" />
          <circle cx="32" cy="51" r="3.4" fill="url(#vertex-color-heatmap-tactile-3d-amber-top)" />
        </g>
      </g>
    `,
  },
  {
    id: 'vertex-color-heatmap-beveled-25d',
    name: 'Vertex Color Mask',
    category: 'uv',
    styleVariant: '2.5D Bevel',
    sourceSize: 64,
    defsMarkup: `
      <radialGradient id="vertex-color-heatmap-beveled-25d-shadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#05070B" stop-opacity="0.48" />
        <stop offset="65%" stop-color="#05070B" stop-opacity="0.18" />
        <stop offset="100%" stop-color="#05070B" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="vertex-color-heatmap-beveled-25d-charcoal-front" x1="0%" y1="0%" x2="15%" y2="100%">
        <stop offset="0%" stop-color="#434A57" />
        <stop offset="55%" stop-color="#2D323C" />
        <stop offset="100%" stop-color="#1E222A" />
      </linearGradient>
      <linearGradient id="vertex-color-heatmap-beveled-25d-heat" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#0EA5E9" />
        <stop offset="30%" stop-color="#22C55E" />
        <stop offset="60%" stop-color="#FACC15" />
        <stop offset="82%" stop-color="#F97316" />
        <stop offset="100%" stop-color="#EF4444" />
      </linearGradient>
      <linearGradient id="vertex-color-heatmap-beveled-25d-slab-rim" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#272C36" />
        <stop offset="100%" stop-color="#14171D" />
      </linearGradient>
      <filter id="vertex-color-heatmap-beveled-25d-drop" x="-20%" y="-20%" width="140%" height="145%">
        <feDropShadow dx="0" dy="2.5" stdDeviation="1.8" flood-color="#020617" flood-opacity="0.42" />
      </filter>
    `,
    bodyMarkup: `
      <g transform="scale(2)">
        <ellipse cx="32" cy="57" rx="20" ry="3.5" fill="url(#vertex-color-heatmap-beveled-25d-shadow)" />
        <rect x="8" y="13" width="48" height="42" rx="10" fill="url(#vertex-color-heatmap-beveled-25d-slab-rim)" />
        <rect x="8" y="9" width="48" height="42" rx="10" fill="url(#vertex-color-heatmap-beveled-25d-charcoal-front)" stroke="#64748B" stroke-opacity="0.35" stroke-width="1" />
        <path d="M18 10 H46" stroke="#FFFFFF" stroke-opacity="0.3" stroke-width="1.2" stroke-linecap="round" />
        <path d="M32 15 L48 43 H16 Z" fill="url(#vertex-color-heatmap-beveled-25d-heat)" filter="url(#vertex-color-heatmap-beveled-25d-drop)" />
        <circle cx="32" cy="15" r="3.2" fill="#F43F5E" />
        <circle cx="16" cy="43" r="3.2" fill="#38BDF8" />
        <circle cx="48" cy="43" r="3.2" fill="#4ADE80" />
      </g>
    `,
  },
  {
    id: 'vertex-color-heatmap-glass-wireframe',
    name: 'Vertex Color Mask',
    category: 'uv',
    styleVariant: 'Volumetric Glass',
    sourceSize: 64,
    defsMarkup: `
      <linearGradient id="vertex-color-heatmap-glass-wireframe-heat" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#0EA5E9" />
        <stop offset="30%" stop-color="#22C55E" />
        <stop offset="60%" stop-color="#FACC15" />
        <stop offset="82%" stop-color="#F97316" />
        <stop offset="100%" stop-color="#EF4444" />
      </linearGradient>
    `,
    bodyMarkup: `
      <g transform="scale(2)">
        <path d="M32 12 L52 46 H12 Z" fill="url(#vertex-color-heatmap-glass-wireframe-heat)" fill-opacity="0.28" stroke="#CBD5E1" stroke-width="1.3" />
        <path d="M32 12 V46 M22 29 H42" stroke="#FFFFFF" stroke-opacity="0.4" stroke-width="1" />
        <circle cx="32" cy="12" r="3.5" fill="#F43F5E" />
        <circle cx="12" cy="46" r="3.5" fill="#38BDF8" />
        <circle cx="52" cy="46" r="3.5" fill="#4ADE80" />
      </g>
    `,
  },
  {
    id: 'shader-overdraw-depth-tactile-3d',
    name: 'Overdraw / Depth Stack',
    category: 'uv',
    styleVariant: 'Tactile 3D Clay',
    sourceSize: 64,
    defsMarkup: `
      <radialGradient id="shader-overdraw-depth-tactile-3d-shadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#05070B" stop-opacity="0.48" />
        <stop offset="65%" stop-color="#05070B" stop-opacity="0.18" />
        <stop offset="100%" stop-color="#05070B" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="shader-overdraw-depth-tactile-3d-amber-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FDE047" />
        <stop offset="45%" stop-color="#F59E0B" />
        <stop offset="100%" stop-color="#D97706" />
      </linearGradient>
      <linearGradient id="shader-overdraw-depth-tactile-3d-sky-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#BAE6FD" />
        <stop offset="45%" stop-color="#38BDF8" />
        <stop offset="100%" stop-color="#0284C7" />
      </linearGradient>
      <linearGradient id="shader-overdraw-depth-tactile-3d-sky-side" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0284C7" />
        <stop offset="100%" stop-color="#075985" />
      </linearGradient>
      <linearGradient id="shader-overdraw-depth-tactile-3d-crimson-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FDA4AF" />
        <stop offset="50%" stop-color="#F43F5E" />
        <stop offset="100%" stop-color="#BE123C" />
      </linearGradient>
      <filter id="shader-overdraw-depth-tactile-3d-drop" x="-20%" y="-20%" width="140%" height="145%">
        <feDropShadow dx="0" dy="2.5" stdDeviation="1.8" flood-color="#020617" flood-opacity="0.42" />
      </filter>
    `,
    bodyMarkup: `
      <g transform="scale(2)">
        <ellipse cx="32" cy="56" rx="21" ry="4" fill="url(#shader-overdraw-depth-tactile-3d-shadow)" />
        <g filter="url(#shader-overdraw-depth-tactile-3d-drop)">
          <path d="M12 41 L32 31 L52 41 L32 51 Z" fill="url(#shader-overdraw-depth-tactile-3d-sky-side)" fill-opacity="0.85" />
          <path d="M12 32 L32 22 L52 32 L32 42 Z" fill="url(#shader-overdraw-depth-tactile-3d-sky-top)" fill-opacity="0.82" />
          <path d="M12 23 L32 13 L52 23 L32 33 Z" fill="url(#shader-overdraw-depth-tactile-3d-amber-top)" fill-opacity="0.88" />
          <path d="M24 27 L32 23 L40 27 L32 31 Z" fill="url(#shader-overdraw-depth-tactile-3d-crimson-top)" />
          <path d="M12 23 L32 33 L52 23" stroke="#FEF9C3" stroke-opacity="0.6" stroke-width="1" />
        </g>
      </g>
    `,
  },
  {
    id: 'unpin-release-beveled-25d',
    name: 'Unpin / Release UV',
    category: 'uv',
    styleVariant: '2.5D Bevel',
    sourceSize: 64,
    defsMarkup: `
      <radialGradient id="unpin-release-beveled-25d-shadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#05070B" stop-opacity="0.48" />
        <stop offset="65%" stop-color="#05070B" stop-opacity="0.18" />
        <stop offset="100%" stop-color="#05070B" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="unpin-release-beveled-25d-charcoal-front" x1="0%" y1="0%" x2="15%" y2="100%">
        <stop offset="0%" stop-color="#434A57" />
        <stop offset="55%" stop-color="#2D323C" />
        <stop offset="100%" stop-color="#1E222A" />
      </linearGradient>
      <linearGradient id="unpin-release-beveled-25d-sky-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#BAE6FD" />
        <stop offset="45%" stop-color="#38BDF8" />
        <stop offset="100%" stop-color="#0284C7" />
      </linearGradient>
      <linearGradient id="unpin-release-beveled-25d-sky-side" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0284C7" />
        <stop offset="100%" stop-color="#075985" />
      </linearGradient>
      <linearGradient id="unpin-release-beveled-25d-slab-rim" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#272C36" />
        <stop offset="100%" stop-color="#14171D" />
      </linearGradient>
    `,
    bodyMarkup: `
      <g transform="scale(2)">
        <ellipse cx="32" cy="57" rx="20" ry="3.5" fill="url(#unpin-release-beveled-25d-shadow)" />
        <rect x="8" y="13" width="48" height="42" rx="10" fill="url(#unpin-release-beveled-25d-slab-rim)" />
        <rect x="8" y="9" width="48" height="42" rx="10" fill="url(#unpin-release-beveled-25d-charcoal-front)" stroke="#64748B" stroke-opacity="0.35" stroke-width="1" />
        <path d="M18 10 H46" stroke="#FFFFFF" stroke-opacity="0.3" stroke-width="1.2" stroke-linecap="round" />
        <g transform="rotate(20 33 27)">
          <path d="M33 32 V41" stroke="#CBD5E1" stroke-width="2.4" stroke-linecap="round" />
          <rect x="24" y="27" width="18" height="5" rx="2.5" fill="url(#unpin-release-beveled-25d-sky-top)" />
          <path d="M27.5 18 H38.5 L36.5 27 H29.5 Z" fill="url(#unpin-release-beveled-25d-sky-side)" />
          <rect x="26" y="14" width="14" height="4.5" rx="2.2" fill="url(#unpin-release-beveled-25d-sky-top)" />
        </g>
        <path d="M18 39 L46 21" stroke="#F43F5E" stroke-width="2.2" stroke-linecap="round" />
      </g>
    `,
  },
  {
    id: 'uv-move-scale-gizmo-tactile-3d',
    name: 'UV 2D Planar Gizmo',
    category: 'uv',
    styleVariant: 'Tactile 3D Clay',
    sourceSize: 64,
    defsMarkup: `
      <radialGradient id="uv-move-scale-gizmo-tactile-3d-shadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#05070B" stop-opacity="0.48" />
        <stop offset="65%" stop-color="#05070B" stop-opacity="0.18" />
        <stop offset="100%" stop-color="#05070B" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="uv-move-scale-gizmo-tactile-3d-charcoal-front" x1="0%" y1="0%" x2="15%" y2="100%">
        <stop offset="0%" stop-color="#434A57" />
        <stop offset="55%" stop-color="#2D323C" />
        <stop offset="100%" stop-color="#1E222A" />
      </linearGradient>
      <linearGradient id="uv-move-scale-gizmo-tactile-3d-charcoal-side" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#262B34" />
        <stop offset="100%" stop-color="#15181E" />
      </linearGradient>
      <linearGradient id="uv-move-scale-gizmo-tactile-3d-amber-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FDE047" />
        <stop offset="45%" stop-color="#F59E0B" />
        <stop offset="100%" stop-color="#D97706" />
      </linearGradient>
      <linearGradient id="uv-move-scale-gizmo-tactile-3d-ivory-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="100%" stop-color="#DCE3EC" />
      </linearGradient>
      <linearGradient id="uv-move-scale-gizmo-tactile-3d-crimson-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FDA4AF" />
        <stop offset="50%" stop-color="#F43F5E" />
        <stop offset="100%" stop-color="#BE123C" />
      </linearGradient>
      <linearGradient id="uv-move-scale-gizmo-tactile-3d-emerald-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#86EFAC" />
        <stop offset="50%" stop-color="#22C55E" />
        <stop offset="100%" stop-color="#15803D" />
      </linearGradient>
      <filter id="uv-move-scale-gizmo-tactile-3d-drop" x="-20%" y="-20%" width="140%" height="145%">
        <feDropShadow dx="0" dy="2.5" stdDeviation="1.8" flood-color="#020617" flood-opacity="0.42" />
      </filter>
    `,
    bodyMarkup: `
      <g transform="scale(2)">
        <ellipse cx="32" cy="56" rx="20" ry="4" fill="url(#uv-move-scale-gizmo-tactile-3d-shadow)" />
        <g filter="url(#uv-move-scale-gizmo-tactile-3d-drop)">
          <rect x="13" y="15" width="36" height="34" rx="4" fill="url(#uv-move-scale-gizmo-tactile-3d-charcoal-front)" stroke="#38BDF8" stroke-width="1.6" />
          <rect x="13" y="47" width="36" height="3.5" rx="1.7" fill="url(#uv-move-scale-gizmo-tactile-3d-charcoal-side)" />
          <rect x="10" y="12" width="6.5" height="6.5" rx="1.5" fill="url(#uv-move-scale-gizmo-tactile-3d-ivory-top)" />
          <rect x="45.5" y="12" width="6.5" height="6.5" rx="1.5" fill="url(#uv-move-scale-gizmo-tactile-3d-ivory-top)" />
          <rect x="10" y="45.5" width="6.5" height="6.5" rx="1.5" fill="url(#uv-move-scale-gizmo-tactile-3d-ivory-top)" />
          <rect x="45.5" y="45.5" width="6.5" height="6.5" rx="1.5" fill="url(#uv-move-scale-gizmo-tactile-3d-ivory-top)" />
          <path d="M31 32 V21" stroke="url(#uv-move-scale-gizmo-tactile-3d-emerald-top)" stroke-width="3.2" stroke-linecap="round" />
          <path d="M27.5 23 L31 17.5 L34.5 23 Z" fill="url(#uv-move-scale-gizmo-tactile-3d-emerald-top)" />
          <path d="M31 32 H42" stroke="url(#uv-move-scale-gizmo-tactile-3d-crimson-top)" stroke-width="3.2" stroke-linecap="round" />
          <path d="M40 28.5 L45.5 32 L40 35.5 Z" fill="url(#uv-move-scale-gizmo-tactile-3d-crimson-top)" />
          <circle cx="31" cy="32" r="4" fill="url(#uv-move-scale-gizmo-tactile-3d-amber-top)" />
        </g>
      </g>
    `,
  },
];

export function renderStandaloneIconSvg(icon: UnifiedIconEntry): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128" fill="none" role="img" aria-label="${icon.name}">
  <defs>
    ${icon.defsMarkup.trim()}
  </defs>
  ${icon.bodyMarkup.trim()}
</svg>`;
}
