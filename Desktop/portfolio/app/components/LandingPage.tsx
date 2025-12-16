"use client";
import { useState } from "react";
import LoadingFootprints from "./LoadingFootprints";

export default function LandingPage() {
  const [loadingFinished, setLoadingFinished] = useState(false);

  if (!loadingFinished) {
    return <LoadingFootprints onFinish={() => setLoadingFinished(true)} />; //set loadingFinished to true when LoadingFootprints calls onFinish
  }
  return (
    <div className="relative w-full h-screen bg-[url('/assets/images/parchment.jpg')] bg-cover bg-center flex flex-col items-center justify-between">
      {/* Top ribbon and intro text */}
      <div
        className="mt-24 text-center text-amber-900"
        style={{ fontFamily: "var(--font-map-title)" }}
      >
        <h1 className="text-6xl font-bold">Pantaree Wechsathol</h1>
        <p className="text-4xl font-semibold">is proud to present</p>
      </div>

      {/* Center castle + map text */}
      <div className="flex flex-col items-center">
        <img
          src="/assets/images/castle.svg"
          alt="Castle"
          className="w-64 h-auto"
        />
        <h2 className="mt-4 text-3xl font-semibold cursor-pointer animate-pulse">
          The Journey of Pantaree
        </h2>
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
