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
        name: "Selwyn 🇮🇩",
        image: localSelwyn,
        title: "461 Days",
        description: `At first, it was a bit hard to blend in because the culture here is pretty different from what I am used to. But I have got really great suitemates, they are all super nice and welcoming, which made things so much easier. After a while, I started to pick up on the little things, especially the accent. Some of my friends back home even teased me, saying that I have started to sound Singaporean.

Honestly, the biggest challenge for me is the working culture here. Singapore's pace is just  really intense. Everyone is super driven, and sometimes I feel like I do not have quite the same mindset. It is not a bad thing, just a different rhythm that I am still learning to keep up with.

Even with the differences, I have managed to find my place here. Both local and international friends make it feel like a small home away from home. I think it is less about fitting in perfectly and more about finding people who make you feel like you belong.`
    },
    {
        id: 2,
        name: "Shayona 🇮🇳",
        image: localShayona,
        title: "97 Days",
        description: `I am a third culture kid, so I am pretty used to living in a new country. I chose Singapore because it offered a lot of benefits that not only pertain to academic opportunities but in terms of security. Integrating into the NUSC community has been really wonderful, because people are always willing to help out, and I have got a few local friends who have been teaching me a lot about Singlish, which I now know is very different from a regular Malaysian accent. 

The biggest challenge for me is interacting with people outside of the NUSC community. Shopkeepers can be quite short with me, especially in comparison to how they treat locals. So when I am going out by myself, it can be really daunting to ask for directions or help, because it feels like I am asking them for a huge favour?

I have only been here for a semester, so the answer is gonna be no. I still feel too new to the country, and I still feel very homesick. I call my parents every night, and I try my best to find a way to fly home whenever I can.`
    },
    {
        id: 3,
        name: "Zhi Hsuen 🇲🇾",
        image: localZhihsuen,
        title: "456 Days",
        description: `It was not too difficult for me since I am from Malaysia, and our cultures are quite similar. But there are still some differences, Singapore feels a bit more uptight and fast-paced compared to back home. It took some getting used to, especially the rhythm of life here.

The hardest part is being away from my family. It usually hits me during the school semester, when everyone else still has their families here while mine are back home. There are days when it gets a little lonely, but I try to keep myself busy and surround myself with good friends.

Friends definitely make a big difference. Building my own community here through school activities and clubs really helped me settle in. It is nice to have people around who share the same experiences, it makes Singapore start to feel a bit like home.`
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
                            <h3 className="text-2xl font-radio font-semibold text-primary mb-8">
                                {personsData[0].title}
                            </h3>
                            <div className="text-lg font-radio text-(--text) space-y-6">
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
                            <h3 className="text-2xl font-radio font-semibold text-primary mb-8">
                                {personsData[1].title}
                            </h3>
                            <div className="text-lg font-radio text-(--text) space-y-6">
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
                            <h3 className="text-2xl font-radio font-semibold text-primary mb-8">
                                {personsData[2].title}
                            </h3>
                            <div className="text-lg font-radio text-(--text) space-y-6">
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