import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import burdenImg from "../assets/images/cover-page-img.png";

gsap.registerPlugin(ScrollTrigger);

// Replace with your actual image path
const burdenImage = burdenImg;

const quotes = [
    "I feel like I have to prove myself every day, that I belong here.",
    "Sometimes I wonder if people see me as a person or just as 'the international student'.",
    "The weight of expectations from home is crushing, but no one here understands.",
    "I smile and nod, but inside I'm constantly translating, adapting, exhausting myself.",
    "Every conversation feels like a test I might fail.",
    "I'm homesick for a place I can't afford to visit.",
    "The loneliness is louder than any language barrier.",
    "I carry the dreams of my entire family on my shoulders.",
    "They say 'just be yourself,' but which self? The one from home or the one I'm building here?",
    "I'm tired of being 'exotic' instead of just being me."
];

export function Burden() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const quotesContainerRef = useRef<HTMLDivElement>(null);
    const quoteRefs = useRef<(HTMLDivElement | null)[]>([]);
    const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
    const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!containerRef.current || !titleRef.current || !quotesContainerRef.current) return;

        const ctx = gsap.context(() => {
            // Animate title scrolling up more gradually - follows the scroll
            gsap.to(titleRef.current, {
                y: -150,
                opacity: 0,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });

            // Animate quotes fading in with slight movement
            quoteRefs.current.forEach((quote, index) => {
                if (!quote) return;

                const isLeft = index % 2 === 0;
                const circle = circleRefs.current[index];
                const line = lineRefs.current[index];

                // Fade in animation with horizontal slide for quote
                gsap.fromTo(
                    quote,
                    {
                        opacity: 0,
                        x: isLeft ? -50 : 50
                    },
                    {
                        opacity: 1,
                        x: 0,
                        scrollTrigger: {
                            trigger: quote,
                            start: 'top bottom-=100',
                            end: 'top center+=100',
                            scrub: true
                        }
                    }
                );

                // Animate circle appearing
                if (circle) {
                    gsap.fromTo(
                        circle,
                        {
                            scale: 0,
                            opacity: 0
                        },
                        {
                            scale: 1,
                            opacity: 1,
                            scrollTrigger: {
                                trigger: quote,
                                start: 'top bottom-=100',
                                end: 'top center+=100',
                                scrub: true
                            }
                        }
                    );
                }

                // Animate connecting line expanding
                if (line) {
                    gsap.fromTo(
                        line,
                        {
                            scaleX: 0,
                            opacity: 0,
                            transformOrigin: isLeft ? 'right center' : 'left center'
                        },
                        {
                            scaleX: 1,
                            opacity: 1,
                            scrollTrigger: {
                                trigger: quote,
                                start: 'top bottom-=100',
                                end: 'top center+=100',
                                scrub: true
                            }
                        }
                    );
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative w-full">
            {/* Sliding window that reveals the image as user scrolls */}
            <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
                {/* Background image - fixed within this section */}
                <div
                    className="absolute top-0 left-0 w-full h-screen"
                    style={{
                        backgroundImage: `url(${burdenImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed'
                    }}
                />

                {/* Centered title */}
                <h2
                    ref={titleRef}
                    className="relative z-10 text-5xl md:text-7xl lg:text-8xl font-anton font-bold text-primary text-center px-8 leading-tight"
                    style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
                >
                    the burden that we don't understand
                </h2>
            </div>

            {/* Quotes section with dark background - slides up to cover the image */}
            <div
                ref={quotesContainerRef}
                className="relative w-full flex flex-col items-start justify-start py-20 px-8 md:px-16"
                style={{ backgroundColor: 'var(--background-dark)' }}
            >
                {/* Vertical timeline line in the center */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 my-5 -translate-x-1/2 bg-linear-to-b from-secondary/0 via-secondary/60 to-secondary/0">
                    {/* Decorative dots along the line */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-secondary/50" />
                    <div className="absolute top-2/4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-secondary animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-3/4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-secondary/50" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-secondary animate-pulse" style={{ animationDelay: '2s' }} />
                </div>

                {quotes.map((quote, index) => {
                    // Zigzag pattern: even index = left, odd index = right
                    const isLeft = index % 2 === 0;

                    return (
                        <div
                            key={index}
                            className="relative w-full flex items-center mb-16 md:mb-24"
                        >
                            {/* Quote content */}
                            <div
                                ref={el => {
                                    quoteRefs.current[index] = el;
                                }}
                                className={`w-full max-w-[45%] ${isLeft ? 'mr-auto' : 'ml-auto'}`}
                                style={{
                                    transformOrigin: 'center center'
                                }}
                            >
                                <blockquote className={`text-xl md:text-2xl lg:text-3xl font-radio font-light text-secondary italic leading-relaxed ${isLeft ? 'text-right pr-4 md:pr-8' : 'text-left pl-4 md:pl-8'}`}>
                                    "{quote}"
                                </blockquote>
                            </div>

                            {/* Center circle connected to the line */}
                            <div
                                ref={el => {
                                    circleRefs.current[index] = el;
                                }}
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                            >
                                {/* Outer glow ring */}
                                <div className="absolute inset-0 w-6 h-6 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full bg-secondary/20 animate-ping" />
                                {/* Main circle */}
                                <div className="relative w-4 h-4 rounded-full bg-secondary shadow-lg shadow-secondary/50 border-2 border-background-dark" />
                                {/* Inner dot */}
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-background-dark" />
                            </div>

                            {/* Connecting line from quote to center circle */}
                            <div
                                ref={el => {
                                    lineRefs.current[index] = el;
                                }}
                                className={`absolute top-1/2 h-0.5 bg-gradient-to-${isLeft ? 'r' : 'l'} from-secondary/60 to-transparent ${isLeft ? 'right-1/2 left-[5%]' : 'left-1/2 right-[5%]'}`}
                                style={{ width: '45%' }}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
