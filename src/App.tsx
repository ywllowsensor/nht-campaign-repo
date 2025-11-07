import Lenis from 'lenis';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Routes, Route } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { GamePage } from './pages/GamePage';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Request animation frame loop
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    const rafId = requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </>
  )
}


export default App
