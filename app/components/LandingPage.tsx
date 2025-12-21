"use client";
import { useState, useEffect } from "react";
import LoadingFootprints from "./LoadingFootprints";
import CastleInstruction from "./CastleInstruction";
import Castle from "./Castle";
import MapSections from "./MapSections";
import WandOverlay from "./WandOverlay";
import MapInstruction from "./MapInstruction";
import ContentPopup from "./ContentPopup";

interface Section {
  name: string;
  x: number;
  y: number;
  content: {
    text: string;
    image?: string;
  }[];
}

export default function LandingPage() {
  const [loadingFinished, setLoadingFinished] = useState(false); //for loading footprints
  const [mapClicked, setMapClicked] = useState(false); //clicking castle
  //set cursor or wand position at the center of the page
  const [wandPosition, setWandPosition] = useState({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0, //set position to 0,0 if window not exist during server
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  });
  const [activeSection, setActiveSection] = useState<Section | null>(null); //section content that currently opened
  const [sections, setSections] = useState<Section[]>([]); //for rendering all sections
  const [pageIndex, setPageIndex] = useState(0); //index of content section page
  //mobile mode
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768; //check if app is opened on mobile
  const [footprintActive, setFootprintActive] = useState(false); //if footprint is currently animating
  const [footprintFrom, setFootprintFrom] = useState({ x: 0, y: 0 }); //start position of footprint
  const [footprintTo, setFootprintTo] = useState<{
    x: number;
    y: number;
  } | null>(null); //destination of footprint
  //set sectons after component mount since window not available on server
  useEffect(() => {
    //calculate screen size and sections positions
    const calculateSections = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      return [
        {
          name: "About Me",
          x: w - 150,
          y: 120,
          content: [
            { text: "Hi! I'm Pantaree, a curious and creative developer." },
            {
              text: "I love exploring new technologies and building interactive projects.",
            },
          ],
        },
        {
          name: "Experience",
          x: 150,
          y: h - 120,
          content: [
            {
              text: "Built a trading platform integrating web3 wallets.",
              image: "/assets/projects/trading-platform.png",
            },
            {
              text: "Worked on multiple full-stack web apps with React and Next.js.",
              image: "/assets/projects/fullstack-app.png",
            },
          ],
        },
        {
          name: "Projects",
          x: w - 150,
          y: h - 120,
          content: [
            {
              text: "Built a trading platform integrating web3 wallets.",
              image: "/assets/projects/trading-platform.png",
            },
            {
              text: "Worked on multiple full-stack web apps with React and Next.js.",
              image: "/assets/projects/fullstack-app.png",
            },
          ],
        },
        {
          name: "Skills",
          x: 150,
          y: 120,
          content: [
            { text: "Hi! I'm Pantaree, a curious and creative developer." },
            {
              text: "I love exploring new technologies and building interactive projects.",
            },
          ],
        },
      ];
    };

    setSections(calculateSections());
  }, []);

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
          {/*render footprint for mobile */}

          {/*no wand overlay when content popup is active */}
          {!activeSection && (
            <WandOverlay
              wandPosition={wandPosition}
              onWandMove={setWandPosition}
            />
          )}
          {/*map sections are clickable only if no content group */}
          {!activeSection && (
            <MapSections
              wandPosition={wandPosition}
              onSectionClick={(section) => {
                setActiveSection(section);
                setPageIndex(0); // reset page index when opening section
              }}
              sections={sections}
            />
          )}
          {/*map instruction */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="relative">
              {/*bg image */}
              <img
                src="/assets/instructionBox.png"
                alt="popup"
                className="w-auto h-70"
              />

              {/* Text on top of popup */}
              <div className="absolute inset-0 flex items-center justify-center">
                <MapInstruction
                  words={[
                    "Instructions",
                    `Point your wand to:
            TOP LEFT to reveal SKILLS
            TOP RIGHT to reveal ABOUT ME
            BOTTOM LEFT to reveal EXPERIENCE
            BOTTOM RIGHT to reveal PROJECTS`,
                  ]}
                />
              </div>
            </div>
          </div>
          {/*if section is selected*/}
          {activeSection && (
            <ContentPopup
              section={activeSection}
              pageIndex={pageIndex}
              onNext={() =>
                setPageIndex((i) =>
                  Math.min(i + 1, activeSection.content.length - 1)
                )
              }
              onPrev={() => setPageIndex((i) => Math.max(i - 1, 0))}
              onExit={() => setActiveSection(null)}
            />
          )}
          {/*mobile view */}
          {isMobile}
        </div>
      )}
    </div>
  );
}
