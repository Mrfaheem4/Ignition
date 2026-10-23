import { useEffect, useRef, useState } from "react";

let audioInstance;
let userPaused = false;
function getAudio() {
  if (!audioInstance) {
    audioInstance = new Audio();
    audioInstance.preload = "none";
    audioInstance.src = "/Music/Drop It.mp3";
    audioInstance.loop = true;
    audioInstance.volume = 0.35;
  }
  return audioInstance;
}

export function useAmbientMusic(enabled = true) {
  const audioRef = useRef(null);
  const [isPaused, setIsPaused] = useState(true);
  useEffect(() => {
    if (!enabled) return;
    const audio = getAudio();
    audioRef.current = audio;
    const sync = () => setIsPaused(audio.paused);
    audio.addEventListener("play", sync);
    audio.addEventListener("pause", sync);
    // Sync persisted playback without fetching audio on mount.
    const timer = setTimeout(sync, 0);
    const resume = () => {
      if (!userPaused && audio.paused) audio.play().catch(() => {});
    };
    window.addEventListener("pointerdown", resume, { once: true });
    window.addEventListener("keydown", resume, { once: true });
    return () => {
      clearTimeout(timer);
      audio.removeEventListener("play", sync);
      audio.removeEventListener("pause", sync);
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);
    };
  }, [enabled]);
  return {
    isPaused,
    pause: () => { userPaused = true; audioRef.current?.pause(); },
    play: () => { userPaused = false; audioRef.current?.play().catch(() => {}); },
  };
}
