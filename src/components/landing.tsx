import { SVGMaskEffectDemo } from "./svgmaskdemo"
import coverimg from "../assets/images/cover-page-img.png"
import AnimatedContent from "./ui/animated-content"

export function Landing() {
    return (
        <div className="grid grid-cols-5 justify-center">
            <div className="col-span-3 flex items-center justify-center h-160">
                <AnimatedContent
                    distance={150}
                    direction="horizontal"
                    reverse={false}
                    duration={1}
                    ease="power3.out"
                    initialOpacity={0}
                    animateOpacity
                    scale={0.5}
                    threshold={0.3}
                    delay={0.3}
                >
                    <img
                        src={coverimg}
                    />
                </AnimatedContent>
            </div>
            <div className="col-span-2">
                <SVGMaskEffectDemo />
            </div>

        </div>
    )
}