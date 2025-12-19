"use client";
import { Typewriter } from "react-simple-typewriter";

export default function Instruction() {
  return (
    <div className="whitespace-pre-wrap font-semibold map-title opacity-70 text-xs sm:text-base">
      <Typewriter
        words={[
          "Instructions",
          `Point your wand to:
            TOP LEFT to reveal SKILLS
            TOP RIGHT to reveal ABOUT ME
            BOTTOM LEFT to reveal EXPERIENCE
            BOTTOM RIGHT to reveal PROJECTS`,
        ]}
        loop={1} // number of loops
        cursor // show blinking cursor
        cursorStyle="|"
        typeSpeed={50}
        deleteSpeed={30}
        delaySpeed={800} // pause before typing next
      />
    </div>
  );
}
