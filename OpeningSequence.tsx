import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { brand } from '../data/portfolio';
import { useReducedMotionPref } from '../hooks/useMedia';
import { EASE, Magnetic, Timecode } from './fx';

/**
 * Opening title sequence:
 * black → studio card → SHIVANSHU → CREATIVE SERVICES → viewfinder + timecode → roles → ENTER
 */
const TIMELINE = [
  { at: 300, beat: 1 }, // studio card
  { at: 1800, beat: 2 }, // name
  { at: 2600, beat: 3 }, // creative services
  { at: 3300, beat: 4 }, // viewfinder
  { at: 4200, beat: 5 }, // roles
  { at: 4900, beat: 6 }, // enter button
];

export default function OpeningSequence({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotionPref();
  const [beat, setBeat] = useState(reduced ? 6 : 0);

  useEffect(() => {
    if (reduced) return;
    const timers = TIMELINE.map(({ at, beat }) => window.setTimeout(() => setBeat(beat), at));
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') onDone();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onDone]);

  const corner = 'vf-corner';

  return (
    <motion.div
      className="fixed inset-0 z-[120] overflow-hidden bg-black"
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }}
      transition={{ duration: 0.9, ease: EASE }}
      role="dialog"
      aria-label="Opening titles"
    >
      {/* letterbox bars */}
      <motion.div className="absolute inset-x-0 top-0 z-30 h-[7vh] bg-black" initial={{ y: 0 }} animate={{ y: beat >= 6 ? '-100%' : 0 }} transition={{ duration: 1.2, ease: EASE }} />
      <motion.div className="absolute inset-x-0 bottom-0 z-30 h-[7vh] bg-black" initial={{ y: 0 }} animate={{ y: beat >= 6 ? '100%' : 0 }} transition={{ duration: 1.2, ease: EASE }} />

      {/* projector flicker light */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'radial-gradient(60% 50% at 50% 50%, rgba(240,169,58,0.2), transparent 70%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: beat >= 2 ? [0, 0.9, 0.5, 1] : 0 }}
        transition={{ duration: 1.4 }}
      />

      {/* studio card */}
      <AnimatePresence>
        {beat === 1 && (
          <motion.div
            key="studio"
            className="absolute inset-0 flex items-center justify-center px-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              className="font-sans text-xs font-semibold text-mist sm:text-sm"
              initial={{ letterSpacing: '0.2em', opacity: 0 }}
              animate={{ letterSpacing: '0.5em', opacity: 1 }}
              transition={{ duration: 1.6, ease: EASE }}
            >
              VIDEO EDITING × GRAPHIC DESIGN
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* viewfinder frame */}
      <motion.div
        aria-hidden
        className="absolute inset-[11vh_6vw] z-[2] sm:inset-[14vh_8vw]"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={beat >= 4 ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, ease: EASE }}
      >
        <span className={`${corner} left-0 top-0 border-l-2 border-t-2`} />
        <span className={`${corner} right-0 top-0 border-r-2 border-t-2`} />
        <span className={`${corner} bottom-0 left-0 border-b-2 border-l-2`} />
        <span className={`${corner} bottom-0 right-0 border-b-2 border-r-2`} />
        <div className="absolute left-3 top-3 flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] text-bone/80 sm:left-5 sm:top-5 sm:text-xs">
          <motion.span className="h-2 w-2 rounded-full bg-red-500" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
          REC
        </div>
        <Timecode className="absolute right-3 top-3 text-[10px] text-bone/70 sm:right-5 sm:top-5 sm:text-xs" />
      </motion.div>
      <div aria-hidden className="absolute inset-0 z-[1] bg-[radial-gradient(70%_60%_at_50%_45%,transparent_30%,rgba(0,0,0,0.85)_100%)]" />

      {/* title */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
        <motion.h1
          className="font-display leading-[0.82] text-bone drop-shadow-[0_8px_40px_rgba(0,0,0,0.8)]"
          style={{ fontSize: 'clamp(3.6rem, 17vw, 14rem)' }}
          initial={{ opacity: 0, scale: 1.3, filter: 'blur(20px)', letterSpacing: '0.5em' }}
          animate={beat >= 2 ? { opacity: 1, scale: 1, filter: 'blur(0px)', letterSpacing: '0.04em' } : {}}
          transition={{ duration: 1.3, ease: EASE }}
        >
          {brand.name}
        </motion.h1>
        <motion.p
          className="mt-2 font-sans text-xs font-bold text-gold-2 [text-shadow:0_2px_20px_rgba(0,0,0,0.9)] sm:text-lg"
          initial={{ opacity: 0, letterSpacing: '1.2em' }}
          animate={beat >= 3 ? { opacity: 1, letterSpacing: '0.6em' } : {}}
          transition={{ duration: 1.1, ease: EASE }}
        >
          {brand.studioTag}
        </motion.p>
      </div>

      {/* roles + enter */}
      <div className="absolute inset-x-0 bottom-[16vh] z-20 flex flex-col items-center gap-6 px-4 text-center sm:bottom-[18vh]">
        <motion.p
          className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-bone/90 sm:text-sm sm:tracking-[0.4em]"
          initial={{ opacity: 0, y: 14 }}
          animate={beat >= 5 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {brand.tagline.join('  •  ')}
        </motion.p>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={beat >= 6 ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.7, ease: EASE }}>
          <Magnetic>
            <button
              type="button"
              data-cursor="play"
              onClick={onDone}
              tabIndex={beat >= 6 ? 0 : -1}
              className="group flex items-center gap-3 rounded-full bg-bone px-9 py-4 font-sans text-base font-bold tracking-wide text-ink shadow-[0_0_60px_rgba(240,169,58,0.4)] transition hover:bg-white"
            >
              <span className="text-lg transition-transform group-hover:scale-125">▶</span> ENTER
            </button>
          </Magnetic>
        </motion.div>
      </div>

      <button
        type="button"
        onClick={onDone}
        className="absolute right-4 top-[calc(7vh+12px)] z-40 rounded-full border border-white/20 px-4 py-2 font-sans text-[11px] font-semibold tracking-[0.2em] text-mist transition hover:border-white/60 hover:text-bone"
      >
        SKIP INTRO
      </button>
    </motion.div>
  );
}
