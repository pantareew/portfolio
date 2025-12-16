//loading indicator
"use client";
import { useEffect, useState } from "react";

//what each footprint needs
type Step = {
  x: number; //horizontal position
  y: number; //vertical position
  rotation: number; //foot angle
};

export default function LoadingFootprints({
  onFinish, //prop
}: {
  onFinish: () => void; //takes function that returns nothing
}) {
  const [steps, setSteps] = useState<Step[]>([]); //all footprints currently on screen
  //run when component mounts
  useEffect(() => {
    let i = 0; //current footprint index
    const totalSteps = 12; //total footprints to show

    //set interval to drop a footprint every 280ms
    const interval = setInterval(() => {
      const t = i / totalSteps; //time between 0 (start) to 1 (end)

      //path
      const x = t * window.innerWidth; //x position
      const y = window.innerHeight / 2 + Math.sin(t * Math.PI) * 80; //y position (curve path)
      //add new step
      setSteps((prev) => [
        ...prev,
        {
          x,
          y,
          rotation: i % 2 === 0 ? -15 : 15, //every other step rotates left then right
        },
      ]);

      i++;
      //stop interval
      if (i > totalSteps) {
        clearInterval(interval);
        setTimeout(onFinish, 600); //pause briefly after last step then call onFinish
      }
    }, 280);
    return () => clearInterval(interval); //component unmounts, stop interval
  }, [onFinish]);

  return (
    <div className="fixed inset-0">
      {steps.map((step, index) => (
        <img
          key={index}
          src="/assets/footprint.png"
          alt="footprint"
          className="absolute w-10 opacity-0 animate-step"
          style={{
            left: step.x,
            top: step.y,
            transform: `rotate(${step.rotation}deg)`,
          }}
        />
      ))}
      {/*fade in and grow animation */}
      <style jsx>{`
        @keyframes step {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-step {
          animation: step 0.4s ease forwards;
        }
      `}</style>
    </div>
  );
}
