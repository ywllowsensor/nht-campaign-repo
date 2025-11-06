import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollVelocity from './ui/scroll-velocity';

import localDuy from "../assets/images/IMG_9547.jpg";
import localShayona from "../assets/images/DSCF9599.jpg";
import localSelwyn from "../assets/images/IMG_9615.jpg";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export function ScrollNarrative() {
    const containerRef = useRef<HTMLDivElement>(null);
    const horizontal1Ref = useRef<HTMLDivElement>(null);
    const story1Ref = useRef<HTMLDivElement>(null);
    const horizontal2Ref = useRef<HTMLDivElement>(null);
    const story3Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !horizontal1Ref.current || !story1Ref.current ||
            !horizontal2Ref.current || !story3Ref.current) return;

        const ctx = gsap.context(() => {
            // First diagonal scroll: Intro -> Story 1 (slides from bottom-right)
            const horizontal1Tween = gsap.fromTo(
                story1Ref.current,
                { x: '100vw', y: '100vh' },
                {
                    x: '0vw',
                    y: '0vh',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: horizontal1Ref.current,
                        start: 'top top',
                        end: '+=100%',
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                }
            );

            // Second scroll: Story 2 -> Story 3 (slides down from top)
            const horizontal2Tween = gsap.fromTo(
                story3Ref.current,
                { y: '-100vh' },
                {
                    y: '0vh',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: horizontal2Ref.current,
                        start: 'top top',
                        end: '+=100%',
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                }
            );

            return () => {
                horizontal1Tween.scrollTrigger?.kill();
                horizontal2Tween.scrollTrigger?.kill();
            };
        }, containerRef);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <div ref={containerRef} className="w-full bg-background">

            {/* First Horizontal Section: Intro -> Story 1 */}
            <div ref={horizontal1Ref} className="h-screen w-full relative overflow-hidden">
                {/* Intro Section (background) */}
                <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-background from-primary to-secondary">
                    <div className="text-center px-8">
                        <h1 className="text-7xl font-anton text-primary mb-6">
                            Stories of Belonging
                        </h1>
                        <p className="text-xl text-accent font-radio max-w-2xl mx-auto">
                            Scroll down to learn more about our international students
                        </p>
                    </div>
                </div>

                {/* Story 1 (slides in from right) */}
                <div ref={story1Ref} className="absolute inset-0 w-full h-full flex flex-col justify-evenly items-center bg-background pt-20">
                    <div className="container mx-auto px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="w-full h-[400px] overflow-visible shadow-2xl">
                                <img
                                    src={localDuy}
                                    alt="Student 1"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="space-y-6">
                                <p className="text-xl font-radio text-(--text) leading-relaxed">
                                    The first days in a new country are filled with excitement and uncertainty.
                                    Every street corner holds a new discovery, yet the weight of being far from
                                    home creates an undercurrent of loneliness that's hard to shake.
                                </p>
                                <p className="text-xl font-radio text-(--text)/90 leading-relaxed">
                                    Language barriers become more than just words – they're barriers to connection,
                                    to understanding, to feeling truly seen in this new place you're trying to call home.
                                </p>
                            </div>
                        </div>
                    </div>
                    <ScrollVelocity
                        texts={['Duy']}
                        velocity={100}
                        className="font-anton text-7xl text-primary"
                        numCopies={13}
                    />
                </div>
            </div>



            {/* Second Horizontal Section: Story 2 -> Story 3 */}
            <div ref={horizontal2Ref} className="h-screen w-full relative overflow-hidden">
                {/* Story 2 background (same as above but acts as base) */}
                <div className="absolute inset-0 w-full h-full flex flex-col justify-evenly items-center bg-background pt-20">
                    <div className="container mx-auto px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <p className="text-xl font-radio text-(--text) leading-relaxed">
                                    Slowly, the unfamiliar becomes familiar. You learn which bus to take,
                                    where the best coffee is, how to navigate the unspoken social rules
                                    that once felt like impenetrable mysteries.
                                </p>
                                <p className="text-xl font-radio text-(--text)/90 leading-relaxed">
                                    Yet adaptation is not linear. Some days you feel confident, integrated.
                                    Other days, a simple misunderstanding reminds you that you're still
                                    learning how to belong in this space between two worlds.
                                </p>
                            </div>
                            <div className="w-full h-[400px] overflow-hidden shadow-2xl">
                                <img
                                    src={localShayona}
                                    alt="Student 2"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                    <ScrollVelocity
                        texts={['Shayona']}
                        velocity={100}
                        className="font-anton text-7xl text-primary"
                        numCopies={7}
                    />
                </div>

                {/* Story 3 (slides in from right) */}
                <div ref={story3Ref} className="absolute inset-0 w-full h-full flex flex-col justify-evenly items-center bg-background pt-20">
                    <div className="container mx-auto px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="w-full h-[400px] overflow-hidden shadow-2xl">
                                <img
                                    src={localSelwyn}
                                    alt="Student 3"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="space-y-6">
                                <p className="text-xl font-radio text-(--text) leading-relaxed">
                                    Home, you realize, is not just a place. It's the people who understand
                                    your jokes in two languages, the friends who've seen you at your most
                                    vulnerable, the community you've built one connection at a time.
                                </p>
                                <p className="text-xl font-radio text-(--text)/90 leading-relaxed">
                                    You carry two homes now – the one you left and the one you're creating.
                                    And in that duality, you find strength, resilience, and a sense of
                                    belonging that transcends borders.
                                </p>
                            </div>
                        </div>
                    </div>
                    <ScrollVelocity
                        texts={['Selwyn']}
                        velocity={100}
                        className="font-anton text-7xl text-primary"
                        numCopies={11}
                    />
                </div>
            </div>

            {/* Vertical Section: Ending */}
            <section className="min-h-screen w-full flex items-center justify-center bg-background from-primary/20 to-background py-20">
                <div className="text-center px-8">
                    <p className="text-3xl font-anton text-secondary">
                        Every story is unique.<br />And every journey matters.
                    </p>
                </div>
            </section>
        </div>
    );
}