import React, { useState, useEffect, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import TeamGrid from './components/TeamGrid';
import Organizers from './components/Organizers';
import Footer from './components/Footer';
import { DeviceTierContext } from './contexts/DeviceTierContext';
import { getDeviceTier } from './utils/deviceTier';

const Experience = lazy(() => import('./components/Experience'));


function App() {
  const [deviceTier] = useState(() => getDeviceTier());
  const [isLoading, setIsLoading] = useState(true);

  // Fallback timeout just in case animation doesn't complete
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    if (deviceTier === 'low') return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    window.lenis = lenis;

    return () => {
      lenis.destroy();
      delete window.lenis;
    };
  }, [deviceTier]);

  return (
    <DeviceTierContext.Provider value={deviceTier}>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className={`relative min-h-screen transition-opacity duration-1000 ${isLoading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>


        <Navbar />

        <main>
          {!isLoading && <Hero />}
          {!isLoading && <Timeline />}
          <TeamGrid />
          <Organizers />
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </main>

        <Footer />
      </div>
    </DeviceTierContext.Provider>
  );
}

export default App;
