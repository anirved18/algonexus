"use client";

import { useEffect, useState } from "react";

const BAR_COUNT = 40;
const BASE_HEIGHT = 60;
const COLORS = ["#3B82F6", "#06B6D4", "#8B5CF6"]; // blue, cyan, violet

export default function Equalizer() {
  const [barHeights, setBarHeights] = useState(
    () => Array.from({ length: BAR_COUNT }, () => BASE_HEIGHT)
  );

  useEffect(() => {
    const randomHeights = Array.from({ length: BAR_COUNT }, () =>
      BASE_HEIGHT + Math.random() * 70
    );
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBarHeights(randomHeights);
  }, []);

  return (
    <div className="flex justify-center mt-10 mb-8 fade-in-up delay-200 px-4">
      <div className="flex items-end bg-slate-900/60 border border-slate-800 rounded-3xl px-4 sm:px-6 md:px-8 py-6 shadow-[0_0_40px_rgba(56,189,248,0.25)] w-full max-w-3xl gap-[3px] sm:gap-1 md:gap-1.5">
        {barHeights.map((height, index) => {
          const color1 = COLORS[index % COLORS.length];
          const color2 = COLORS[(index + 1) % COLORS.length];

          return (
            <div
              key={index}
              className="flex-1 max-w-[6px] sm:max-w-[8px] md:max-w-[12px] rounded-xl origin-bottom shadow-lg animated-bar"
              style={{
                height: `${height}px`,
                backgroundImage: `linear-gradient(to top, ${color1}, ${color2})`,
                animationDelay: `${index * 0.08}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
