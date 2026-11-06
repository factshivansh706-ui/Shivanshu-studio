import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { process } from '../data/portfolio';
import { EASE, SectionHeading } from './fx';

/** Creative process as a vertical timeline: the gold line draws itself as you scroll, each step is a "take". */
export default function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.55'] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 });

  return (
    <>
      <SectionHeading
        kicker="How I Work"
        title="Creative Process"
        aside={<p className="max-w-xs text-sm text-mist">Five steps from first message to published content — so you always know what happens next.</p>}
      />
      <div className="gutter">
        <ol ref={ref} className="relative mx-auto max-w-4xl">
          <span aria-hidden className="absolute bottom-2 left-[19px] top-2 w-px bg-white/10 sm:left-[27px]" />
          <motion.span aria-hidden className="absolute bottom-2 left-[19px] top-2 w-px origin-top bg-gold-2 shadow-[0_0_10px_rgba(255,199,102,0.7)] sm:left-[27px]" style={{ scaleY: line }} />

          {process.map((s, i) => (
            <motion.li
              key={s.n}
              className="relative flex gap-5 pb-10 last:pb-0 sm:gap-8 sm:pb-14"
              initial={{ opacity: 0, y: 36, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
            >
              <span className="relative z-10 mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/60 bg-ink font-display text-lg tracking-wide text-gold-2 sm:h-14 sm:w-14 sm:text-2xl">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-ink-2/70 p-5 transition duration-500 hover:border-gold/40 sm:p-7">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="mono text-[11px] tracking-[0.2em] text-smoke">TAKE {s.n}</span>
                  <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-2">{s.tag}</span>
                </div>
                <h3 className="mt-3 font-display text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[0.95] tracking-wide text-bone">{s.title}</h3>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-mist">{s.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </>
  );
}
