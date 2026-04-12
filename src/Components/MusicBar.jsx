import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function MusicBar({
  trackName,
  visible,
  onPause,
  onPlay,
  isPaused,
}) {
  const containerRef = useRef();
  const contentRef = useRef();
  const [isExpanded, setIsExpanded] = useState(true);

  const handleClick = () => {
    if (isPaused && onPlay) {
      onPlay();
    } else if (!isPaused && onPause) {
      onPause();
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    if (visible) {
      gsap.to(containerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power4.out",
      });

      // Automatically shrink after 4 seconds
      const timer = setTimeout(() => {
        setIsExpanded(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  useEffect(() => {
    if (isExpanded) {
      // Expand width to fit content, ensure centered with xPercent
      gsap.to(containerRef.current, {
        width: "auto",
        duration: 0.6,
        ease: "power3.inOut",
      });
      gsap.to(contentRef.current, {
        opacity: 1,
        display: "flex",
        duration: 0.3,
        delay: 0.2,
      });
    } else {
      // Shrink to cube-ish square, maintain centering
      gsap.to(contentRef.current, {
        opacity: 0,
        display: "none",
        duration: 0.2,
      });
      gsap.to(containerRef.current, {
        width: "52px",
        duration: 0.6,
        ease: "back.inOut(1.7)",
      });
    }
  }, [isExpanded]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className="fixed top-8 left-1/2 z-50 flex items-center h-[30px] bg-white/60 border border-white/40 backdrop-blur-md rounded-2xl shadow-sm px-4 cursor-pointer overflow-hidden"
      style={{
        opacity: 0,
        transform: "translateX(-50%) translateY(-20px)", // Proper centering + entrance offset
        minWidth: "52px",
      }}
    >
      {/* Visualizer Icon */}
      <div className="flex gap-[2px] items-end h-3 w-4 shrink-0">
        <div className="w-[3px] bg-black/60 animate-[music-bar_0.8s_ease-in-out_infinite] h-full" />
        <div className="w-[3px] bg-black/60 animate-[music-bar_0.5s_ease-in-out_infinite] h-2/3" />
        <div className="w-[3px] bg-black/60 animate-[music-bar_1.1s_ease-in-out_infinite] h-3/4" />
      </div>

      {/* Expanded Content */}
      <div ref={contentRef} className="flex flex-col ml-4 whitespace-nowrap">
        <span className="text-black/30 text-[9px] font-bold uppercase tracking-widest leading-none">
          Now Playing
        </span>
        <span className="text-black text-[13px] font-bold tracking-tight">
          {trackName || "Music"}
        </span>
      </div>

      <style>{`
        @keyframes music-bar {
          0%, 100% { height: 4px; }
          50% { height: 12px; }
        }
      `}</style>
    </div>
  );
}
