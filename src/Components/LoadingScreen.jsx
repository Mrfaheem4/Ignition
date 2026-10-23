import { useEffect, useState } from "react";

export default function LoadingScreen({ carName, progress, onBack }) {
  const [slow, setSlow] = useState(false);
  const percent = Number.isFinite(progress) ? Math.min(99, Math.max(0, Math.round(progress))) : null;
  useEffect(() => {
    const timer = setTimeout(() => setSlow(true), 15000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="fixed inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center z-[60] px-6 text-center" role="status" aria-live="polite" aria-busy="true">
      <div className="text-white text-3xl sm:text-4xl tracking-[0.3em] uppercase font-bold mb-12">IGNITION</div>
      <p className="text-white/70 text-sm mb-5">{carName ? `Preparing ${carName}` : "Starting the experience"}</p>
      <div className="w-64 h-px bg-white/10 overflow-hidden mb-3" role="progressbar" aria-label="Loading scene" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent ?? undefined}>
        <div className={percent === null ? "loading-indicator h-full bg-white" : "h-full bg-white transition-[width] duration-300"} style={percent === null ? undefined : { width: `${percent}%` }} />
      </div>
      <p className="text-white/50 text-xs tracking-wider">{percent === null ? "Loading assets..." : percent >= 99 ? "Preparing the scene..." : `${percent}% - Loading assets`}</p>
      {slow && <p className="text-white/50 text-xs max-w-xs mt-6">3D assets can take longer on a slow connection. You can return to the collection while they load.</p>}
      {onBack && <button onClick={onBack} className="mt-8 text-white/70 hover:text-white text-xs underline underline-offset-4">Back to collection</button>}
      {slow && <button onClick={() => window.location.reload()} className="mt-4 text-white/70 hover:text-white text-xs underline underline-offset-4">Retry loading</button>}
    </div>
  );
}
