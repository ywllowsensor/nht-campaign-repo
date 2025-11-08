import { HeroVideoDialogDemoTopInBottomOut } from "@/components/herovideodialogdemo"
import { Landing } from "@/components/landing"
import { NavBar } from "@/components/navbar"
import { Stories } from "@/components/stories"
import { Stories45 } from "@/components/stories45"
import { Burden } from "@/components/burden"
import { AcculturativeStress } from "@/components/acculturative-stress"
import { GameIntro } from "@/components/game-intro"
import { CallToAction } from "@/components/call-to-action"


export function HomePage() {
    return (
        <div className='flex flex-col w-full justify-around items-center bg-background'>
            <NavBar />

            {/* landing page */}
            <Landing />

            {/* stories section */}
            <Stories />

            {/* stories 4-5 section with swapped layout */}
            <Stories45 />

            {/* quotes section - invisible emotional load */}
            <Burden />

            {/* acculturative stress definition */}
            <AcculturativeStress />

            {/* game introduction - comic style */}
            <GameIntro />

            {/* short documentary */}
            <HeroVideoDialogDemoTopInBottomOut />

            {/* call to action */}
            <CallToAction />
        </div>
    )
}