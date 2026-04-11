import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function InfoPanel({ hotspot, accent, onClose, visible }) {
  const panelRef = useRef();

  useEffect(() => {
    console.log("InfoPanel effect:", visible, hotspot?.label);
    if (!panelRef.current) return;
    if (visible && hotspot) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" },
      );
    } else {
      gsap.to(panelRef.current, {
        opacity: 0,
        x: 40,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [visible, hotspot]);

  return (
    <div
      ref={panelRef}
      className="fixed top-24 right-6 z-40 w-72"
      style={{ opacity: 1 }}
    >
      {hotspot?.info && (
        <div
          className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-5"
          style={{ borderLeft: `2px solid white` }}
        >
          {/* header */}
          <div className="flex items-start justify-between mb-3">
            <div
              className="text-xs font-medium tracking-widest uppercase"
              style={{ color: "white" }}
            >
              {hotspot.label}
            </div>
            <button
              onClick={onClose}
              className="text-white/40 hover:text-white/80 transition-colors text-lg leading-none -mt-0.5"
            >
              ×
            </button>
          </div>

          {/* title */}
          <div className="text-white font-semibold text-base leading-snug mb-2">
            {hotspot.info.title}
          </div>

          {/* description */}
          <div className="text-white/50 text-xs leading-relaxed">
            {hotspot.info.description}
          </div>
        </div>
      )}
    </div>
  );
}
