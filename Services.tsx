import { motion } from 'framer-motion';
import { services, type ServiceIconId } from '../data/portfolio';
import { EASE, SectionHeading, Tilt } from './fx';

function Icon({ id }: { id: ServiceIconId }) {
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
      {id === 'reels' && (
        <g {...p}>
          <rect x="9" y="3" width="14" height="26" rx="3" />
          <path d="M14 12.5 19 16l-5 3.5z" />
          <path d="M13 24h6" />
        </g>
      )}
      {id === 'documentary' && (
        <g {...p}>
          <rect x="3" y="7" width="26" height="18" rx="2" />
          <path d="M8 7v18M24 7v18M3 13h5M3 19h5M24 13h5M24 19h5" />
        </g>
      )}
      {id === 'cafe' && (
        <g {...p}>
          <path d="M6 12h17v6a7 7 0 0 1-7 7h-3a7 7 0 0 1-7-7z" />
          <path d="M23 14h2a3 3 0 0 1 0 6h-2M11 4c-1 1.5 1 2.5 0 4M16 4c-1 1.5 1 2.5 0 4" />
        </g>
      )}
      {id === 'content' && (
        <g {...p}>
          <rect x="4" y="4" width="10" height="10" rx="2" />
          <rect x="18" y="4" width="10" height="10" rx="2" />
          <rect x="4" y="18" width="10" height="10" rx="2" />
          <path d="M18 23h10M23 18v10" />
        </g>
      )}
      {id === 'captions' && (
        <g {...p}>
          <rect x="3" y="6" width="26" height="18" rx="3" />
          <path d="M8 13h7M18 13h6M8 18h4M15 18h9M11 28l5-4" />
        </g>
      )}
      {id === 'management' && (
        <g {...p}>
          <rect x="4" y="6" width="24" height="22" rx="3" />
          <path d="M4 12h24M10 3v5M22 3v5M10 18h4M18 18h4M10 23h4" />
        </g>
      )}
    </svg>
  );
}

export default function Services() {
  return (
    <>
      <SectionHeading
        kicker="What I Do"
        title="Services"
        aside={<p className="max-w-xs text-sm text-mist">Six services, one standard: clear stories, clean finishing and content built for where it will be watched.</p>}
      />
      <div className="gutter grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <motion.article
            key={s.id}
            initial={{ opacity: 0, y: 36, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-6% 0px' }}
            transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: EASE }}
          >
            <Tilt max={5} className="group h-full rounded-2xl">
              <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-2 p-6 transition duration-500 group-hover:border-gold/50 sm:p-7">
                <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(closest-side,rgba(240,169,58,0.22),transparent)] opacity-0 transition duration-700 group-hover:opacity-100" />
                <div className="flex items-start justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-gold-2 transition duration-500 group-hover:border-gold/50 group-hover:bg-gold/10">
                    <Icon id={s.id} />
                  </span>
                  <span className="mono text-xs text-smoke">0{i + 1}</span>
                </div>
                <h3 className="mt-6 font-display text-[1.9rem] leading-[0.95] tracking-wide text-bone">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{s.blurb}</p>
                <ul className="mt-auto space-y-2 pt-6">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-3 text-[13px] text-bone/85">
                      <span className="h-px w-4 bg-gold" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </Tilt>
          </motion.article>
        ))}
      </div>
    </>
  );
}
