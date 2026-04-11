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

  if (!car) return null;

  const tiles = [
    {
      label: "Engine",
      value: car.engine,
      sub: "Handcrafted",
      icon: "M12 2v4m0 12v4M4.22 4.22l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.22 19.78l2.83-2.83m8.48-8.48l2.83-2.83",
      splitLayout: false,
    },
    {
      label: "Power",
      value: car.torque,
      sub: "Power",
      valueLarge: car.horsepower,
      valueUnit: "hp",
      icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
      splitLayout: true,
    },
    {
      label: "Transmission",
      value: car.transmission,
      sub: "Automatic\ntransmission",
      dark: true,
      icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
      splitLayout: false,
    },
    {
      label: "Acceleration",
      value: car.zeroTo60,
      valueLarge: car.zeroTo60Num,
      valueUnit: "sec",
      sub: "0–60 mph",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      splitLayout: true,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 left-0 right-0 z-40"
      style={{ opacity: 0, transform: "translateY(20px)" }}
    >
      <div className="flex items-center gap-2 mb-2 ml-10">
        <h3 className="text-black font-bold text-base tracking-tight">
          Feature Highlights
        </h3>
        <div className="flex items-center justify-center w-4 h-4 rounded-full border border-black/10 text-[8px] text-black/40">
          ⓘ
        </div>
      </div>

      <div className="flex gap-2 px-10">
        {tiles.map((tile, i) => (
          <div
            key={i}
            className={`flex-1 rounded-2xl p-5 shadow-sm min-h-[130px] flex flex-col justify-between overflow-hidden relative
              ${
                tile.dark
                  ? "bg-black text-white"
                  : "bg-white/80 border border-black/5 backdrop-blur-sm"
              }`}
          >
            {/* Top row: icon left, label right */}
            <div className="flex justify-between items-start">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={tile.dark ? "text-white/40" : "text-black/30"}
              >
                <path d={tile.icon} />
              </svg>
              <span
                className={`text-[12px] font-semibold uppercase tracking-widest ${
                  tile.dark ? "text-white/30" : "text-black/25"
                }`}
              >
                {tile.label}
              </span>
            </div>

            {/* Bottom row: sub label + value */}
            {tile.splitLayout ? (
              <div className="flex items-end justify-between">
                <div>
                  <p
                    className={`text-[12px] font-medium mb-1 ${
                      tile.dark ? "text-white/40" : "text-black/35"
                    }`}
                  >
                    {tile.sub}
                  </p>
                  <p
                    className={`text-[13px] ${
                      tile.dark ? "text-white/50" : "text-black/40"
                    }`}
                  >
                    {tile.value}
                  </p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-[52px] font-bold leading-none tracking-tight ${
                      tile.dark ? "text-white" : "text-black"
                    }`}
                  >
                    {tile.valueLarge}
                  </span>
                  <span
                    className={`text-[16px] font-medium mb-1 ${
                      tile.dark ? "text-white/50" : "text-black/40"
                    }`}
                  >
                    {tile.valueUnit}
                  </span>
                </div>
              </div>
            ) : (
              <div>
                <p
                  className={`text-[12px] font-medium leading-none mb-1.5 ${
                    tile.dark ? "text-white/40" : "text-black/35"
                  }`}
                >
                  {tile.sub}
                </p>
                <h4
                  className={`text-[20px] font-bold leading-tight ${
                    tile.dark ? "text-white" : "text-black"
                  }`}
                >
                  {tile.value}
                </h4>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
