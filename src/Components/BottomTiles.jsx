import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function BottomTiles({ car, visible }) {
  const containerRef = useRef();

  useEffect(() => {
    if (!containerRef.current) return;
    if (visible) {
      gsap.to(containerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(containerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [visible]);

  const tiles = [
    { label: "Engine", value: car.engine },
    { label: "Torque", value: car.torque },
    { label: "Transmission", value: car.transmission },
    { label: "Acceleration", value: car.zeroTo60 },
  ];

  return (
    <div
      ref={containerRef}
      className="fixed bottom-8 left-0 right-0 z-40"
      style={{ opacity: 0, transform: "translateY(20px)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 px-8">
        <h3 className="text-white font-semibold text-lg">Feature Highlights</h3>
        <div className="text-white/40 text-lg leading-none">ⓘ</div>
      </div>

      {/* Tiles Grid */}
      <div className="flex gap-4 px-8">
        {tiles.map((tile, i) => (
          <div
            key={i}
            className="flex-1 bg-zinc-900/50 border  border-white/40 rounded-xl p-4 flex flex-col items-center justify-center text-center"
          >
            <div className="text-white/50 text-xs tracking-widest uppercase mb-2 leading-relaxed font-bold">
              {tile.label}
            </div>
            <div className="text-white text-sm font-semibold leading-snug">
              {tile.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
