interface WandOverlayProps {
  wandPosition: { x: number; y: number };
  onWandMove: (pos: { x: number; y: number }) => void; //function to set wand position
  radius?: number; //size of glowy light
}

export default function WandOverlay({
  wandPosition,
  onWandMove,
  radius = 150,
}: WandOverlayProps) {
  //update wand position when mouse moves
  const handleMouseMove = (e: React.MouseEvent) => {
    onWandMove({ x: e.clientX, y: e.clientY });
  };
  return (
    //top element on the stack
    <div
      className="absolute inset-0 z-10 pointer-events-auto" //create overlay and receive mouse movement on overlay for updating wand position
      onMouseMove={handleMouseMove}
    >
      {/*wand light */}
      {wandPosition && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${wandPosition.x}px ${wandPosition.y}px, rgba(0,0,0,0) 0px, rgba(0,0,0,0.75) ${radius}px)`,
          }}
        />
      )}
      {/*wand image */}
      {wandPosition && (
        <img
          src="/assets/wand.png"
          alt="wand"
          className="absolute w-48  h-auto pointer-events-none z-30"
          //align tip of wand with cursor
          style={{
            left: wandPosition.x,
            top: wandPosition.y,
            transform: "translate(-20%, -5%)",
          }}
        />
      )}
    </div>
  );
}
