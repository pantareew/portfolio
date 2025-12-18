"use client";
import { Typewriter } from "react-simple-typewriter";

export default function Instruction() {
  return (
    <div className="whitespace-pre-wrap font-semibold map-title opacity-70 text-xs md:text-lg">
      <Typewriter
        words={[
          "Instructions",
          `Point your wand to:
            TOP LEFT to reveal ABOUT ME
            TOP RIGHT to reveal PROJECTS
            BOTTOM LEFT to reveal EXPERIENCE
            BOTTOM RIGHT to reveal SKILLS`,
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
