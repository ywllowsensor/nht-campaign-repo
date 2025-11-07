import { SVGMaskEffectDemo } from "./svgmaskdemo"
import coverimg from "../assets/images/cover-page-img.png"
import AnimatedContent from "./ui/animated-content"
import { Stats } from "./stats"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function Landing() {
    const imageRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        if (!imageRef.current) return

        const ctx = gsap.context(() => {
            // Fade out the cover image as the user scrolls down away from the landing
            gsap.fromTo(
                imageRef.current,
                { opacity: 1 },
                {
                    opacity: 0.4,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: 'top top',
                        // complete fade gradually over the full viewport height
                        end: 'bottom top',
                        scrub: 1,
                    },
                }
            )
        })

        return () => ctx.revert()
    }, [])

    return (
        <div className="w-full">
            {/* Fixed Background Image */}
            <div className="fixed top-0 left-0 w-full h-screen">
                <img
                    ref={imageRef}
                    src={coverimg}
                    alt="Cover"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Scrolling Text Overlay - positioned at bottom-right */}
            <div className="relative z-10 h-screen flex flex-row items-end justify-end pb-12 pr-12">
                <div className="max-w-full">
                    <SVGMaskEffectDemo />
                </div>
            </div>

            {/* Spacer that will cover the image as user scrolls */}
            <div className="relative z-20 w-screen h-screen bg-background">
                <Stats />
            </div>
        </div>
    )
}