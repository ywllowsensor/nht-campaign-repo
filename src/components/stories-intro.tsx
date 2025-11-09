import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function StoriesIntro() {
    const containerRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLHeadingElement>(null);
    const question1Ref = useRef<HTMLParagraphElement>(null);
    const question2Ref = useRef<HTMLParagraphElement>(null);
    const question3Ref = useRef<HTMLParagraphElement>(null);
    const scrollTextRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (!containerRef.current || !stickyRef.current || !headerRef.current) return;

        const ctx = gsap.context(() => {
            // Header animation - moves up and out
            gsap.to(
                headerRef.current,
                {
                    y: -150,
                    opacity: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top -10%',
                        end: 'top -40%',
                        scrub: 1
                    }
                }
            );

            // Question 1 enters
            gsap.fromTo(
                question1Ref.current,
                { y: 100, opacity: 0 },
                {
                    y: -100,
                    opacity: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top -30%',
                        end: 'top -50%',
                        scrub: 1
                    }
                }
            );

            // Question 2 enters
            gsap.fromTo(
                question2Ref.current,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top -60%',
                        end: 'top -80%',
                        scrub: 1
                    }
                }
            );

            // Question 3 enters
            gsap.fromTo(
                question3Ref.current,
                { y: 100, opacity: 0 },
                {
                    y: 100,
                    opacity: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top -100%',
                        end: 'top -120%',
                        scrub: 1
                    }
                }
            );

            // Questions exit up together - smoother and more gradual
            gsap.to(
                [question1Ref.current, question2Ref.current, question3Ref.current],
                {
                    y: -300,
                    opacity: 0,
                    ease: 'power2.in',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top -120%',
                        end: 'top -180%',
                        scrub: 1
                    }
                }
            );

            // Scroll text enters
            gsap.fromTo(
                scrollTextRef.current,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top -180%',
                        end: 'top -200%',
                        scrub: 1
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative w-full z-10" style={{ height: '320vh' }}>
            {/* Sticky container that slides up */}
            <div
                ref={stickyRef}
                className="sticky top-0 w-full h-screen overflow-hidden bg-background flex items-center justify-center"
                style={{ willChange: 'transform' }}
            >
                {/* Header */}
                <h1
                    ref={headerRef}
                    className="absolute text-6xl md:text-7xl lg:text-8xl font-anton font-bold text-primary text-center px-8"
                >
                    Stories Of Belonging
                </h1>

                {/* Question 1 */}
                <p
                    ref={question1Ref}
                    className="absolute italic text-xl md:text-2xl lg:text-2xl font-anton text-(--text) text-center px-8 max-w-4xl"
                >
                    How easy is it to integrate into local culture?
                </p>

                {/* Question 2 */}
                <p
                    ref={question2Ref}
                    className="absolute italic text-xl md:text-2xl lg:text-2xl font-anton text-(--text) text-center px-8 max-w-4xl"
                >
                    What are some challenges that you face?
                </p>

                {/* Question 3 */}
                <p
                    ref={question3Ref}
                    className="absolute italic text-xl md:text-2xl lg:text-2xl font-anton text-(--text) text-center px-8 max-w-4xl"
                >
                    Are you still able to find a home or community in Singapore?
                </p>

                {/* Scroll text */}
                <p
                    ref={scrollTextRef}
                    className="absolute text-xl md:text-2xl font-anton text-(--text) text-center px-8 max-w-xl"
                >
                    Keep scrolling to discover what our interviewees had to say about these questions
                </p>
            </div>
        </div>
    );
}
