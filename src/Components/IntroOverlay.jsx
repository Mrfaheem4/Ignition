import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function IntroOverlay({ carName, carModel, onComplete }) {
  const overlayRef = useRef();
  const modelRef = useRef();
  const nameRef = useRef();
  const skipRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline();

    // everything starts invisible
    gsap.set([modelRef.current, nameRef.current], { opacity: 0, y: 20 });
    gsap.set(overlayRef.current, { opacity: 1 });

    // model name fades in first
    tl.to(
      modelRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      },
      2.8,
    )

      // then big name
      .to(
        nameRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        3.1,
      )

      // sit for 1s then fade the big text out
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
        4.1,
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      {/* model name — small above */}
      <div
        ref={modelRef}
        style={{
          color: "rgba(255,255,255,0.6)",
          fontSize: 14,
          fontFamily: "sans-serif",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          fontWeight: 300,
        }}
      >
        {carModel}
      </div>

      {/* big car name */}
      <div
        ref={nameRef}
        style={{
          color: "white",
          fontSize: 72,
          fontFamily: "sans-serif",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {carName}
      </div>

      {/* skip button */}
      <div
        ref={skipRef}
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
