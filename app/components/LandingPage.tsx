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
      <div className="relative w-full flex flex-col items-center mt-0">
        <img
          src="/assets/castle.png"
          alt="castle"
          className="w-3/4 max-w-[400px] h-auto -translate-x-5"
        />
        <h2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4 -mt-3 map-name text-[1rem] sm:text-[1.2rem] lg:text-[1.3rem] font-semibold cursor-pointer animate-pulse">
          Pantaree's <br /> Magical Map
        </h2>
      </div>
      {/*instruction box */}
      <div className="relative flex flex-col items-center mb-2 -mt-4">
        <img
          src="/assets/box.png"
          alt="instruction ribbon"
          className="w-3/4 max-w-[500px] max-h-36 filter brightness-90 sepia-50 saturate-150"
        />
        {/*text inside box */}
        <svg
          viewBox="0 0 500 120"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <path
            id="ribbonPath"
            d="M 12 70 Q 300 60 480 10"
            fill="transparent"
          />
          <text
            fill="#3b2f1a"
            fontSize="16"
            fontFamily="var(--font-map-body)"
            textAnchor="middle"
            fontWeight={600}
          >
            <textPath href="#ribbonPath" startOffset="50%">
              Click the map to view my journey
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
}
