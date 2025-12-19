interface Section {
  name: string;
  x: number; //percentage of screen width for position x
  y: number; //percentage of screen height for position y
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
        const dx = wandPosition.x - section.x;
        const dy = wandPosition.y - section.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const isActive = distance <= revealRadius;
        return (
          <div
            key={section.name}
            className="absolute cursor-pointer select-none pointer-events-auto "
            style={{
              left: section.x,
              top: section.y,
              transform: "translate(-50%, -50%)",
            }}
            onClick={() => isActive && onSectionClick(section.content)}
          >
            <div
              className={`font-bold text-xl map-title transition-all duration-300 ${
                isActive ? "scale-105 opacity-100" : "scale-100 opacity-30"
              }`}
            >
              {section.name.toLocaleUpperCase()}
            </div>
            {/*click to view section details */}
            {isActive && (
              <div className="mt-1 text-sm italic text-[#3b2f1a]/70 animate-pulse">
                Click to view details
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
