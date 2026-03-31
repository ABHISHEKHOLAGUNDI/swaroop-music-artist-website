import { useEffect } from 'react';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Problem from './pages/Problem';
import Music from './pages/Music';
import Impact from './pages/Impact';
import Partner from './pages/Partner';
import About from './pages/About';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard Awwwards expo ease
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <div className="global-texture-bg" />
      <div className="grain-overlay" />
      
      <Navbar />

      <main style={{ position: 'relative', width: '100vw' }}>
          <section id="home" className="smooth-section"><Home /></section>
          <section id="problem" className="smooth-section"><Problem /></section>
          <section id="music" className="smooth-section"><Music /></section>
          <section id="impact" className="smooth-section"><Impact /></section>
          <section id="partner" className="smooth-section"><Partner /></section>
          <section id="about" className="smooth-section"><About /></section>
      </main>
    </>
  );
}

export default App;
