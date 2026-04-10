import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

function CarSilhouette({ color }) {
  return (
    <svg
      width="280"
      height="100"
      viewBox="0 0 280 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 65 
           L30 65 
           Q35 65 38 60
           L55 35 
           Q65 20 85 18
           L160 16
           Q180 16 195 25
           L225 45
           L245 48
           Q260 50 265 58
           L270 65
           L280 65
           L280 72
           Q265 72 265 72
           Q263 80 255 82
           Q240 87 230 80
           Q222 74 222 72
           L60 72
           Q58 80 50 82
           Q35 87 25 80
           Q17 74 17 72
           L10 72 Z"
        fill={color}
        opacity="0.15"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.6"
      />
      {/* windshield */}
      <path
        d="M90 20 L75 42 L155 42 L150 20 Z"
        fill={color}
        opacity="0.1"
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.4"
      />
      {/* rear window */}
      <path
        d="M155 20 L152 42 L195 42 L185 28 Z"
        fill={color}
        opacity="0.1"
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.4"
      />
      {/* front wheel */}
      <circle
        cx="245"
        cy="72"
        r="14"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.6"
        fill="none"
      />
      <circle
        cx="245"
        cy="72"
        r="6"
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.4"
        fill="none"
      />
      {/* rear wheel */}
      <circle
        cx="40"
        cy="72"
        r="14"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.6"
        fill="none"
      />
      <circle
        cx="40"
        cy="72"
        r="6"
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.4"
        fill="none"
      />
    </svg>
  );
}

export default function LoadingScreen({ carName, brand, accent }) {
  const progressRef = useRef();
  const silhouetteRef = useRef();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // pulse the silhouette
    gsap.to(silhouetteRef.current, {
      opacity: 0.4,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // animate progress bar — simulated, not real load progress
    gsap.to(
      { val: 0 },
      {
        val: 100,
        duration: 2.5,
        ease: "power1.inOut",
        onUpdate: function () {
          setProgress(Math.round(this.targets()[0].val));
          if (progressRef.current) {
            progressRef.current.style.width = `${this.targets()[0].val}%`;
          }
        },
      },
    );
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
      }}
    >
      {/* brand */}
      <div
        style={{
          fontSize: 10,
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.4)",
          marginBottom: 8,
          fontFamily: "sans-serif",
        }}
      >
        {brand}
      </div>

      {/* car name */}
      <div
        style={{
          fontSize: 28,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          fontWeight: 600,
          color: "white",
          fontFamily: "sans-serif",
          marginBottom: 40,
        }}
      >
        {carName}
      </div>

      {/* car silhouette */}
      <div ref={silhouetteRef} style={{ marginBottom: 48 }}>
        <CarSilhouette color={accent} />
      </div>

      {/* progress bar container */}
      <div
        style={{
          width: 280,
          height: 1,
          background: "rgba(255,255,255,0.1)",
          borderRadius: 1,
          overflow: "hidden",
          marginBottom: 12,
        }}
      >
        <div
          ref={progressRef}
          style={{
            height: "100%",
            width: "0%",
            background: accent,
            borderRadius: 1,
            transition: "width 0.1s linear",
          }}
        />
      </div>

      {/* progress number */}
      <div
        style={{
          fontSize: 10,
          letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.3)",
          fontFamily: "monospace",
        }}
      >
        {progress}%
      </div>
    </div>
  );
}
