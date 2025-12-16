"use client";
import { useState } from "react";
import LoadingFootprints from "./LoadingFootprints";

export default function LandingPage() {
  const [loadingFinished, setLoadingFinished] = useState(false);

  if (!loadingFinished) {
    return <LoadingFootprints onFinish={() => setLoadingFinished(true)} />; //set loadingFinished to true when LoadingFootprints calls onFinish
  }
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-between">
      {/*top ribbon and name */}
      <div className="flex flex-col items-center">
        <img
          src="/assets/ribbon.png"
          alt="ribbon"
          width={450}
          className="filter brightness-90 sepia-50 saturate-150"
        />
        <div className="heading mt-0">
          <h1 className="text-6xl font-bold">Pantaree Wechsathol</h1>
          <p className="text-4xl font-semibold">is proud to present</p>
        </div>
      </div>
      {/*castle and map text */}
      <div className="relative w-full flex flex-col items-center mt-6">
        <img
          src="/assets/castle.png"
          alt="castle"
          className="w-3/4 max-w-[400px] h-auto -translate-x-5"
        />
        <h2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4 -mt-3 map-name text-[1rem] sm:text-[1.2rem] lg:text-[1.3rem] font-semibold cursor-pointer animate-pulse [animation-duration:2500ms]">
          Pantaree's <br /> Magical Map
        </h2>
        {/* Instruction parchment box */}
        <div className="absolute top-0 right-2 lg:right-[18%] px-4 py-2 bg-[#e9d1a2] text-[#430000] rounded shadow-lg text-sm md:text-base">
          Click the map to view my journey
        </div>
      </div>

      {/* Bottom chunk of words */}
      <div className="mb-8 text-center space-y-1">
        <p>Curiosity • Coding • UX • Problem-Solving • Creativity</p>
        <p>React • Next.js • Tailwind • TypeScript</p>
        <p>AI Integration • Rapid Prototyping • Storytelling</p>
      </div>
    </div>
  );
}
