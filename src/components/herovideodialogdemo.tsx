import { HeroVideoDialog } from "./ui/hero-video-dialog"
import thumbnail from "../assets/images/thumbnail.png"

export function HeroVideoDialogDemoTopInBottomOut() {
  return (
    <div className="relative w-4/5 mx-auto pt-20 pb-10">
      <HeroVideoDialog
        className="block dark:hidden"
        animationStyle="left-in-right-out"
        videoSrc="https://www.youtube.com/embed/s2LQtzjHCI0?si=xzFkegnwdTFLCTNJ"
        thumbnailSrc={thumbnail}
        thumbnailAlt="Documentary of International Students"
      />
    </div>
  )
}
