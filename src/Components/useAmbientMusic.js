import { useEffect, useRef, useState } from "react";

// Tracks to pick from — drop any mp3/ogg into /public/Music/
// and add the filename here. One is picked at random each visit.
const TRACKS = ["/Music/Drop It.mp3"];

// Global audio instance - cache to avoid recreating on each mount
let globalAudioInstance = null;

function randomTrack() {
  return TRACKS[Math.floor(Math.random() * TRACKS.length)];
}

// Initialize global audio once per page load
function initGlobalAudio() {
  if (globalAudioInstance) return globalAudioInstance;

  const track = randomTrack();
  const audio = new Audio(track);
  audio.loop = true;
  audio.volume = 0;
  globalAudioInstance = audio;
  return audio;
}

export function useAmbientMusic() {
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
    // Always get/init global audio on mount
    const audio = initGlobalAudio();
    audioRef.current = audio;

    // If not already playing, start it
    if (audio.paused) {
      const timer = setTimeout(() => {
        audio.play().catch(() => {
          // Browser autoplay policy blocked it — wait for first user gesture
          const resume = () => {
            audio.play();
            window.removeEventListener("pointerdown", resume);
          };
          window.addEventListener("pointerdown", resume, { once: true });
        });

        // Fade in from current volume → 0.35
        let vol = audio.volume;
        fadeRef.current = setInterval(() => {
          vol = Math.min(vol + 0.015, 0.35);
          audio.volume = vol;
          if (vol >= 0.35) clearInterval(fadeRef.current);
        }, 50);
      }, 200);

      return () => {
        clearTimeout(timer);
        if (fadeRef.current) clearInterval(fadeRef.current);
      };
    }
  }, []);

  return { pause, play, isPaused };
}
