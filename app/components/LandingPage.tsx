"use client";
import { useState, useEffect } from "react";
import LoadingFootprints from "./LoadingFootprints";
import CastleInstruction from "./CastleInstruction";
import Castle from "./Castle";
import MapSections from "./MapSections";
import WandOverlay from "./WandOverlay";
import MapInstruction from "./MapInstruction";
import ContentPopup from "./ContentPopup";
import FootprintNav from "./FootprintNav";
import { title } from "process";

type NavMode = "wand" | "footprint";
interface Section {
  name: string;
  x: number;
  y: number;
  content: {
    title?: string;
    description: string;
    tech?: string[];
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

  //sections and content popup
  const [activeSection, setActiveSection] = useState<Section | null>(null); //section content that currently opened
  const [sections, setSections] = useState<Section[]>([]); //for rendering all sections
  const [pageIndex, setPageIndex] = useState(0); //index of content section page
  //mobile mode
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640; //check if app is opened on mobile
  const [selectedSection, setSelectedSection] = useState<Section | null>(null); //destination section
  const [footprintActive, setFootprintActive] = useState(false); //activate footprint to animate
  const [footprintTo, setFootprintTo] = useState<{
    x: number;
    y: number;
  } | null>(null); //destination position of footprint
  //instruction box position for footprint start point
  const [instructionBoxPosition, setInstructionBoxPosition] = useState({
    x: 0,
    y: 0,
  });
  const [navMode, setNavMode] = useState<NavMode>("wand"); //navigation mode - default mode is wand
  //force mobile to footprint mode
  useEffect(() => {
    if (isMobile) {
      setNavMode("footprint");
    }
  }, [isMobile]);

  //update instruction box position
  useEffect(() => {
    const updatePosition = () => {
      setInstructionBoxPosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });
    };
    updatePosition(); //initial position
    window.addEventListener("resize", updatePosition); //call updateposition() if screen changes
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  //set sectons after component mount since window not available on server
  useEffect(() => {
    //calculate screen size and sections positions
    const calculateSections = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      //tailwind breakpoints: sm-640px
      const isMobile = w < 640;
      //padding from edges based on screen size
      const paddingX = isMobile ? 100 : 150;
      const paddingY = isMobile ? 100 : 120;
      return [
        {
          name: "Experience",
          x: w - paddingX,
          y: paddingY,
          content: [
            {
              title: "Billmate",
              description:
                "A full-stack web application that simplifies shared expenses by combining intelligent bill splitting with AI-powered receipt parsing. Instead of manually entering bill details, users can upload a photo of their receipt, which is processed using OpenAI Vision to automatically extract key information such as the total amount and merchant name.\n Users can then assign the bill to a group, select participants, and split costs instantly, with real-time tracking of payments, approvals, and notifications.",
              tech: [
                "Next.js",
                "FastAPI",
                "TypeScript",
                "PostgreSQL",
                "Supabase",
                "OpenAI Vision",
              ],
              image: "/assets/billmate.png",
            },
            {
              description:
                "Hi! I'm Pantaree, a curious and creative developer.",
              image: "/assets/swinlead.png",
            },
            {
              description:
                "Hi! I'm Pantaree, a curious and creative developer.",
              image: "/assets/aod.png",
            },
          ],
        },
        {
          name: "Skills",
          x: paddingX,
          y: h - paddingY,
          content: [
            {
              description: "Built a trading platform integrating web3 wallets.",
              image: "/assets/usertune.png",
            },
            {
              description:
                "Worked on multiple full-stack web apps with React and Next.js.",
              image: "/assets/projects/fullstack-app.png",
            },
          ],
        },
        {
          name: "Projects",
          x: w - paddingX,
          y: h - paddingY,
          content: [
            {
              description: "Built a trading platform integrating web3 wallets.",
              image: "/assets/usertune.png",
            },
            {
              description:
                "Worked on multiple full-stack web apps with React and Next.js.",
              image: "/assets/trading.png",
            },
            {
              description:
                "Worked on multiple full-stack web apps with React and Next.js.",
              image: "/assets/baansub.png",
            },
          ],
        },
        {
          name: "About Me",
          x: paddingX,
          y: paddingY,
          content: [
            {
              description:
                "Hi there! Pantaree a curious and creative developer.",
            },
            {
              description:
                "She graduated Computer Science at Swinburne in December 2024.",
              image: "assets/urmate.png",
            },
          ],
        },
      ];
    };
    //initial calculation
    setSections(calculateSections());
    //handle window resize
    const handleResize = () => {
      setSections(calculateSections());
    };
    window.addEventListener("resize", handleResize); //call handleResize() if screen resize
    return () => {
      window.removeEventListener("resize", handleResize); //remove eventlistener
    };
  }, []);
  //handle section click for map sections
  const handleSectionClick = (section: Section) => {
    if (navMode === "footprint") {
      if (footprintActive) return; //not allow clicking section if footprint is moving
      setSelectedSection(section);
      setFootprintTo({ x: section.x, y: section.y });
      setFootprintActive(true);
    } else {
      //wand mode
      setActiveSection(section);
      setPageIndex(0);
    }
  };

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
          {/*desktop mode */}
          {!isMobile && (
            <>
              {/*Reveal All button for desktop*/}
              <button
                onClick={() =>
                  setNavMode((prev) => (prev === "wand" ? "footprint" : "wand"))
                }
                className={`absolute top-10 left-1/2 -translate-x-1/2 z-50 px-4 py-2
               rounded-full text-sm font-semibold
               ${navMode === "wand" ? "text-[#3b2f1a]" : "text-[#f6e7c8]"} 
               ${
                 navMode === "wand" ? "bg-[#f6e7c8]/50" : "bg-[#3b2f1a]/50"
               } backdrop-blur
               hover:scale-105 transition`}
              >
                {navMode === "wand" ? "Reveal All" : "Magic Mode"}
              </button>
              {/*wand overlay applies to wand navmode and when no content popup show*/}
              {navMode === "wand" && !activeSection && (
                <WandOverlay
                  wandPosition={wandPosition}
                  onWandMove={setWandPosition}
                />
              )}
            </>
          )}
          {/*github and linkedin buttons */}
          <div className="absolute flex justify-center gap-4 top-5 sm:top-auto sm:bottom-10 left-1/2 -translate-x-1/2 z-50">
            <a
              href="https://github.com/pantareew"
              target="_blank" //open new tab
              className={`px-5 py-2 rounded-full text-sm font-semibold backdrop-blur
               hover:scale-105 transition
                ${navMode === "wand" ? "text-[#3b2f1a]" : "text-[#f6e7c8]"} 
               ${navMode === "wand" ? "bg-[#f6e7c8]/50" : "bg-[#3b2f1a]/50"}`}
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/pantareew"
              target="_blank"
              className={`px-5 py-2 rounded-full text-sm font-semibold backdrop-blur
               hover:scale-105 transition
                ${navMode === "wand" ? "text-[#3b2f1a]" : "text-[#f6e7c8]"} 
               ${navMode === "wand" ? "bg-[#f6e7c8]/50" : "bg-[#3b2f1a]/50"}`}
            >
              LinkedIn
            </a>
          </div>
          {/*map instruction */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="relative flex justify-center">
              {/*bg image */}
              <img
                src="/assets/instructionBox.png"
                alt="popup"
                className={isMobile ? "w-3/4 max-w-sm h-auto" : "w-auto h-70"}
              />
              {/*text on top of background */}
              <div className="absolute inset-0 flex items-center justify-center text-center">
                <MapInstruction
                  key={navMode} //remount component when mode changes
                  words={
                    navMode === "wand"
                      ? [
                          "Reveal the Map\nPoint your wand to the corners of the map:\nTop Left: About Me\nTop Right: Experience\nBottom Left: Skills\nBottom Right: Projects\nClick 'Reveal All' to uncover every section!",
                        ]
                      : [
                          "Explore the Map\nTap a section to reveal its story\nFootprints will guide your path\nLet’s dive into my world!",
                        ]
                  }
                />
              </div>
            </div>
          </div>
          {/*map sections */}
          <MapSections
            sections={sections}
            wandPosition={navMode === "wand" ? wandPosition : undefined}
            showAllSections={navMode === "footprint"}
            onSectionClick={handleSectionClick}
          />
          {/*mobile mode / footprint mode */}
          {navMode === "footprint" && (
            <>
              {/*footprint navigation */}
              {footprintActive && footprintTo && selectedSection && (
                <FootprintNav
                  from={instructionBoxPosition}
                  to={footprintTo}
                  active={footprintActive}
                  onArrive={() => {
                    setFootprintActive(false); //reset footprint
                    setActiveSection(selectedSection); //shoow content popup
                    setSelectedSection(null);
                    setPageIndex(0); //reset page index
                  }}
                />
              )}
            </>
          )}
          {/*show content popup for selected section*/}
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
        </div>
      )}
    </div>
  );
}
