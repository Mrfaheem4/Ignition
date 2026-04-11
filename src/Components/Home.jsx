import { useNavigate } from "react-router-dom";
import cars from "../data/cars";
import LightRays from "./LightRays";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1}
            lightSpread={0.5}
            rayLength={3}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0}
            distortion={0}
            className="custom-rays"
            pulsating={false}
            fadeDistance={1}
            saturation={1}
          />
        </div>

        <div className="relative z-10 max-w-4xl text-center">
          <div className="mb-6">
            <span className="text-sm tracking-[0.3em] uppercase text-gray-400">
              Welcome to
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
            IGNITION
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Explore the world's most iconic and extreme performance vehicles in
            stunning 3D detail
          </p>
          <button
            onClick={() => navigate("/showroom")}
            className="px-8 py-4 bg-white text-black hover:bg-black hover:text-white hover:scale-105 transition-all rounded-lg font-semibold tracking-wide uppercase text-sm"
          >
            Start Exploring
          </button>
        </div>
      </section>

      {/* Footer */}
      <section className="border-t border-gray-800 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="text-sm tracking-[0.2em] uppercase text-gray-500 mb-4">
                Product
              </div>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Viewer
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="text-sm tracking-[0.2em] uppercase text-gray-500 mb-4">
                Company
              </div>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="text-sm tracking-[0.2em] uppercase text-gray-500 mb-4">
                Legal
              </div>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    License
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="text-sm tracking-[0.2em] uppercase text-gray-500 mb-4">
                Connect
              </div>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Discord
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <div>&copy; 2026 Ignition. All rights reserved.</div>
            <div>Designed & Built with Performance in Mind</div>
          </div>
        </div>
      </section>
    </div>
  );
}
