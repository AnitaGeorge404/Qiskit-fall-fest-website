import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import TeamGrid from './components/TeamGrid';
import Organizers from './components/Organizers';
import Experience from './components/Experience';
import Footer from './components/Footer';
import QuantumInterference from './components/QuantumInterference';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Fallback timeout just in case animation doesn't complete
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
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
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className={`relative min-h-screen transition-opacity duration-1000 ${isLoading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        {/* Quantum Interference background layer */}
        <QuantumInterference />
        
        <Navbar />
        
        <main>
          <Hero />
          <Timeline />
          <TeamGrid />
          <Organizers />
          <Experience />
        </main>
        
        <Footer />
      </div>
    </>
  );
}

export default App;
