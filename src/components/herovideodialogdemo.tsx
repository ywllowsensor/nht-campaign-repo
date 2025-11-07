import { HeroVideoDialog } from "./ui/hero-video-dialog"

export function HeroVideoDialogDemoTopInBottomOut() {
  return (
    <div className="relative w-4/5 mx-auto pt-10">
      <HeroVideoDialog
        className="block dark:hidden"
        animationStyle="left-in-right-out"
        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
        thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
        thumbnailAlt="Hero Video"
      />
      
    </div>
  )
}
