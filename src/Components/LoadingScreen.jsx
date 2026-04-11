import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LoadingScreen({ carName, brand, accent }) {
  const progressRef = useRef();
  const progressNumRef = useRef();

  useEffect(() => {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: 100,
      duration: 2.5,
      ease: "power1.inOut",
      onUpdate: () => {
        if (progressRef.current)
          progressRef.current.style.width = `${obj.val}%`;
        if (progressNumRef.current)
          progressNumRef.current.innerText = `${Math.round(obj.val)}%`;
      },
    });
  }, []);

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center z-50">
      <div className="text-white text-4xl tracking-[0.4em] uppercase font-bold mb-16">
        IGNITION
      </div>

      <div className="w-64 h-px bg-white/10 overflow-hidden mb-3">
        <div
          ref={progressRef}
          className="h-full bg-white"
          style={{ width: "0%" }}
        />
      </div>

      <div
        ref={progressNumRef}
        className="text-white/30 text-[10px] tracking-[0.2em] font-mono"
      >
        0%
      </div>
    </div>
  );
}
