import { motion } from 'framer-motion';
import { brand, principles } from '../data/portfolio';
import { EASE, Ph, SectionHeading, Tilt } from './fx';

export default function About() {
  const facts = [
    { k: 'Focus', v: 'Video editing & graphic design', s: 'Reels, documentary-style films, promos' },
    { k: 'Works with', v: 'Cafes, restaurants & brands', s: 'Plus creators building an audience' },
    { k: 'Based in', v: brand.location, s: 'Open to remote projects' },
    { k: 'Availability', v: brand.availability, s: 'Tell me about your project' },
  ];

  return (
    <>
      <SectionHeading kicker="The Studio" title="About" />
      <div className="gutter grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <motion.div
          className="mx-auto w-full max-w-md lg:max-w-none"
          initial={{ opacity: 0, scale: 0.88, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <Tilt max={5} className="rounded-2xl">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-white/10">
              <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_30%,#6b4410,#140d05_60%,#08090b)]" />
              <div className="absolute inset-0 opacity-50 [background-image:repeating-linear-gradient(90deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_28px)]" />
              {brand.portrait ? (
                <img src={brand.portrait.src} alt={brand.portrait.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8 text-center">
                  <span className="vf-corner left-6 top-6 border-l-2 border-t-2" />
                  <span className="vf-corner right-6 top-6 border-r-2 border-t-2" />
                  <span className="vf-corner bottom-6 left-6 border-b-2 border-l-2" />
                  <span className="vf-corner bottom-6 right-6 border-b-2 border-r-2" />
                  <span className="ph text-sm">[Your portrait goes here]</span>
                  <span className="text-xs text-mist">Add a photo in src/data/portfolio.ts → brand.portrait</span>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/90 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.3em] text-gold-2">DIRECTED BY</p>
                  <p className="font-display text-3xl leading-none text-bone">{brand.displayName}</p>
                </div>
                <span className="rounded border border-white/30 px-1.5 text-[10px] font-bold text-bone">EDIT · DESIGN</span>
              </div>
            </div>
          </Tilt>
        </motion.div>

        <div>
          <motion.p
            className="font-serif text-[clamp(1.6rem,3.2vw,2.6rem)] italic leading-[1.15] text-bone"
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
          >
            “I&apos;m {brand.displayName} — a video editor and graphic designer helping brands look premium and get watched.”
          </motion.p>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-bone/75">
            I work with cafes, restaurants, creators and growing brands to turn footage and ideas into reels, documentary-style films and promotional content — and into a social presence that stays consistent from one post to the next.
          </p>

          <motion.dl
            className="mt-10 grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.08 }}
          >
            {facts.map((f) => (
              <motion.div
                key={f.k}
                className="bg-ink-2 p-5"
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
              >
                <dt className="text-[10px] font-bold uppercase tracking-[0.28em] text-smoke">{f.k}</dt>
                <dd className="mt-2 text-base font-semibold text-bone">
                  <Ph value={f.v} />
                </dd>
                <dd className="mt-0.5 text-xs text-mist">{f.s}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </div>

      <div className="gutter mt-14 grid gap-4 md:grid-cols-3">
        {principles.map((p, i) => (
          <motion.div
            key={p.title}
            className="rounded-xl border border-white/10 bg-ink-2/60 p-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-5% 0px' }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
          >
            <p className="mono text-[11px] text-gold-2">0{i + 1}</p>
            <h3 className="mt-3 font-display text-3xl leading-none tracking-wide text-bone">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-mist">{p.text}</p>
          </motion.div>
        ))}
      </div>
    </>
  );
}
