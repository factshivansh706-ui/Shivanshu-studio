import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import type { Project } from './data/portfolio';
import { SmoothScrollProvider, useSmoothScroll } from './hooks/smoothScroll';
import CustomCursor from './components/CustomCursor';
import OpeningSequence from './components/OpeningSequence';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Scene from './components/Scene';
import About from './components/About';
import Services from './components/Services';
import Work from './components/Work';
import Process from './components/Process';
import Contact from './components/Contact';
import { EASE } from './components/fx';

// Overlays are only needed on demand — split them out of the first load.
const Showreel = lazy(() => import('./components/Showreel'));
const ProjectModal = lazy(() => import('./components/ProjectModal'));

type Stage = 'opening' | 'home';

const STORAGE_KEY = 'shivanshu-opening-seen';

function openingSeen(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export default function App() {
  return (
    <SmoothScrollProvider>
      <Site />
    </SmoothScrollProvider>
  );
}

function Site() {
  const [stage, setStage] = useState<Stage>(openingSeen() ? 'home' : 'opening');
  const [playing, setPlaying] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const { lock, unlock } = useSmoothScroll();

  useEffect(() => {
    if (stage === 'home') return;
    lock();
    return unlock;
  }, [stage, lock, unlock]);

  const finishOpening = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* storage unavailable — the opening will simply replay on reload */
    }
    window.scrollTo(0, 0);
    setStage('home');
  }, []);

  const closeReel = useCallback(() => setPlaying(false), []);
  const closeProject = useCallback(() => setProject(null), []);

  return (
    <LayoutGroup>
      <div className="grain" aria-hidden />
      <CustomCursor />

      <AnimatePresence>{stage === 'opening' && <OpeningSequence key="opening" onDone={finishOpening} />}</AnimatePresence>

      {stage === 'home' && (
        <motion.div initial={{ opacity: 0, scale: 1.03, filter: 'blur(10px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} transition={{ duration: 1, ease: EASE }}>
          <Navbar />
          <main>
            <Hero onPlay={() => setPlaying(true)} />
            <Scene id="about">
              <About />
            </Scene>
            <Scene id="services">
              <Services />
            </Scene>
            <Scene id="work" className="!py-0 sm:!py-0">
              <Work onOpen={setProject} />
            </Scene>
            <Scene id="process">
              <Process />
            </Scene>
            <Contact onReplay={() => setStage('opening')} />
          </main>
        </motion.div>
      )}

      <Suspense fallback={null}>
        <AnimatePresence>{playing && <Showreel key="reel" onClose={closeReel} />}</AnimatePresence>
        <AnimatePresence>{project && <ProjectModal key="project" project={project} onClose={closeProject} onSwitch={setProject} />}</AnimatePresence>
      </Suspense>
    </LayoutGroup>
  );
}
