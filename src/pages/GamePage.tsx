import { NavBar } from "@/components/navbar";
import { DecisionGame } from "@/components/DecisionGame";

export function GamePage() {
    return (
        <div className='flex flex-col justify-around items-center'>
            <NavBar />
            <DecisionGame />
        </div>
    )
}