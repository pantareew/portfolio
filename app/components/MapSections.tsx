interface Section {
  name: string;
  xPct: number; //percentage of screen width for position x
  yPct: number; //percentage of screen height for position y
  content: string;
}
interface MapSectionsProps {
  wandPosition: { x: number; y: number };
  sections: Section[];
  onSectionClick: (content: string) => void;
}
export default function MapSections({
  wandPosition,
  sections,
  onSectionClick,
}: MapSectionsProps) {
  const revealRadius = 150; //wand light area
  return (
    //position under overlay
    <div className="absolute inset-0 z-20 pointer-events-none">
      {/*render sections */}
      {sections.map((section) => {
        //position of section based on size of screen
        const x = section.xPct * window.innerWidth;
        const y = section.yPct * window.innerHeight;

        const dx = wandPosition.x - x;
        const dy = wandPosition.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const isActive = distance <= revealRadius;
        return (
          <span
            key={section.name}
            className="absolute font-bold text-[#3b2f1a] cursor-pointer select-none pointer-events-auto transition-opacity duration-200"
            style={{
              left: x,
              top: y,
              transform: "translate(-50%, -50%)",
              opacity: isActive ? 1 : 0.25, //show section name only within reveal radius
              textShadow: "1px 1px 0 rgba(255,255,255,0.3)",
            }}
            onClick={() => isActive && onSectionClick(section.content)}
          >
            {section.name}
          </span>
        );
      })}
    </div>
  );
}
