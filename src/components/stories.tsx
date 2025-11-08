import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import localSelwyn from "../assets/images/selwyn-portrait.png";
import localShayona from "../assets/images/shayona-portrait.png";
import localZhihsuen from "../assets/images/zhihsuen-portrait.png";

gsap.registerPlugin(ScrollTrigger);

// Sample data for 3 persons
const personsData = [
    {
        id: 1,
        name: "Selwyn",
        image: localSelwyn,

        title: "First Year Exchange Student",
        description: `Moving to a new country for studies was both exhilarating and terrifying. The first few weeks were a whirlwind of emotions - excitement about new opportunities mixed with homesickness and culture shock. Simple tasks like ordering food or navigating public transport became daily challenges that tested my confidence.

Language barriers made everything more difficult. Even though I studied English for years, understanding local accents and slang was completely different from textbook learning. I found myself nodding along to conversations I didn't fully understand, too embarrassed to ask people to repeat themselves.

The academic system was also very different from what I was used to. The emphasis on independent learning and critical thinking was refreshing but overwhelming. I had to unlearn passive learning habits and become more vocal in class discussions, which went against everything I'd been taught about respecting authority and not standing out.

Despite these challenges, I slowly found my community. International student groups became my support system, where we could share our struggles and celebrate small victories together. I learned that everyone was going through similar experiences, and that made me feel less alone in this journey.`
    },
    {
        id: 2,
        name: "Shayona",
        image: localShayona,
        title: "Graduate Research Assistant",
        description: `The pressure to succeed academically while managing financial stress is constant. As an international student, I pay significantly higher tuition fees and can't work off-campus, which limits my income opportunities. Every expense needs to be carefully calculated.

Beyond finances, there's the invisible burden of representing my entire country and culture. People often make assumptions or ask me to speak for all people from my background, as if I'm a cultural ambassador rather than an individual student. This weight of representation is exhausting.`
    },
    {
        id: 3,
        name: "Zhi Hsuen",
        image: localZhihsuen,
        title: "Senior International Student",
        description: `After three years here, I've found my rhythm, but the question of belonging still lingers. I'm no longer quite the same person I was when I left home, yet I don't fully belong here either. This sense of being between two worlds is both liberating and isolating.

I've learned to embrace my hybrid identity - taking the best from both cultures and creating something uniquely mine. My friend group is wonderfully diverse, and we've built our own little international community where everyone's background is celebrated.

The friendships I've made here are deep and meaningful, forged through shared experiences of navigating life in a foreign land. We understand each other's struggles without needing to explain them. These connections have become my anchor.

Looking back, I'm grateful for this journey. The challenges have shaped me into a more resilient, adaptable, and empathetic person. I've learned that home isn't just a place - it's the people you connect with and the sense of belonging you create wherever you are.

As graduation approaches, I face new questions about where I belong and where my future lies. But I've learned that it's okay not to have all the answers. The journey of finding belonging is ongoing, and that's perfectly fine.`
    }
];

export function Stories() {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageColumnRef = useRef<HTMLDivElement>(null);
    const section1Ref = useRef<HTMLDivElement>(null);
    const section2Ref = useRef<HTMLDivElement>(null);
    const section3Ref = useRef<HTMLDivElement>(null);
    const image1Ref = useRef<HTMLDivElement>(null);
    const image2Ref = useRef<HTMLDivElement>(null);
    const image3Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !imageColumnRef.current) return;

        const ctx = gsap.context(() => {
            // Pin the image column while content scrolls
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                pin: imageColumnRef.current,
                pinSpacing: false,
            });

            // Switch to image 1 when section 1 is in view (instant, no animation)
            ScrollTrigger.create({
                trigger: section1Ref.current,
                start: "top center",
                end: "bottom center",
                onEnter: () => {
                    gsap.set(image1Ref.current, { opacity: 1 });
                    gsap.set(image2Ref.current, { opacity: 0 });
                    gsap.set(image3Ref.current, { opacity: 0 });
                },
                onEnterBack: () => {
                    gsap.set(image1Ref.current, { opacity: 1 });
                    gsap.set(image2Ref.current, { opacity: 0 });
                    gsap.set(image3Ref.current, { opacity: 0 });
                },
            });

            // Switch to image 2 when section 2 is in view (instant, no animation)
            ScrollTrigger.create({
                trigger: section2Ref.current,
                start: "top center",
                end: "bottom center",
                onEnter: () => {
                    gsap.set(image1Ref.current, { opacity: 0 });
                    gsap.set(image2Ref.current, { opacity: 1 });
                    gsap.set(image3Ref.current, { opacity: 0 });
                },
                onEnterBack: () => {
                    gsap.set(image1Ref.current, { opacity: 0 });
                    gsap.set(image2Ref.current, { opacity: 1 });
                    gsap.set(image3Ref.current, { opacity: 0 });
                },
            });

            // Switch to image 3 when section 3 is in view (instant, no animation)
            ScrollTrigger.create({
                trigger: section3Ref.current,
                start: "top center",
                end: "bottom center",
                onEnter: () => {
                    gsap.set(image1Ref.current, { opacity: 0 });
                    gsap.set(image2Ref.current, { opacity: 0 });
                    gsap.set(image3Ref.current, { opacity: 1 });
                },
                onEnterBack: () => {
                    gsap.set(image1Ref.current, { opacity: 0 });
                    gsap.set(image2Ref.current, { opacity: 0 });
                    gsap.set(image3Ref.current, { opacity: 1 });
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative w-full bg-background py-20">
            <div className="container mx-auto px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column - Fixed Image */}
                    <div ref={imageColumnRef} className="relative h-screen flex items-start justify-end">
                        <div className="relative w-3/5 h-[400px]">
                            {/* Image 1 */}
                            <div
                                ref={image1Ref}
                                className="absolute inset-0 transition-opacity duration-500"
                                style={{ opacity: 1 }}
                            >
                                <img
                                    src={personsData[0].image}
                                    alt={personsData[0].name}
                                    className="w-full h-full object-scale-down"
                                />
                            </div>
                            {/* Image 2 */}
                            <div
                                ref={image2Ref}
                                className="absolute inset-0 transition-opacity duration-500"
                                style={{ opacity: 0 }}
                            >
                                <img
                                    src={personsData[1].image}
                                    alt={personsData[1].name}
                                    className="w-full h-full object-scale-down"
                                />
                            </div>
                            {/* Image 3 */}
                            <div
                                ref={image3Ref}
                                className="absolute inset-0 transition-opacity duration-500"
                                style={{ opacity: 0 }}
                            >
                                <img
                                    src={personsData[2].image}
                                    alt={personsData[2].name}
                                    className="w-full h-full object-scale-down"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Scrolling Text Content */}
                    <div className="space-y-32">
                        {/* Person 1 */}
                        <div ref={section1Ref} className="min-h-screen w-3/5 flex flex-col justify-center">
                            <h2 className="text-5xl font-anton text-primary mb-4">
                                {personsData[0].name}
                            </h2>
                            <h3 className="text-2xl font-radio font-semibold text-(--text) mb-8">
                                {personsData[0].title}
                            </h3>
                            <div className="text-lg font-radio text-(--text) leading-relaxed space-y-6">
                                {personsData[0].description.split('\n\n').map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>
                        </div>

                        {/* Person 2 */}
                        <div ref={section2Ref} className="min-h-screen w-3/5 flex flex-col justify-center">
                            <h2 className="text-5xl font-anton text-primary mb-4">
                                {personsData[1].name}
                            </h2>
                            <h3 className="text-2xl font-radio font-semibold text-(--text) mb-8">
                                {personsData[1].title}
                            </h3>
                            <div className="text-lg font-radio text-(--text) leading-relaxed space-y-6">
                                {personsData[1].description.split('\n\n').map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>
                        </div>

                        {/* Person 3 */}
                        <div ref={section3Ref} className="min-h-screen w-3/5 flex flex-col justify-center">
                            <h2 className="text-5xl font-anton text-primary mb-4">
                                {personsData[2].name}
                            </h2>
                            <h3 className="text-2xl font-radio font-semibold text-(--text) mb-8">
                                {personsData[2].title}
                            </h3>
                            <div className="text-lg font-radio text-(--text) leading-relaxed space-y-6">
                                {personsData[2].description.split('\n\n').map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}