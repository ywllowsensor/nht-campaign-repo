"use client";
import { MaskContainer } from "@/components/ui/svg-mask-effect";
import globeText from "../assets/globe-text.png";

export function SVGMaskEffectDemo() {
  return (
    <div className="flex h-full w-full items-center justift-center overflow-visible">
      <MaskContainer
        revealText={
          <p className="mx-auto text-7xl text-start font-anton font-bold text-(--text) dark:text-white">
            Internati
            <span className="inline-flex items-center">
              <img
                src={globeText}
                className="inline-block h-[1em]"
              />
            </span>
            nal Students: {" "}
            <span className="text-primary">Finding Their Place</span>
          </p>
        }
        className="h-full max-w-3xl rounded-md"
      >
        <p className="text-7xl font-anton font-bold text-start text-(--text)">
          The {" "}
          <span className="text-primary">unseen cost</span>
          {" "}  of belonging
        </p>
      </MaskContainer>
    </div>
  );
}
