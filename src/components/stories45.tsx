import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import localAashna from "../assets/images/aashna-portrait.png";
import localDuy from "../assets/images/duy-portrait.png";

gsap.registerPlugin(ScrollTrigger);

// Sample data for 2 persons (stories 4 and 5)
const personsData = [
    {
        id: 4,
        name: "Aashna",
        image: localAashna,
        title: "95 Days",
        description: `The journey of pursuing a PhD as an international student comes with unique challenges that extend far beyond the academic realm. The isolation of research work is amplified when you're thousands of miles away from your support system, and the pressure to publish and perform is constant.

Time zone differences mean that when I need emotional support the most, my family and friends back home are often asleep. Video calls can only do so much, and there are moments when I desperately miss the comfort of physical presence and familiar surroundings.

Financial constraints are particularly challenging at the PhD level. While I have a stipend, it barely covers living expenses in an expensive city. Watching my peers back home establish their careers and financial independence while I'm still a student can be disheartening.

The imposter syndrome hits differently as an international student. I constantly question whether I belong in this academic space, whether my research is valuable enough, and whether I'm living up to the sacrifices my family made to support my education.

Yet, the international student community in my department has become my chosen family. We celebrate each other's small victories, support each other through setbacks, and remind each other why we started this journey. These connections make the struggle worthwhile.`
    },
    {
        id: 5,
        name: "Duy",
        image: localDuy,
        title: "2201 Days",
        description: `Navigating professional networking as an international student adds another layer of complexity to an already challenging graduate experience. Career fairs and networking events can feel intimidating when you're constantly aware of visa restrictions and sponsorship requirements.

The job search process is exhausting. Every application comes with the anxiety of whether companies will be willing to sponsor a work visa. Rejections feel more personal when you know it's not just about your qualifications, but also about your international status.

Mental health support is crucial but often difficult to access. Cultural differences in how mental health is perceived and discussed made it hard for me to initially seek help. When I finally did, finding a counselor who understood both my academic pressures and cultural background took time.

Building a professional network while managing cultural differences requires extra effort. I've learned to be more assertive in introducing myself, following up with contacts, and advocating for my skills - behaviors that felt uncomfortable at first but are essential for career success here.

Despite these challenges, I've developed resilience and adaptability that will serve me well throughout my career. The experience of navigating two different cultural and professional landscapes has given me unique perspectives and skills that I wouldn't trade for anything.`
    }
];

export function Stories45() {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageColumnRef = useRef<HTMLDivElement>(null);
    const section1Ref = useRef<HTMLDivElement>(null);
    const section2Ref = useRef<HTMLDivElement>(null);
    const image1Ref = useRef<HTMLDivElement>(null);
    const image2Ref = useRef<HTMLDivElement>(null);

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
                },
                onEnterBack: () => {
                    gsap.set(image1Ref.current, { opacity: 1 });
                    gsap.set(image2Ref.current, { opacity: 0 });
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
                },
                onEnterBack: () => {
                    gsap.set(image1Ref.current, { opacity: 0 });
                    gsap.set(image2Ref.current, { opacity: 1 });
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative w-full bg-background py-20">
            <div className="container mx-auto px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column - Scrolling Text Content */}
                    <div className="space-y-32 lg:order-1">
                        {/* Person 1 (Story 4 - Aashna) */}
                        <div ref={section1Ref} className="min-h-screen w-3/5 ml-auto text-right flex flex-col justify-center">
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

                        {/* Person 2 (Story 5 - Zhi Hsuen) */}
                        <div ref={section2Ref} className="min-h-screen w-3/5 ml-auto text-right flex flex-col justify-center">
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
                    </div>

                    {/* Right Column - Fixed Image */}
                    <div ref={imageColumnRef} className="relative h-screen flex items-start justify-start lg:order-2">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
