import ScrollFloat from "./ui/scroll-float";

export function Stats() {
    return (
        <div
            className="text-4xl w-4/5 font-radio font-semibold text-primary flex flex-row text-wrap h-screen"
        >
            <div className="text-(--text) text-3xl">
                These are acculturative stressors that international students have to deal with daily
            </div>
            <div className="flew flex-col">
                <div className="h-1/4"></div>
                <ScrollFloat
                    animationDuration={2}
                    ease='power3.out'
                    scrollStart='center bottom=50%'
                    scrollEnd='bottom bottom-=30%'
                    stagger={0.03}
                >
                    perceived discrimination, homesickness, perceived hate, fear, culture shocks,
                    language barriers, guilt
                </ScrollFloat>
            </div>
        </div>
    )
}