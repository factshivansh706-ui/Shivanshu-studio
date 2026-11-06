import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { brand } from '../data/portfolio';
import { useFinePointer, useReducedMotionPref } from '../hooks/useMedia';
import { useSmoothScroll } from '../hooks/smoothScroll';
import { EASE, Magnetic, Particles, Timecode } from './fx';
import { BrandMark } from './Poster';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } } };
const item = {
  hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: EASE } },
};

const MARKS = ['Reels & Shorts', 'Documentary-style', 'Cafe & Restaurant', 'Social Media'];
const CAPTIONS = ['HOOK', 'STORY', 'PAYOFF'];

export default function Hero({ onPlay }: { onPlay: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const fine = useFinePointer();
  const { scrollTo } = useSmoothScroll();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const visY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const visScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const blackout = useTransform(scrollYProgress, [0.35, 1], [0, 1]);

  // pointer parallax (desktop only)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 18 });
  const py = useSpring(my, { stiffness: 60, damping: 18 });
  const rotY = useTransform(px, [-1, 1], [-6, 6]);
  const rotX = useTransform(py, [-1, 1], [4, -4]);
  const shiftX = useTransform(px, [-1, 1], [-10, 10]);
  const chipX = useTransform(px, [-1, 1], [18, -18]);
  const chipY = useTransform(py, [-1, 1], [12, -12]);
  const glowX = useTransform(px, [-1, 1], ['-6%', '6%']);

  const floating = [
    { text: '9:16 · Reels', sub: 'Short-form', pos: 'left-[-2%] top-[26%]', depth: 1 },
    { text: 'Doc-style cuts', sub: 'Long-form', pos: 'right-[-4%] top-[16%]', depth: -1 },
    { text: 'Captions + strategy', sub: 'Content', pos: 'right-[-2%] bottom-[22%]', depth: 0.6 },
  ];

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden"
      onPointerMove={(e) => {
        if (!fine) return;
        mx.set((e.clientX / window.innerWidth) * 2 - 1);
        my.set((e.clientY / window.innerHeight) * 2 - 1);
      }}
    >
      {/* atmosphere */}
      <motion.div aria-hidden className="absolute inset-0" style={{ x: glowX }}>
        <div className="absolute right-[-10%] top-[-10%] h-[90vh] w-[80vw] rounded-full bg-[radial-gradient(closest-side,rgba(240,169,58,0.3),rgba(240,169,58,0.06)_55%,transparent)] blur-2xl lg:right-[-4%] lg:w-[60vw]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[70vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,rgba(53,211,192,0.16),transparent)] blur-2xl" />
      </motion.div>
      <Particles className="z-[1]" />
      <div aria-hidden className="absolute inset-0 z-[1] overflow-hidden">
        <span className="light-streak left-[40%] top-[22%] w-[50vw]" style={{ animationDelay: '1.2s' }} />
        <span className="light-streak left-[30%] top-[64%] w-[40vw]" style={{ animationDelay: '3.6s' }} />
        <span className="light-streak left-[55%] top-[44%] w-[30vw]" style={{ animationDelay: '5.2s' }} />
      </div>

      {/* visual: a vertical "reel" frame */}
      <motion.div
        className="absolute inset-x-0 top-20 z-[2] flex h-[46svh] items-center justify-center sm:h-[52svh] lg:bottom-0 lg:left-auto lg:right-[4vw] lg:top-0 lg:h-auto lg:w-[44vw] xl:right-[8vw] xl:w-[38vw]"
        style={{ y: visY, scale: visScale, opacity: fade }}
      >
        <motion.div
          className="relative aspect-[9/16] h-full max-h-[68vh] lg:h-[70vh]"
          style={{ rotateY: rotY, rotateX: rotX, x: shiftX, transformPerspective: 1200 }}
          initial={{ clipPath: 'inset(100% -30% -10% -30%)', opacity: 0 }}
          animate={{ clipPath: 'inset(-30% -30% -10% -30%)', opacity: 1 }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.1 }}
        >
          <ReelFrame />
          {floating.map((f, i) => (
            <FloatChip key={f.text} {...f} index={i} mx={chipX} my={chipY} />
          ))}
        </motion.div>
      </motion.div>

      {/* readability gradients */}
      <div aria-hidden className="absolute inset-x-0 top-[40svh] z-[3] h-[36svh] bg-gradient-to-b from-transparent via-ink/70 to-ink lg:hidden" />
      <div aria-hidden className="absolute inset-0 z-[3] hidden bg-[linear-gradient(90deg,var(--color-ink)_0%,rgba(8,9,11,0.7)_32%,transparent_58%)] lg:block" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 z-[3] h-48 bg-gradient-to-t from-ink to-transparent" />

      {/* copy */}
      <motion.div
        className="gutter relative z-[4] flex min-h-[100svh] flex-col justify-end pb-16 pt-[48svh] sm:pb-20 lg:max-w-[54vw] lg:justify-center lg:pb-28 lg:pt-24"
        style={{ y: textY, opacity: fade }}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="mb-3 text-lg">
          <BrandMark wordmark={false} />
        </motion.div>
        <motion.h1 variants={item} className="font-display leading-[0.82] tracking-[0.02em] text-bone" style={{ fontSize: 'clamp(3.6rem, 12vw, 11rem)' }}>
          <span className="shimmer-text">{brand.name}</span>
        </motion.h1>
        <motion.p variants={item} className="mt-1 font-sans text-xs font-bold tracking-[0.5em] text-gold-2 sm:text-base sm:tracking-[0.62em]">
          {brand.studioTag}
        </motion.p>

        <motion.div variants={item} className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] font-medium text-mist">
          <span className="rounded border border-white/25 px-1.5 py-px text-[10px] font-bold tracking-wider text-bone">4K</span>
          {MARKS.map((m, i) => (
            <span key={m} className="flex items-center gap-3">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-smoke" />}
              {m}
            </span>
          ))}
        </motion.div>

        <motion.p variants={item} className="mt-5 max-w-xl font-serif text-[clamp(1.5rem,3vw,2.3rem)] italic leading-[1.1] text-bone">
          {brand.headline}
        </motion.p>
        <motion.p variants={item} className="mt-4 max-w-xl text-[15px] leading-relaxed text-bone/75 sm:text-base">
          {brand.intro}
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
          <Magnetic>
            <button
              type="button"
              data-cursor="play"
              onClick={() => scrollTo('#work')}
              className="flex min-h-12 items-center gap-3 rounded-md bg-bone px-6 py-3 text-[15px] font-bold text-ink transition hover:bg-white sm:px-8"
            >
              <span className="text-lg">▶</span> View Selected Work
            </button>
          </Magnetic>
          <Magnetic>
            <button
              type="button"
              onClick={() => scrollTo('#contact')}
              className="glass flex min-h-12 items-center gap-3 rounded-md px-6 py-3 text-[15px] font-semibold text-bone transition hover:bg-white/15 sm:px-8"
            >
              Start a Project
            </button>
          </Magnetic>
          <button
            type="button"
            onClick={onPlay}
            aria-label="Play studio reel"
            data-cursor="play"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-sm text-bone transition hover:border-bone hover:bg-white/10"
          >
            ▶
          </button>
        </motion.div>
      </motion.div>

      <Timeline />
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-[5] bg-ink" style={{ opacity: blackout }} />
    </section>
  );
}

/** A vertical 9:16 frame: moving light, cycling caption (hook → story → payoff), REC + timecode, scrubber. */
function ReelFrame() {
  const reduced = useReducedMotionPref();
  const [cap, setCap] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setCap((c) => (c + 1) % CAPTIONS.length), 1800);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/15 bg-ink-2 shadow-[0_40px_90px_-20px_rgba(0,0,0,0.85),0_0_90px_rgba(240,169,58,0.18)]">
      <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_70%_15%,rgba(240,169,58,0.55),transparent_65%),radial-gradient(80%_60%_at_20%_95%,rgba(53,211,192,0.4),transparent_65%),linear-gradient(170deg,#1a1408,#06080a)]" />
      <motion.div
        aria-hidden
        className="absolute -inset-x-1/2 top-0 h-full w-[70%] -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={reduced ? undefined : { x: ['-60%', '260%'] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }}
      />
      <div aria-hidden className="absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_4px)]" />

      <span className="vf-corner left-4 top-4 border-l-2 border-t-2" />
      <span className="vf-corner right-4 top-4 border-r-2 border-t-2" />
      <span className="vf-corner bottom-4 left-4 border-b-2 border-l-2" />
      <span className="vf-corner bottom-4 right-4 border-b-2 border-r-2" />

      <div className="absolute left-7 right-7 top-7 flex items-center justify-between text-[10px] font-semibold tracking-[0.2em] text-bone/85">
        <span className="flex items-center gap-1.5">
          <motion.span className="h-1.5 w-1.5 rounded-full bg-red-500" animate={reduced ? undefined : { opacity: [1, 0.2, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
          REC
        </span>
        <Timecode />
      </div>

      <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-black/30 text-xl text-bone backdrop-blur">▶</span>
      </div>

      <div className="absolute inset-x-0 bottom-14 flex justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={CAPTIONS[cap]}
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="rounded-md bg-gold px-3 py-1 font-display text-2xl leading-none tracking-wider text-ink"
          >
            {CAPTIONS[cap]}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="absolute inset-x-7 bottom-7 h-[3px] overflow-hidden rounded bg-white/20">
        <motion.div
          className="h-full origin-left bg-gold-2"
          animate={reduced ? { scaleX: 0.4 } : { scaleX: [0, 1] }}
          transition={{ duration: 5.4, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </div>
  );
}

type MV = ReturnType<typeof useTransform<number, number>>;

function FloatChip({ text, sub, pos, depth, index, mx, my }: { text: string; sub: string; pos: string; depth: number; index: number; mx: MV; my: MV }) {
  const x = useTransform(mx, (n: number) => n * depth);
  const y = useTransform(my, (n: number) => n * depth);
  return (
    <motion.div
      className={`glass absolute hidden rounded-xl px-4 py-2.5 md:block ${pos}`}
      style={{ x, y }}
      initial={{ opacity: 0, filter: 'blur(6px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.9, delay: 1.2 + index * 0.18, ease: EASE }}
    >
      <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 5 + index, repeat: Infinity, ease: 'easeInOut' }}>
        <p className="text-sm font-semibold text-bone">{text}</p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-mist">{sub}</p>
      </motion.div>
    </motion.div>
  );
}

/** Editor-style timeline strip along the bottom of the hero (desktop). The playhead sweeps across clips. */
const TRACKS: { label: string; clips: { l: number; w: number; c: string }[] }[] = [
  { label: 'V2', clips: [{ l: 6, w: 14, c: 'bg-teal/60' }, { l: 30, w: 10, c: 'bg-teal/40' }, { l: 58, w: 18, c: 'bg-teal/60' }] },
  { label: 'V1', clips: [{ l: 0, w: 24, c: 'bg-gold/70' }, { l: 25, w: 20, c: 'bg-gold/50' }, { l: 46, w: 30, c: 'bg-gold/70' }, { l: 77, w: 21, c: 'bg-gold/50' }] },
  { label: 'A1', clips: [{ l: 0, w: 98, c: 'bg-white/15' }] },
];

function Timeline() {
  const reduced = useReducedMotionPref();
  return (
    <div aria-hidden className="absolute inset-x-0 bottom-6 z-[4] hidden px-[var(--gutter)] lg:block">
      <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black/40 px-3 py-2 backdrop-blur">
        {TRACKS.map((t) => (
          <div key={t.label} className="flex items-center gap-3 py-[3px]">
            <span className="mono w-5 text-[9px] text-smoke">{t.label}</span>
            <div className="relative h-3 flex-1">
              {t.clips.map((c) => (
                <span key={c.l} className={`absolute top-0 h-full rounded-[3px] ${c.c}`} style={{ left: `${c.l}%`, width: `${c.w}%` }} />
              ))}
            </div>
          </div>
        ))}
        <div className="absolute inset-y-0 left-[2.75rem] right-3">
          <motion.span
            className="absolute inset-y-0 w-px bg-gold-2 shadow-[0_0_8px_rgba(255,199,102,0.9)]"
            initial={{ left: reduced ? '38%' : '0%' }}
            animate={reduced ? undefined : { left: ['0%', '100%'] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </div>
    </div>
  );
}
