import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function InfoPanel({
  hotspot,
  accent,
  onClose,
  visible,
  logoSrc,
  carName,
}) {
  const panelRef = useRef();

  useEffect(() => {
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
      className="fixed top-24 right-6 z-40 w-72 flex flex-col gap-2"
      style={{ opacity: 1 }}
    >
      {/* Logo + Car Name Card */}
      <div className="bg-white/70 backdrop-blur-md border border-black/5 rounded-2xl px-4 py-3 flex items-center gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-black/25">
            Brand
          </p>
          <p className="text-[13px] font-bold text-black leading-tight">
            {carName ?? "Mercedes-Benz"}
          </p>
        </div>
      </div>

      {/* Hotspot Info Card */}
      {hotspot?.info && (
        <div className="bg-white/70 backdrop-blur-md border border-black/5 rounded-2xl p-5">
          {/* header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-black/25" />
              <span className="text-[10px] font-semibold tracking-widest uppercase text-black/30">
                {hotspot.label}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-black/20 hover:text-black/60 transition-colors text-lg leading-none -mt-0.5"
            >
              ×
            </button>
          </div>

          {/* title */}
          <div className="text-black font-bold text-[15px] leading-snug mb-2">
            {hotspot.info.title}
          </div>

          {/* description */}
          <div className="text-black/45 text-[12px] leading-relaxed">
            {hotspot.info.description}
          </div>

          {/* subtle bottom tag */}
          <div className="mt-4 pt-3 border-t border-black/5 flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-black/15" />
            <span className="text-[9px] uppercase tracking-widest text-black/20 font-semibold">
              Feature Detail
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
