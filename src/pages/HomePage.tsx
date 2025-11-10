import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { HeroVideoDialogDemoTopInBottomOut } from "@/components/herovideodialogdemo"
import { Landing } from "@/components/landing"
import { NavBar } from "@/components/navbar"
import { StoriesIntro } from "@/components/stories-intro"
import { Stories } from "@/components/stories"
import { Stories45 } from "@/components/stories45"
import { Burden } from "@/components/burden"
import { AcculturativeStress } from "@/components/acculturative-stress"
import { GameIntro } from "@/components/game-intro"
import { CallToAction } from "@/components/call-to-action"


export function HomePage() {
    const location = useLocation();

    useEffect(() => {
        // Check if we need to scroll to a specific section
        if (location.state?.scrollTo === 'game-intro') {
            // Small delay to ensure component is rendered
            setTimeout(() => {
                const gameIntroElement = document.getElementById('game-intro-section');
                if (gameIntroElement) {
                    gameIntroElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
            // Clear the state to prevent auto-scroll on subsequent renders
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    return (
        <div className='flex flex-col w-full justify-around items-center bg-background'>
            <NavBar />

            {/* landing page */}
            <Landing />

            {/* stories introduction with animated questions */}
            <StoriesIntro />

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