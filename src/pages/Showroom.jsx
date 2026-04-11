import { useNavigate } from "react-router-dom";
import cars from "../data/cars";
import LightRays from "../Components/LightRays";

export default function Showroom() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-20 px-4 relative">
      {/* Light Rays Background */}
      <div className="fixed inset-0">
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

      {/* Content */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16">
          <button
            onClick={() => navigate("/home")}
            className="text-sm tracking-[0.2em] uppercase text-gray-400 hover:text-white transition-colors mb-8"
          >
            ← Back to Home
          </button>

          <div>
            <span className="text-sm tracking-[0.3em] uppercase text-gray-400">
              Choose Your Ride
            </span>
            <h1 className="text-6xl font-black mt-2 tracking-tight">
              The Collection
            </h1>
          </div>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car.id}
              onClick={() => navigate(`/car/${car.id}`)}
              className="group cursor-pointer"
            >
              <div
                className="relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-900 to-black p-8 border border-gray-800 hover:border-gray-600 transition-all h-full flex flex-col justify-between hover:shadow-2xl hover:scale-105"
                style={{
                  boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-white transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="text-sm tracking-[0.2em] uppercase text-gray-500 group-hover:text-gray-300 transition-colors mb-2">
                    {car.brand}
                  </div>
                  <h3 className="text-4xl font-black tracking-tight mb-6 group-hover:text-red-400 transition-colors">
                    {car.name}
                  </h3>

                  <div className="space-y-3 text-sm text-gray-400 mb-8">
                    <div className="flex justify-between border-b border-gray-700 pb-2">
                      <span>Engine</span>
                      <span className="text-white font-semibold">
                        {car.engine}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-gray-700 pb-2">
                      <span>Torque</span>
                      <span className="text-white font-semibold">
                        {car.torque}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-gray-700 pb-2">
                      <span>0-60</span>
                      <span className="text-white font-semibold">
                        {car.zeroTo60}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Top Speed</span>
                      <span className="text-white font-semibold text-xs">
                        {car.topspeed}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="relative z-10 w-full py-3 border-2 border-gray-600 group-hover:border-red-500 group-hover:bg-red-600/10 rounded-lg font-bold tracking-widest uppercase text-sm transition-all">
                  View in 3D
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
