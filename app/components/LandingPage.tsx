"use client";
import { useState } from "react";
import LoadingFootprints from "./LoadingFootprints";
import CastleInstruction from "./CastleInstruction";
import Castle from "./Castle";

export default function LandingPage() {
  const [loadingFinished, setLoadingFinished] = useState(false); //for loading footprints
  const [mapClicked, setMapClicked] = useState(false); //clicking castle
  //cursor or wand position
  const [wandPosition, setwandPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [activeContent, setActiveContent] = useState<string | null>(null); //section content that currently shown
  //sections on map
  const sections = [
    {
      name: "About Me",
      x: window.innerWidth / 2,
      y: 100,
      content: "Passion, Curiosity, Creativity",
    },
    {
      name: "Projects",
      x: 100,
      y: window.innerHeight / 2,
      content: "Internships, Projects, Startups",
    },
    {
      name: "Experience",
      x: window.innerWidth - 100,
      y: window.innerHeight / 2,
      content: "Next.js, Python, Web Development",
    },
    {
      name: "Skills",
      x: 100,
      y: window.innerHeight - 100,
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
        <div className="relative w-full h-screen overflow-hidden"></div>
      )}
    </div>
  );
}
