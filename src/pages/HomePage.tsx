import { HeroVideoDialogDemoTopInBottomOut } from "@/components/herovideodialogdemo"
import { Landing } from "@/components/landing"
import { NavBar } from "@/components/navbar"
import { Stories } from "@/components/stories"
import { Burden } from "@/components/burden"
import { AcculturativeStress } from "@/components/acculturative-stress"
import { GameIntro } from "@/components/game-intro"


export function HomePage() {
    return (
        <div className='flex flex-col w-full justify-around items-center bg-background'>
            <NavBar />

            {/* landing page */}
            <Landing />

            {/* stories section */}
            <Stories />

            {/* quotes section - invisible emotional load */}
            <Burden />

            {/* acculturative stress definition */}
            <AcculturativeStress />

            {/* game introduction - comic style */}
            <GameIntro />

            {/* short documentary */}
            <HeroVideoDialogDemoTopInBottomOut />

            {/* summary of challenges + making sense of belonging */}
        </div>
    )
}