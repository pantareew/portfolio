"use client";
import { useState, useEffect } from "react";
interface FootprintNavProps {
  from: { x: number; y: number }; //start position
  to: { x: number; y: number }; //destination section position
  active: boolean; //determine if animation run
  onArrive: () => void; //notify parent that it arrives destination
}

export default function FootprintNav({
  from,
  to,
  active,
  onArrive,
}: FootprintNavProps) {
  const [currentStep, setCurrentStep] = useState(0);
  useEffect(() => {
    if (!active) return;
    setCurrentStep(0);
    const duration = 1200;
    const start = performance.now();
    const animate = (time: number) => {
      const elapsed = time - start;
      const t = Math.min(elapsed / duration, 1);
      setCurrentStep(t);
      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        onArrive();
      }
    };
    requestAnimationFrame(animate);
  }, [active, onArrive]);
  if (!active) return null;
  const x = from.x + (to.x - from.x) * currentStep;
  const y = from.y + (to.y - from.y) * currentStep;

  return (
    <img
      src="/assets/footprints.png"
      alt="footsteps"
      className="absolute w-12 pointer-events-none"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}
