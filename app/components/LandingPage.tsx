"use client";
import { useState, useEffect } from "react";
import LoadingFootprints from "./LoadingFootprints";
import CastleInstruction from "./CastleInstruction";
import Castle from "./Castle";
import MapSections from "./MapSections";
import WandOverlay from "./WandOverlay";

export default function LandingPage() {
  const [loadingFinished, setLoadingFinished] = useState(false); //for loading footprints
  const [mapClicked, setMapClicked] = useState(false); //clicking castle
  //set cursor or wand position at the center of the page
  const [wandPosition, setWandPosition] = useState({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0, //set position to 0,0 if window not exist during server
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  });

  const [activeContent, setActiveContent] = useState<string | null>(null); //section content that currently shown

  //sections on map
  const sections = [
    {
      name: "About Me",
      xPct: 0.5, //percent
      yPct: 0.2, //percent
      content: "Passion, Curiosity, Creativity",
    },
    {
      name: "Projects",
      xPct: 0.2,
      yPct: 0.5,
      content: "Internships, Projects, Startups",
    },
    {
      name: "Experience",
      xPct: 0.8,
      yPct: 0.5,
      content: "Next.js, Python, Web Development",
    },
    {
      name: "Skills",
      xPct: 0.5,
      yPct: 0.8,
      content: "Email, LinkedIn, GitHub",
    },
  ];
  if (!loadingFinished) {
    return <LoadingFootprints onFinish={() => setLoadingFinished(true)} />; //set loadingFinished to true when LoadingFootprints calls onFinish
  }
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-between">
      {!mapClicked ? (
        <>
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
          <Castle onClick={() => setMapClicked(true)} />
          {/*instruction box */}

          <CastleInstruction text="Click the map to view my journey" />
        </>
      ) : (
        <div className="relative w-full h-screen overflow-hidden">
          <WandOverlay
            wandPosition={wandPosition}
            onWandMove={setWandPosition}
          />
          <MapSections
            wandPosition={wandPosition}
            onSectionClick={setActiveContent}
            sections={sections}
          />
          {/*if section is selected*/}
          {activeContent && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 bg-yellow-100 p-6 rounded-lg shadow-lg text-[#3b2f1a] text-lg">
              {activeContent}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
