import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function IntroOverlay({
  carName,
  carModel,
  accent,
  onComplete,
}) {
  const overlayRef = useRef();
  const modelRef = useRef();
  const nameRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline();

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
  }, []);

  const handleSkip = () => {
    gsap.killTweensOf([modelRef.current, nameRef.current]);
    gsap.to([modelRef.current, nameRef.current], {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });
  };

  return (
    <div
      ref={overlayRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 20,
        pointerEvents: "none",
        background: "transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      <div
        ref={modelRef}
        style={{
          color: accent || "rgba(255,255,255,0.6)",
          fontSize: 13,
          fontFamily: "sans-serif",
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          fontWeight: 300,
        }}
      >
        {carModel}
      </div>

      <div
        ref={nameRef}
        style={{
          color: "white",
          fontSize: 72,
          fontFamily: "sans-serif",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {carName}
      </div>

      <div
        onClick={handleSkip}
        style={{
          position: "absolute",
          bottom: 32,
          right: 32,
          color: "rgba(255,255,255,0.4)",
          fontSize: 11,
          fontFamily: "sans-serif",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          cursor: "pointer",
          pointerEvents: "all",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
          paddingBottom: 2,
        }}
      >
        skip
      </div>
    </div>
  );
}
