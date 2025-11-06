import { HeroVideoDialogDemoTopInBottomOut } from "@/components/herovideodialogdemo"
import { Landing } from "@/components/landing"
import { NavBar } from "@/components/navbar"
import { Stats } from "@/components/stats"
import { ScrollNarrative } from "@/components/stories"


export function HomePage() {
    return (
        <div className='flex flex-col justify-around items-center bg-background'>
            <NavBar />

            {/* landing page */}
            <Landing />

            {/* statistics about intl students */}
            <Stats />

            {/* stories of interviewees */}
            <ScrollNarrative />

            {/* game section */}
            

            {/* short documentary */}
            <HeroVideoDialogDemoTopInBottomOut />

            {/* summary of challenges + making sense of belonging */}
        </div>
    )
}