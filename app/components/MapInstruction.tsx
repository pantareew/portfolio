"use client";
import { Typewriter } from "react-simple-typewriter";
interface MapInstructionProps {
  words: string[];
}
export default function MapInstruction({ words }: MapInstructionProps) {
  return (
    <div className="whitespace-pre-wrap font-semibold map-title opacity-70 text-xs sm:text-base">
      <Typewriter
        words={words}
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
