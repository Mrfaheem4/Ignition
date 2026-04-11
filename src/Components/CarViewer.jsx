import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import IntroOverlay from "./IntroOverlay";
import LoadingScreen from "./LoadingScreen";
import cars from "../data/cars";
import InfoPanel from "./InfoPanel";
import BottomTiles from "./BottomTiles";

function CarModel({ modelPath, onLoaded }) {
  const { scene } = useGLTF(modelPath);
  useEffect(() => {
    if (onLoaded) onLoaded();
  }, [scene]);
  return <primitive object={scene} />;
}

function Hotspot({ position, label, onClick }) {
  return (
    <Html position={[position.x, position.y, position.z]} center>
      <div
        onClick={onClick}
        className="relative flex items-center justify-center cursor-pointer"
        style={{ width: 12, height: 12 }}
      >
        <div className="absolute inset-0 rounded-full border border-white/60 animate-ping" />
        <div
          className="absolute inset-0 rounded-full border border-white"
          style={{
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(4px)",
          }}
        />
        <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white text-[9px] tracking-widest uppercase whitespace-nowrap bg-black/50 px-1.5 py-0.5 rounded">
          {label}
        </div>
      </div>
    </Html>
  );
}

function CameraRig({
  targetPosition,
  targetLookAt,
  targetKey,
  onUserInteract,
  onUserStopInteract,
  startPosition,
  defaultView,
  onIntroComplete,
}) {
  const { camera } = useThree();
  const controlsRef = useRef();
  const introStarted = useRef(false);

  useFrame(() => {
    if (!introStarted.current && controlsRef.current) {
      introStarted.current = true;

      const controls = controlsRef.current;
      controls.enabled = false;

      camera.position.set(startPosition.x, startPosition.y, startPosition.z);
      controls.target.set(
        defaultView.lookAt.x,
        defaultView.lookAt.y,
        defaultView.lookAt.z,
      );
      controls.update();

      const startRadius = Math.sqrt(
        startPosition.x ** 2 + startPosition.z ** 2,
      );
      const endRadius = Math.sqrt(
        defaultView.position.x ** 2 + defaultView.position.z ** 2,
      );
      const startAngle = Math.atan2(startPosition.z, startPosition.x);
      const endAngle = startAngle - Math.PI * 2;

      const proxy = {
        angle: startAngle,
        radius: startRadius,
        y: startPosition.y,
      };

      gsap.to(proxy, {
        angle: endAngle,
        radius: endRadius,
        y: defaultView.position.y,
        duration: 3,
        ease: "power2.inOut",
        onUpdate: () => {
          camera.position.x = Math.cos(proxy.angle) * proxy.radius;
          camera.position.z = Math.sin(proxy.angle) * proxy.radius;
          camera.position.y = proxy.y;
          controls.target.set(
            defaultView.lookAt.x,
            defaultView.lookAt.y,
            defaultView.lookAt.z,
          );
          controls.update();
        },
        onComplete: () => {
          controls.target.set(
            defaultView.lookAt.x,
            defaultView.lookAt.y,
            defaultView.lookAt.z,
          );
          controls.update();
          controls.enabled = true;
          if (onIntroComplete) onIntroComplete();
        },
      });
    }
  });

  useEffect(() => {
    if (!targetPosition || !targetLookAt) return;

    const controls = controlsRef.current;
    gsap.killTweensOf(camera.position);
    gsap.killTweensOf(controls.target);
    controls.enabled = false;

    const tl = gsap.timeline({
      onUpdate: () => controls.update(),
      onComplete: () => {
        controls.enabled = true;
      },
    });

    tl.to(
      camera.position,
      {
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
        duration: 1.5,
        ease: "power3.inOut",
      },
      0,
    );

    tl.to(
      controls.target,
      {
        x: targetLookAt.x,
        y: targetLookAt.y,
        z: targetLookAt.z,
        duration: 1.5,
        ease: "power3.inOut",
      },
      0,
    );
  }, [targetPosition, targetLookAt, targetKey]);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableDamping={true}
      dampingFactor={0.05}
      onStart={onUserInteract}
      onEnd={onUserStopInteract}
    />
  );
}

export default function CarViewer() {
  const { carId } = useParams();
  const currentCar = cars.find((c) => c.id === carId) || cars[0];

  const [target, setTarget] = useState(null);
  const [targetKey, setTargetKey] = useState(0);
  const [activeView, setActiveView] = useState("default");
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isSnapped, setIsSnapped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const carNameRef = useRef();
  const introCompletedRef = useRef(false);

  const handleIntroComplete = () => {
    if (introCompletedRef.current) return;
    introCompletedRef.current = true;
    setIntroDone(true);
    gsap.fromTo(
      carNameRef.current,
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
    );
  };
  useEffect(() => {
    if (modelLoaded) {
      const timer = setTimeout(() => setShowLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [modelLoaded]);

  const handleUserInteract = () => {
    setIsDragging(true);
    setIsSnapped(false);
    setActiveHotspot(null);
    if (!introDone) {
      handleIntroComplete();
    }
  };

  const handleUserStopInteract = () => {
    setIsDragging(false);
  };

  const handleViewClick = (key) => {
    setTarget({ ...currentCar.views[key] });
    setActiveView(key);
    setIsSnapped(true);
    setActiveHotspot(null);
    setTargetKey((prev) => prev + 1);
  };

  return (
    <div className="w-screen h-screen bg-[#0a0a0a] relative overflow-hidden">
      <style>{`
        @keyframes pulse {
          0%   { transform: scale(1);   opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>

      {/* permanent car name top left */}
      <div
        ref={carNameRef}
        className="absolute top-6 left-6 z-30 pointer-events-none opacity-0"
      >
        <div className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-0.5">
          {currentCar.brand}
        </div>
        <div className="text-base tracking-[0.15em] uppercase font-semibold text-white">
          {currentCar.name}
        </div>
      </div>

      {/* loading screen */}
      {showLoading && <LoadingScreen />}

      {/* intro overlay */}
      {modelLoaded && !introDone && (
        <IntroOverlay
          carName={currentCar.name}
          carModel={currentCar.brand}
          accent={currentCar.intro.text.accent}
          onComplete={handleIntroComplete}
        />
      )}

      {/* info panel */}
      {introDone && (
        <InfoPanel
          hotspot={activeHotspot}
          accent={currentCar.intro.text.accent}
          onClose={() => setActiveHotspot(null)}
          visible={!!activeHotspot && !isDragging}
        />
      )}

      {/* bottom tiles */}
      {introDone && <BottomTiles car={currentCar} visible={!isDragging} />}

      {/* temp view buttons */}
      <div className="absolute top-5 right-5 z-10 flex gap-2">
        {Object.keys(currentCar.views).map((key) => (
          <button
            key={key}
            onClick={() => handleViewClick(key)}
            className={`px-4 py-2 text-white text-sm border border-white/25 rounded-md transition-colors ${
              activeView === key && isSnapped
                ? "bg-white/25"
                : "bg-white/10 hover:bg-white/15"
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      <Canvas
        camera={{
          position: [
            currentCar.intro.startPosition.x,
            currentCar.intro.startPosition.y,
            currentCar.intro.startPosition.z,
          ],
          fov: 35,
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <CarModel
          modelPath={currentCar.model}
          onLoaded={() => setModelLoaded(true)}
        />

        {introDone &&
          currentCar.hotspots
            .filter((h) => !(isSnapped && h.id === activeView))
            .map((h) => (
              <Hotspot
                key={h.id}
                position={h.position}
                label={h.label}
                onClick={() => {
                  setTarget({ ...currentCar.views[h.view] });
                  setActiveView(h.id);
                  setIsSnapped(true);
                  setActiveHotspot(h);
                }}
              />
            ))}

        <CameraRig
          targetPosition={target?.position}
          targetLookAt={target?.lookAt}
          targetKey={targetKey}
          onUserInteract={handleUserInteract}
          onUserStopInteract={handleUserStopInteract}
          startPosition={currentCar.intro.startPosition}
          defaultView={currentCar.views.default}
          onIntroComplete={handleIntroComplete}
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
