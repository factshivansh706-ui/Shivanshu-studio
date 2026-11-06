import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { brand, channelHref, contact } from '../data/portfolio';
import { useSmoothScroll } from '../hooks/smoothScroll';
import { EASE, Magnetic, Particles, Ph } from './fx';
import { BrandMark } from './Poster';

export default function Contact({ onReplay }: { onReplay: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.2'] });
  const spacing = useTransform(scrollYProgress, [0, 1], ['0.12em', '0.02em']);
  const blur = useTransform(scrollYProgress, [0, 1], ['blur(16px)', 'blur(0px)']);
  const opacity = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <section id="contact" ref={ref} className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pb-40 pt-24 text-center">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_60%,rgba(240,169,58,0.16),transparent_70%)]" />
      <Particles count={36} />

      <motion.p className="relative mb-6 text-[11px] font-bold uppercase tracking-[0.5em] text-gold-2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        Contact
      </motion.p>
      <motion.h2 className="relative font-display leading-[0.88] text-bone" style={{ fontSize: 'clamp(2.6rem, 9vw, 8rem)', letterSpacing: spacing, filter: blur, opacity }}>
        LET&apos;S MAKE SOMETHING WORTH WATCHING
      </motion.h2>

      <motion.p
        className="relative mt-8 max-w-xl text-[15px] leading-relaxed text-bone/75 sm:text-base"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
      >
        Tell me about your project — a reel, a promo, a documentary-style edit or a content plan — and I&apos;ll reply with how we can make it.
      </motion.p>

      <motion.div
        className="relative mt-12 grid w-full max-w-4xl gap-3 sm:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.08, delayChildren: 0.3 }}
      >
        {contact.map((c) => {
          const href = channelHref(c);
          const body = (
            <>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-2">{c.label}</span>
              <span className="mt-3 block break-all text-base font-semibold text-bone sm:text-lg">
                <Ph value={c.display} />
              </span>
              <span className="mt-1 block text-xs text-mist">{c.hint}</span>
              <span className="mt-4 block text-xs font-bold tracking-[0.18em] text-bone/80">{href ? 'OPEN ↗' : 'ADD YOUR DETAILS'}</span>
            </>
          );
          const cls = `block rounded-2xl border p-5 text-left transition duration-300 sm:p-6 ${
            href ? 'border-white/15 bg-ink-2/70 hover:border-gold-2 hover:bg-white/[0.04]' : 'border-dashed border-white/20 bg-ink-2/40'
          }`;
          return (
            <motion.div key={c.id} variants={{ hidden: { opacity: 0, y: 20, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } } }}>
              <Magnetic className="w-full">
                {href ? (
                  <a href={href} target={c.id === 'email' ? undefined : '_blank'} rel="noreferrer" data-cursor="link" className={`w-full ${cls}`}>
                    {body}
                  </a>
                ) : (
                  <div className={`w-full ${cls}`}>{body}</div>
                )}
              </Magnetic>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="relative mt-14 flex flex-wrap justify-center gap-6 text-xs font-semibold tracking-[0.24em] text-smoke">
        <button type="button" onClick={() => scrollTo(0, { offset: 0 })} className="hover:text-bone">
          ↺ BACK TO TOP
        </button>
        <button type="button" onClick={onReplay} className="hover:text-bone">
          ▶ REPLAY OPENING
        </button>
      </div>

      <footer className="absolute inset-x-0 bottom-0 px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center">
        <div className="mb-2 text-base">
          <BrandMark />
        </div>
        <p className="text-[11px] leading-relaxed text-smoke">
          © {new Date().getFullYear()} {brand.displayName}. {brand.positioning}.
        </p>
      </footer>
    </section>
  );
}
