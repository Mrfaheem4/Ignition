import { useNavigate } from "react-router-dom";
import cars from "../data/cars";
import LightRays from "../Components/LightRays";

export default function Showroom() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] text-white py-20 px-8 relative selection:bg-white/10">
      {/* Subtle Light Rays - Reduced opacity for a cleaner look */}
      <div className="fixed inset-0 opacity-40">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={0.8}
          lightSpread={0.6}
          rayLength={2.5}
          followMouse={true}
          mouseInfluence={0.05}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <header className="mb-24">
          <button
            onClick={() => navigate("/home")}
            className="text-[10px] tracking-[0.4em] uppercase text-gray-500 hover:text-white transition-all flex items-center gap-2 mb-12 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              ←
            </span>{" "}
            Return to home
          </button>

          <div className="space-y-2">
            <span className="text-[11px] tracking-[0.5em] uppercase text-white/30 font-light">
              Curated Automotive Excellence
            </span>
            <h1 className="text-7xl font-bold tracking-tighter">
              The{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                Collection
              </span>
            </h1>
          </div>
        </header>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {cars.map((car) => (
            <div
              key={car.id}
              onClick={() => navigate(`/car/${car.id}`)}
              className="group cursor-pointer relative"
            >
              {/* Card Container */}
              <div className="relative overflow-hidden rounded-sm bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-white/5 group-hover:border-white/20 transition-all duration-500 p-10 h-full flex flex-col justify-between hover:scale-[1.03]">
                {/* Hover Glow Effect */}
                <div className="absolute -inset-px bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Brand & Logo Row */}
                  <div className="flex justify-between items-start mb-8 gap-4">
                    <div>
                      <div className="text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-1">
                        {car.brand}
                      </div>
                      <h3 className="text-3xl font-bold tracking-tight group-hover:text-white transition-colors">
                        {car.name}
                      </h3>
                    </div>
                    {/* Integrated Logo - Original Colors */}
                    <img
                      src={`/logos/${car.id}.png`}
                      className="h-7 w-auto object-contain opacity-30 group-hover:opacity-100 transition-all duration-500"
                      alt=""
                    />
                  </div>

                  {/* Specs - Cleaner, more minimal layout */}
                  <div className="space-y-4 mb-12">
                    {[
                      { label: "Engine", value: car.engine },
                      { label: "Torque", value: car.torque },
                      { label: "0-60 mph", value: car.zeroTo60 },
                      { label: "Top Speed", value: car.topspeed },
                    ].map((spec) => (
                      <div
                        key={spec.label}
                        className="flex justify-between items-baseline group/spec"
                      >
                        <span className="text-[10px] uppercase tracking-widest text-white/20 group-hover/spec:text-white/40 transition-colors">
                          {spec.label}
                        </span>
                        <span className="text-sm font-medium text-white/70 tracking-tight">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Refined CTA Button */}
                <div className="relative z-10">
                  <div className="w-full py-4 text-center border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-500 text-[10px] font-bold uppercase tracking-[0.3em]">
                    Explore 3D Model
                    <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Refined Footer with Attributions */}
      <footer className="pt-40 pb-20 border-t border-white/5 bg-[#050505] relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16 opacity-30 hover:opacity-80 transition-opacity duration-700">
            {/* 3D Assets */}
            <div>
              <h4 className="text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-4 font-bold">
                Assets
              </h4>
              <ul className="text-[10px] space-y-2 uppercase tracking-widest list-none p-0">
                <li>
                  3D Models: <span className="text-white">SketchFab</span>
                </li>
                <li>
                  HDRI: <span className="text-white">Polyhaven</span>
                </li>
                <li>
                  Logos: <span className="text-white">Carslogo.org</span>
                </li>
              </ul>
            </div>

            {/* Development Stack */}
            <div>
              <h4 className="text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-4 font-bold">
                Engine
              </h4>
              <ul className="text-[10px] space-y-2 uppercase tracking-widest list-none p-0">
                <li>
                  Core: <span className="text-white">Three.js / React</span>
                </li>
                <li>
                  Visuals: <span className="text-white">OGL / GSAP</span>
                </li>
                <li>
                  FX: <span className="text-white">ReactBits</span>
                </li>
              </ul>
            </div>

            {/* AI & Credits */}
            <div>
              <h4 className="text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-4 font-bold">
                Support
              </h4>
              <ul className="text-[10px] space-y-2 uppercase tracking-widest list-none p-0">
                <li>
                  AI Logic: <span className="text-white">Claude</span>
                </li>
                <li>
                  Dev: <span className="text-white">Showroom Studio</span>
                </li>
              </ul>
            </div>

            {/* Global Branding */}
            <div className="flex flex-col justify-between items-end">
              <div className="text-right">
                <div className="text-[10px] font-bold tracking-[0.4em] uppercase text-white mb-1">
                  Automotive Visualizer
                </div>
                <div className="text-[9px] tracking-[0.2em] uppercase text-gray-600">
                  v2.0 Beta
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex justify-between items-center border-t border-white/5 pt-8">
            <div className="text-[9px] uppercase tracking-[0.5em] text-white/20">
              © 2026 Shift Experience
            </div>
            <div className="text-[9px] uppercase tracking-[0.5em] text-white/20">
              Engineered for Excellence
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
