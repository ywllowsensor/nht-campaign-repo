// "use client";
// import React from "react";

// import { AnimatePresence, motion } from "motion/react";
// import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

// import localRini from "../assets/images/DSCF9579.jpg";
// import localDuy from "../assets/images/IMG_9547.JPG";
// import localZS from "../assets/images/IMG_9576_edited.JPG";

// export function CanvasRevealEffectDemo() {
//     return (
//         <>
//             <div className="py-20 flex flex-col lg:flex-row items-center justify-center bg-background w-full gap-4 mx-auto px-8">
//                 <Card
//                     title="This is Selwyn. Selwyn has been in Singapore for almost 1 year. Growing up in Indonesia..."
//                     icon={<AceternityIcon />}
//                     image={localZS}
//                 >
//                     <CanvasRevealEffect
//                         animationSpeed={5.1}
//                         containerClassName="bg-secondary"
//                     />
//                 </Card>
//                 <Card 
//                     title="Meet Rini! 3 months ago, Rini could not fathom what life in Singapore would be like. Today, ..." 
//                     icon={<AceternityIcon />}
//                     image={localRini}
//                 >
//                     <CanvasRevealEffect
//                         animationSpeed={3}
//                         containerClassName="bg-black"
//                         colors={[
//                             [236, 72, 153],
//                             [232, 121, 249],
//                         ]}
//                         dotSize={2}
//                     />
//                     {/* Radial gradient for the cute fade */}
//                     <div className="absolute inset-0 mask-[radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
//                 </Card>
//                 <Card 
//                     title="Many people may not get his name right on the first try. Duy (pronounced zwee), orginally from Vietnam! Duy ..." 
//                     icon={<AceternityIcon />}
//                     image={localDuy}
//                 >
//                     <CanvasRevealEffect
//                         animationSpeed={3}
//                         containerClassName="bg-sky-600"
//                         colors={[[125, 211, 252]]}
//                     />
//                 </Card>
//             </div>
//         </>
//     );
// }

// const Card = ({
//     title,
//     icon,
//     children,
//     image,
// }: {
//     title: string;
//     icon: React.ReactNode;
//     children?: React.ReactNode;
//     image: string;
// }) => {
//     const [hovered, setHovered] = React.useState(false);
//     return (
//         <div
//             onMouseEnter={() => setHovered(true)}
//             onMouseLeave={() => setHovered(false)}
//             className="border border-emerald-300 group/canvas-card flex items-center justify-center dark:border-white/20  max-w-sm w-full mx-auto p-4 relative h-120"
//         >
//             {/* background image (if provided) */}
//             {image && (
//                 <img
//                     src={image}
//                     alt={title}
//                     className="absolute inset-0 w-full h-full object-cover z-0 rounded-md"
//                 />
//             )}

//             <Icon className="absolute h-6 w-6 -top-3 -left-3 text-black dark:text-white" />
//             <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-black dark:text-white" />
//             <Icon className="absolute h-6 w-6 -top-3 -right-3 text-black dark:text-white" />
//             <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-black dark:text-white" />

//             <AnimatePresence>
//                 {hovered && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         className="h-full w-full absolute inset-0 flex items-center justify-center bg-black/60"
//                     >
//                         {children}
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             <div className="relative z-20">
//                 <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full  mx-auto flex items-center justify-center">
//                     {icon}
//                 </div>
//                 <h2 className="dark:text-white text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
//                     {title}
//                 </h2>
//             </div>
//         </div>
//     );
// };

// const AceternityIcon = () => {
//     return (
//         <svg
//             width="66"
//             height="65"
//             viewBox="0 0 66 65"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-10 w-10 text-black dark:text-white group-hover/canvas-card:text-white "
//         >
//             <path
//                 d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
//                 stroke="currentColor"
//                 strokeWidth="15"
//                 strokeMiterlimit="3.86874"
//                 strokeLinecap="round"
//                 style={{ mixBlendMode: "darken" }}
//             />
//         </svg>
//     );
// };

// export const Icon = ({ className, ...rest }: any) => {
//     return (
//         <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="1.5"
//             stroke="currentColor"
//             className={className}
//             {...rest}
//         >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
//         </svg>
//     );
// };
