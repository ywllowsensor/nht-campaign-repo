import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Replace with your actual image path
import stressImg from "../assets/images/zoom-out-bg-img.png";

gsap.registerPlugin(ScrollTrigger);

const acculturativeStressDefinition = "“Acculturative stress refers to stress induced by the adaptation or acculturation process due to a change in cultural environment where a person has to make a number of personal, social, and environmental change.”";

export function AcculturativeStress() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current || !overlayRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      // Zoom out animation - much more gradual
      gsap.fromTo(
        imageRef.current,
        {
          scale: 2.5,
          opacity: 1
        },
        {
          scale: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=100vh',
            scrub: 1
          }
        }
      );

      // Black overlay fades in with delay after zoom completes
      gsap.fromTo(
        overlayRef.current,
        {
          opacity: 0
        },
        {
          opacity: 0.5,
          scrollTrigger: {
            trigger: containerRef.current,
            start: '+=140vh top',
            end: '+=160vh top',
            scrub: 1
          }
        }
      );

      // Text scrolls up from bottom much more gradually and smoothly
      gsap.fromTo(
        textRef.current,
        {
          y: '100vh',
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: '+=140vh top',
            end: '+=80vh top',
            scrub: 1
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: '200vh' }}>
      {/* Image section */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <div
          ref={imageRef}
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${stressImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transformOrigin: 'center center'
          }}
        />

        {/* Black overlay that fades in */}
        <div
          ref={overlayRef}
          className="absolute inset-0 w-full h-full bg-black pointer-events-none"
          style={{ opacity: 0 }}
        />

        {/* Text overlay */}
        <div
          ref={textRef}
          className="absolute inset-0 flex items-center justify-center px-8 md:px-16 lg:px-24 z-10"
        >
          <div className="max-w-4xl">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-anton font-bold text-primary mb-6 text-center">
              This is what acculturative stress looks like in everyday life
            </h3>
            <p className="text-3xl text-(--text) md:text-4xl lg:text-5xl font-anton font-light text-center">
              {acculturativeStressDefinition}
            </p>
            <p className='text-md text-(--text)/70 font-anton text-right'>
              ~ Nasirudeen et al., 2014
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
