"use client";

import { useEffect, useState } from "react";

interface Footprint {
  x: number;
  y: number;
  rotation: number;
}

interface FootprintNavProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  active: boolean;
  onArrive: () => void;
}

export default function FootprintNav({
  from,
  to,
  active,
  onArrive,
}: FootprintNavProps) {
  const [footprints, setFootprints] = useState<Footprint[]>([]);

  useEffect(() => {
    if (!active) return;

    setFootprints([]); //reset when starting

    const totalSteps = 8; //total number of footprints
    const stepInterval = 300; //time between steps
    //calculate direction
    const dx = to.x - from.x;
    const dy = to.y - from.y;

    //calculate angle
    const angleRad = Math.atan2(dy, dx); //convert direction to angle
    const angleDeg = (angleRad * 180) / Math.PI; //rotation (walking up-footprint rotate up, walking down-footprint rotate down)

    let step = 0;

    const interval = setInterval(() => {
      step++;

      const progress = step / totalSteps;

      //base position
      const x = from.x + dx * progress;
      const y = from.y + dy * progress;

      //left-right stepping
      const sideOffset = step % 2 === 0 ? -8 : 8;

      const offsetX = Math.cos(angleRad + Math.PI / 2) * sideOffset;
      const offsetY = Math.sin(angleRad + Math.PI / 2) * sideOffset;

      setFootprints((prev) => [
        ...prev,
        {
          x: x + offsetX,
          y: y + offsetY,
          rotation: angleDeg,
        },
      ]);
      //last step
      if (step >= totalSteps) {
        clearInterval(interval);
        onArrive(); //open popup
      }
    }, stepInterval);

    return () => clearInterval(interval);
  }, [active, from, to, onArrive]);

  return (
    <>
      {footprints.map((footprint, i) => (
        <img
          key={i}
          src="/assets/footprint.png"
          alt="footstep"
          className="absolute w-10 pointer-events-none opacity-80"
          style={{
            left: footprint.x,
            top: footprint.y,
            transform: `translate(-50%, -50%) rotate(${footprint.rotation}deg)`,
          }}
        />
      ))}
    </>
  );
}
