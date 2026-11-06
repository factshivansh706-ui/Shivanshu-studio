import type { ReactNode } from 'react';
import type { Palette, Project } from '../data/portfolio';

/**
 * Generated "key art" for thumbnails — layered gradients, light falloff and a motif.
 * No stock imagery: every card is art-directed from its palette.
 */
export function PosterBackdrop({ palette, children, className = '' }: { palette: Palette; children?: ReactNode; className?: string }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 90% at 85% 10%, ${palette.via} 0%, transparent 60%),
          radial-gradient(90% 80% at 0% 100%, ${palette.from} 0%, transparent 70%),
          linear-gradient(160deg, ${palette.from} 0%, ${palette.to} 100%)`,
      }}
    >
      <div
        aria-hidden
        className="absolute -right-1/4 -top-1/3 h-[140%] w-[70%] rotate-[18deg] opacity-40 blur-2xl"
        style={{ background: `linear-gradient(90deg, transparent, ${palette.accent}55, transparent)` }}
      />
      <div aria-hidden className="absolute inset-0 opacity-[0.18] [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_4px)]" />
      {children}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
    </div>
  );
}

/** Motif illustrations for each project, drawn in SVG from the palette — no stock imagery. */
export function ProjectArt({ project, className = '' }: { project: Project; className?: string }) {
  const a = project.palette.accent;
  return (
    <PosterBackdrop palette={project.palette} className={className}>
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <radialGradient id={`g-${project.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={a} stopOpacity="0.5" />
            <stop offset="100%" stopColor={a} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="290" cy="120" r="130" fill={`url(#g-${project.id})`} />

        {project.motif === 'wheel' && (
          <g fill="none" stroke={a} transform="translate(290 118)">
            <circle r="78" strokeWidth="3" strokeOpacity="0.9" />
            <circle r="62" strokeWidth="1" strokeOpacity="0.4" />
            <circle r="12" strokeWidth="2" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <line key={i} x1="12" x2="62" y1="0" y2="0" strokeWidth="1.5" strokeOpacity="0.55" transform={`rotate(${i * 45})`} />
            ))}
            {[0, 1, 2, 3].map((i) => (
              <line key={`s${i}`} x1={-190 + i * 14} x2={-96 - i * 8} y1={-30 + i * 22} y2={-30 + i * 22} strokeWidth="2" strokeLinecap="round" strokeOpacity={0.5 - i * 0.1} />
            ))}
          </g>
        )}

        {project.motif === 'reel' && (
          <g fill="none" stroke={a}>
            <rect x="248" y="34" width="96" height="170" rx="16" strokeWidth="2.5" strokeOpacity="0.9" />
            <rect x="256" y="46" width="80" height="146" rx="8" strokeOpacity="0.3" />
            <path d="M282 100 l22 14 l-22 14 z" fill={a} fillOpacity="0.85" stroke="none" />
            <line x1="264" x2="326" y1="160" y2="160" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.7" />
            <line x1="274" x2="316" y1="174" y2="174" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.4" />
            <circle cx="262" cy="58" r="3.5" fill={a} stroke="none" />
          </g>
        )}

        {project.motif === 'cafe' && (
          <g fill="none" stroke={a} strokeLinecap="round">
            <path d="M230 120 h110 v26 c0 28 -22 46 -55 46 s-55 -18 -55 -46 z" strokeWidth="2.5" strokeOpacity="0.9" />
            <path d="M340 130 c24 0 30 30 4 38" strokeWidth="2.5" strokeOpacity="0.8" />
            <path d="M220 206 h130" strokeWidth="2" strokeOpacity="0.5" />
            {[0, 1, 2].map((i) => (
              <path key={i} d={`M${262 + i * 22} 104 c-10 -14 10 -22 0 -38`} strokeWidth="2" strokeOpacity={0.7 - i * 0.15} />
            ))}
          </g>
        )}

        {project.motif === 'doc' && (
          <g fill="none" stroke={a}>
            <rect x="196" y="48" width="170" height="104" rx="6" strokeWidth="2.5" strokeOpacity="0.9" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <g key={i}>
                <rect x={202 + i * 21} y="54" width="10" height="7" rx="1.5" strokeOpacity="0.6" />
                <rect x={202 + i * 21} y="139" width="10" height="7" rx="1.5" strokeOpacity="0.6" />
              </g>
            ))}
            <rect x="214" y="72" width="134" height="56" rx="3" strokeOpacity="0.35" />
            <path d="M268 90 l22 10 l-22 10 z" fill={a} fillOpacity="0.8" stroke="none" />
            <line x1="196" x2="366" y1="190" y2="190" strokeOpacity="0.5" />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <line key={i} x1={196 + i * 17} x2={196 + i * 17} y1="190" y2={i % 5 === 0 ? 204 : 198} strokeOpacity="0.5" />
            ))}
            <path d="M262 180 v36" strokeWidth="2.5" />
          </g>
        )}
      </svg>
    </PosterBackdrop>
  );
}

/** SHIVANSHU brand mark: a viewfinder frame around a play triangle, with the wordmark. */
export function BrandMark({ className = '', wordmark = true }: { className?: string; wordmark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 32 32" className="h-[1.15em] w-[1.15em]" aria-hidden>
        <path d="M3 11V4a1 1 0 0 1 1-1h7M21 3h7a1 1 0 0 1 1 1v7M29 21v7a1 1 0 0 1-1 1h-7M11 29H4a1 1 0 0 1-1-1v-7" fill="none" stroke="#f0a93a" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M13 10.5 22 16l-9 5.5z" fill="#ffc766" />
      </svg>
      {wordmark && <span className="font-display text-[0.9em] leading-none tracking-[0.22em] text-bone">SHIVANSHU</span>}
    </span>
  );
}
