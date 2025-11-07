import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

// Replace with your actual image path
import gameImg from "../assets/images/cover-page-img.png";

gsap.registerPlugin(ScrollTrigger);

export function GameIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!containerRef.current || !stickyRef.current || !imageRef.current || !textRef.current || !buttonRef.current) return;

    const ctx = gsap.context(() => {
      // Entire sticky section slides up from bottom to cover previous section
      gsap.fromTo(
        stickyRef.current,
        {
          y: '100vh'
        },
        {
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top+=100vh bottom',
            end: 'top+=100vh top',
            scrub: 1
          }
        }
      );

      // Image reveals and fills screen
      gsap.fromTo(
        imageRef.current,
        {
          scale: 1.2,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'top top',
            scrub: 1
          }
        }
      );

      // Comic layer 1 - halftone dots pattern
      if (layer1Ref.current) {
        gsap.fromTo(
          layer1Ref.current,
          {
            opacity: 0
          },
          {
            opacity: 0.3,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: '+=80vh top',
              scrub: 1
            }
          }
        );
      }

      // Comic layer 2 - color overlay (light cyan/yellow for comic feel)
      if (layer2Ref.current) {
        gsap.fromTo(
          layer2Ref.current,
          {
            opacity: 0
          },
          {
            opacity: 0.4,
            scrollTrigger: {
              trigger: containerRef.current,
              start: '+=80vh top',
              end: '+=80vh top',
              scrub: 1
            }
          }
        );
      }

      // Comic layer 3 - pop art style border/frame
      if (layer3Ref.current) {
        gsap.fromTo(
          layer3Ref.current,
          {
            scale: 0.8,
            opacity: 0
          },
          {
            scale: 1,
            opacity: 1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: '+=120vh top',
              end: '+=60vh top',
              scrub: 1
            }
          }
        );
      }

      // Text appears with bounce
      gsap.fromTo(
        textRef.current,
        {
          y: 100,
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: '+=180vh top',
            end: '+=50vh top',
            scrub: 1
          }
        }
      );

      // Button appears last with pop effect
      gsap.fromTo(
        buttonRef.current,
        {
          y: 50,
          opacity: 0,
          scale: 0.5,
          rotation: -5
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: '+=230vh top',
            end: '+=40vh top',
            scrub: 1
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full z-20" style={{ height: '270vh', marginTop: '-100vh' }}>
      {/* Sticky container that slides up */}
      <div 
        ref={stickyRef}
        className="sticky top-0 w-full h-screen overflow-hidden bg-linear-to-br from-yellow-100 via-cyan-100 to-pink-100"
        style={{ willChange: 'transform' }}
      >
        {/* Base image */}
        <div
          ref={imageRef}
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${gameImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(1.1) contrast(1.1)'
          }}
        />

        {/* Comic Layer 1: Halftone dots */}
        <div
          ref={layer1Ref}
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: 0,
            backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.8) 1px, transparent 1px)`,
            backgroundSize: '8px 8px',
            mixBlendMode: 'overlay'
          }}
        />

        {/* Comic Layer 2: Color overlay */}
        <div
          ref={layer2Ref}
          className="absolute inset-0 w-full h-full bg-linear-to-br from-cyan-300/50 via-yellow-300/50 to-pink-300/50"
          style={{
            opacity: 0,
            mixBlendMode: 'overlay'
          }}
        />

        {/* Comic Layer 3: Pop art frame with comic burst */}
        <div
          ref={layer3Ref}
          className="absolute inset-8 md:inset-12 lg:inset-16"
          style={{
            opacity: 0,
            border: '8px solid',
            borderImage: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #FFE66D, #FF6B6B) 1',
            boxShadow: 'inset 0 0 0 4px white, 0 0 0 4px rgba(0,0,0,0.2)',
          }}
        >
        </div>

        {/* Text content */}
        <div
          ref={textRef}
          className="absolute inset-0 flex flex-col items-center justify-center px-8 md:px-16 z-20"
          style={{ opacity: 0 }}
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-anton font-bold text-white text-center mb-4 transform -rotate-2"
            style={{ 
              textShadow: '4px 4px 0 #FF6B6B, 8px 8px 0 #4ECDC4, -2px -2px 0 black',
              WebkitTextStroke: '2px black'
            }}
          >
            Walk Their Path
          </h2>
          <p className="text-2xl md:text-3xl lg:text-4xl font-radio font-bold text-black text-center mb-8 bg-yellow-300 px-6 py-3 transform rotate-1 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
            Experience the journey. Make the choices. Feel the impact.
          </p>
        </div>

        {/* Call-to-action button */}
        <Link
          to="/game"
          ref={buttonRef}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 group"
          style={{ opacity: 0 }}
        >
          <div className="relative px-12 py-6 text-2xl md:text-3xl font-anton font-bold text-white bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] transform transition-all duration-200 group-hover:scale-110 group-hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] group-hover:-translate-y-1 cursor-pointer">
            TAKE THE EXPERIENCE
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-300 border-2 border-black rounded-full animate-ping" />
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-300 border-2 border-black rounded-full flex items-center justify-center text-black text-lg">
              ★
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

// export function GameIntroMultiMask() {
//   const layer1MaskRef = useRef<SVGCircleElement>(null);
//   const layer2MaskRef = useRef<SVGPolygonElement>(null);
//   const layer3MaskRef = useRef<SVGRectElement>(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Layer 1: Circular wipe from center
//       if (layer1MaskRef.current) {
//         gsap.fromTo(
//           layer1MaskRef.current,
//           { attr: { r: 0 } },
//           {
//             attr: { r: '150%' },
//             scrollTrigger: {
//               trigger: containerRef.current,
//               start: 'top top',
//               end: '+=100vh top',
//               scrub: 1
//             }
//           }
//         );
//       }

//       // Layer 2: Star burst pattern
//       if (layer2MaskRef.current) {
//         gsap.fromTo(
//           layer2MaskRef.current,
//           { scale: 0, transformOrigin: '50% 50%' },
//           {
//             scale: 3,
//             scrollTrigger: {
//               trigger: containerRef.current,
//               start: '+=100vh top',
//               end: '+=100vh top',
//               scrub: 1
//             }
//           }
//         );
//       }
//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div ref={containerRef} className="relative w-full" style={{ height: '400vh' }}>
//       <div className="sticky top-0 w-full h-screen overflow-hidden">
//         <svg width="100%" height="100%" className="absolute inset-0">
//           <defs>
//             {/* Mask 1: Circle reveal */}
//             <mask id="mask1">
//               <circle ref={layer1MaskRef} cx="50%" cy="50%" r="0" fill="white" />
//             </mask>

//             {/* Mask 2: Star burst */}
//             <mask id="mask2">
//               <polygon
//                 ref={layer2MaskRef}
//                 points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35"
//                 fill="white"
//                 transform="translate(400, 300)"
//               />
//             </mask>

//             {/* Mask 3: Comic frame reveal */}
//             <mask id="mask3">
//               <rect ref={layer3MaskRef} x="5%" y="5%" width="90%" height="90%" fill="white" />
//             </mask>
//           </defs>

//           {/* Layered images with different masks */}
//           <image href="layer1.jpg" width="100%" height="100%" mask="url(#mask1)" />
//           <image href="layer2.jpg" width="100%" height="100%" mask="url(#mask2)" />
//           <image href="layer3.jpg" width="100%" height="100%" mask="url(#mask3)" />
//         </svg>
//       </div>
//     </div>
//   );
// }