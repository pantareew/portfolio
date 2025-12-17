interface CastleInstructionProps {
  text: string;
}

export default function CastleInstruction({ text }: CastleInstructionProps) {
  return (
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
        <path id="ribbonPath" d="M 12 70 Q 300 60 480 10" fill="transparent" />
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
  );
}
