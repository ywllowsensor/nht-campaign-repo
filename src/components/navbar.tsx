import PillNav from "./ui/pilll-nav";
import logo from "../../src/assets/globe.svg";

export function NavBar() {
    return (
        <div className="fixed bg-background top-0 left-0 right-0 z-50 flex flex-row items-center justify-center font-radio">
            <PillNav
                logo={logo}
                logoAlt="Company Logo"
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Experience Now', href: '/game' },
                    { label: 'Acknowledgements', href: '/acknowledgements' }
                ]}
                activeHref="/"
                className="custom-nav"
                ease="power2.easeOut"
                baseColor="var(--primary)"
                pillColor="var(--background-light)"
                hoveredPillTextColor="#ffffff"
                pillTextColor="var(--text)"
            />
        </div>
    )
}