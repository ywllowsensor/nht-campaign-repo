import { HeroVideoDialogDemoTopInBottomOut } from "@/components/herovideodialogdemo"
import { Landing } from "@/components/landing"
import { NavBar } from "@/components/navbar"
import { Stats } from "@/components/stats"
import { Burden } from "@/components/burden"


export function HomePage() {
    return (
        <div className='flex flex-col w-full justify-around items-center bg-background'>
            <NavBar />

            {/* landing page */}
            <Landing />

            {/* stats section */}
            <Stats />

            {/* burden section - invisible emotional load */}
            <Burden />

            {/* short documentary */}
            <HeroVideoDialogDemoTopInBottomOut />

            {/* summary of challenges + making sense of belonging */}
        </div>
    )
}