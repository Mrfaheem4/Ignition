import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function IntroOverlay({
  carName,
  carModel,
  accent,
  onComplete,
}) {
  const modelRef = useRef();
  const nameRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial State
    gsap.set([modelRef.current, nameRef.current], { opacity: 0, y: 20 });

    tl.to(
      modelRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      },
      0.3,
    )
      .to(
        nameRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        0.6,
      )
      .to(
        [modelRef.current, nameRef.current],
        {
          opacity: 0,
          y: -10,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            if (onComplete) onComplete();
          },
        },
        2.0,
      );

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none bg-transparent flex flex-col items-center justify-center gap-2">
      {/* Car Model (Subheader) */}
      <div
        ref={modelRef}
        style={{ color: accent || "rgba(255,255,255,0.6)" }}
        className="text-[13px] font-sans tracking-[0.4em] uppercase font-light"
      >
        {carModel}
      </div>

      {/* Car Name (Main Title) */}
      <div
        ref={nameRef}
        className="text-white text-6xl md:text-7xl font-sans tracking-[0.08em] uppercase font-bold leading-none"
      >
        {carName}
      </div>
    </div>
  );
}
