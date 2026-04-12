import { useEffect, useRef, useState } from "react";

// Tracks to pick from — drop any mp3/ogg into /public/Music/
// and add the filename here. One is picked at random each visit.
const TRACKS = ["/Music/Drop It.mp3"];

function randomTrack() {
  return TRACKS[Math.floor(Math.random() * TRACKS.length)];
}

export function useAmbientMusic(modelLoaded) {
  const audioRef = useRef(null);
  const fadeRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const pause = () => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setIsPaused(true);
    }
  };

  const play = () => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch(() => {
        // Browser autoplay policy blocked it
      });
      setIsPaused(false);
    }
  };

  useEffect(() => {
    if (!modelLoaded) return;

    // Pick a random track once per car load
    const track = randomTrack();
    const audio = new Audio(track);
    audio.loop = true;
    audio.volume = 0; // start silent — we fade in
    audioRef.current = audio;

    const timer = setTimeout(() => {
      audio.play().catch(() => {
        // Browser autoplay policy blocked it — wait for first user gesture
        const resume = () => {
          audio.play();
          window.removeEventListener("pointerdown", resume);
        };
        window.addEventListener("pointerdown", resume, { once: true });
      });

      // Fade in from 0 → 0.35 over 2 seconds
      let vol = 0;
      fadeRef.current = setInterval(() => {
        vol = Math.min(vol + 0.01, 0.35);
        audio.volume = vol;
        if (vol >= 0.35) clearInterval(fadeRef.current);
      }, 60);
    }, 500); // 500ms after model loaded

    return () => {
      clearTimeout(timer);
      clearInterval(fadeRef.current);

      // Fade out cleanly on unmount (user navigates away)
      const dying = audioRef.current;
      if (!dying) return;
      let vol = dying.volume;
      const fadeOut = setInterval(() => {
        vol = Math.max(vol - 0.02, 0);
        dying.volume = vol;
        if (vol <= 0) {
          dying.pause();
          dying.src = "";
          clearInterval(fadeOut);
        }
      }, 60);
    };
  }, [modelLoaded]);

  return { pause, play, isPaused };
}
