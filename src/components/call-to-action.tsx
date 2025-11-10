import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function CallToAction() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitle1Ref = useRef<HTMLParagraphElement>(null);
    const subtitle2Ref = useRef<HTMLParagraphElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !titleRef.current || !subtitle1Ref.current ||
            !subtitle2Ref.current || !cardsRef.current) {
            return;
        }

        const ctx = gsap.context(() => {
            // Title animation - slide from left
            gsap.fromTo(
                titleRef.current,
                {
                    x: -100,
                    opacity: 0
                },
                {
                    x: 0,
                    opacity: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                        end: 'top 30%',
                        scrub: 1
                    }
                }
            );

            // Subtitle 1 animation - fade and scale
            gsap.fromTo(
                subtitle1Ref.current,
                {
                    y: 30,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 75%',
                        end: 'top 25%',
                        scrub: 1
                    }
                }
            );

            // Subtitle 2 animation - fade and scale
            gsap.fromTo(
                subtitle2Ref.current,
                {
                    y: 30,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 70%',
                        end: 'top 20%',
                        scrub: 1
                    }
                }
            );

            // Cards animation - slide up with bounce
            gsap.fromTo(
                cardsRef.current,
                {
                    y: 100,
                    opacity: 0,
                    scale: 0.8
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 70%',
                        end: 'top 20%',
                        scrub: 1
                    }
                }
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const actions = [
        {
            emoji: '💬',
            title: 'Start a Conversation',
            description: 'Ask about their journey, their culture, their experiences. A simple "How are you settling in?" can mean everything.'
        },
        {
            emoji: '🤝',
            title: 'Extend an Invitation',
            description: 'Invite them to social gatherings, study groups, or community events. Help them feel at home here.'
        },
        {
            emoji: '👂',
            title: 'Listen & Learn',
            description: 'Be curious about their perspective. Understanding their challenges is the first step to meaningful support.'
        }
    ];

    return (
        <div
            ref={containerRef}
            className="relative w-full min-h-screen bg-primary pt-20 px-6 md:px-12 lg:px-20 overflow-hidden"
        >
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

            {/* Content container */}
            <div className="relative max-w-7xl mx-auto">
                {/* Header section */}
                <div className="text-center mb-8">
                    <h2
                        ref={titleRef}
                        className="text-5xl md:text-6xl lg:text-7xl font-anton font-bold mb-4"
                        style={{
                            color: 'var(--text)',
                            textShadow: '3px 3px 0 rgba(0,0,0,0.1)'
                        }}
                    >
                        Take the First Step
                    </h2>
                    <p
                        ref={subtitle1Ref}
                        className="text-2xl md:text-3xl font-radio mb-2"
                        style={{ color: 'var(--text)', opacity: 0.9 }}
                    >
                        You've walked in their shoes. Now reach out.
                    </p>
                    <p
                        ref={subtitle2Ref}
                        className="text-xl md:text-2xl font-radio"
                        style={{ color: 'var(--text)', opacity: 0.8 }}
                    >
                        Every act of empathy creates a ripple of belonging.
                    </p>
                </div>

                {/* Action cards */}
                <div
                    ref={cardsRef}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
                >
                    {actions.map((action, index) => (
                        <div
                            key={index}
                            className="group relative bg-background/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 border-primary/80 hover:border-primary/50"
                        >
                            {/* Emoji icon with glow effect */}
                            <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300 filter group-hover:drop-shadow-[0_0_15px_rgba(255,107,107,0.5)]">
                                {action.emoji}
                            </div>
                            <h3 className="text-2xl font-anton font-bold text-primary mb-3">
                                {action.title}
                            </h3>
                            <p className="text-lg font-radio leading-relaxed" style={{ color: 'var(--text)', opacity: 0.8 }}>
                                {action.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Decorative quote marks */}
                <div className="absolute top-20 left-0 text-[200px] font-anton text-(--text) rotate-348 leading-none select-none pointer-events-none"
                    style={{
                        textShadow: '3px 3px 0 rgba(0,0,0,0.1)'
                    }}>
                    “
                </div>
                <div className="absolute top-20 right-0 text-[200px] font-anton text-(--text) rotate-12 leading-none select-none pointer-events-none"
                    style={{
                        textShadow: '3px 3px 0 rgba(0,0,0,0.1)'
                    }}>
                    ”
                </div>
            </div>
        </div>
    );
}
