import { SVGMaskEffectDemo } from "./svgmaskdemo"
import coverimg from "../assets/images/cover-page-img.png"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function Landing() {
    const containerRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current || !imageRef.current || !overlayRef.current) return

        const ctx = gsap.context(() => {
            // Pin the image container
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top top',
                end: 'bottom top',
                pin: imageRef.current,
                pinSpacing: false
            })

            // Fade in black overlay as the user scrolls down
            gsap.fromTo(
                overlayRef.current,
                { opacity: 0 },
                {
                    opacity: 0.9,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 1,
                    },
                }
            )
        })

        return () => ctx.revert()
    }, [])

    return (
        <div ref={containerRef} className="relative w-full h-screen">
            {/* Pinned Background Image */}
            <div ref={imageRef} className="absolute top-0 left-0 w-full h-screen">
                <img
                    src={coverimg}
                    alt="Cover"
                    className="w-full h-full object-cover"
                />
                {/* Black overlay that fades in */}
                <div 
                    ref={overlayRef}
                    className="absolute inset-0 bg-black pointer-events-none"
                    style={{ opacity: 0 }}
                />
            </div>

            {/* Scrolling Text Overlay - positioned at bottom-right */}
            <div className="relative z-10 h-screen flex flex-row items-end justify-end pb-12 pr-12">
                <div className="max-w-full">
                    <SVGMaskEffectDemo />
                </div>
            </div>
        </div>
    )
}