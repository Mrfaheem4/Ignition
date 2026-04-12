import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  Html,
  ContactShadows,
} from "@react-three/drei";
import { useRef, useEffect, useState, Suspense, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as THREE from "three";
import gsap from "gsap";
import IntroOverlay from "./IntroOverlay";
import LoadingScreen from "./LoadingScreen";
import cars from "../data/cars";
import InfoPanel from "./InfoPanel";
import BottomTiles from "./BottomTiles";

// Preload is called outside the component so it fires immediately on module
// load — the GLTF fetch starts before React even renders the Canvas.
// Call this for every car you expect the user to visit.
function preloadCar(car) {
  useGLTF.preload(car.model);
}

function CarModel({ modelPath, onLoaded, position }) {
  const { scene } = useGLTF(modelPath); // suspends until loaded

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.envMapIntensity = 1.5;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    // onLoaded fires after scene is ready — tells the DOM layer to hide LoadingScreen
    if (onLoaded) onLoaded();
  }, [scene, onLoaded]);

  return (
    <group position={position || [0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
}

// Thin R3F fallback rendered inside the Canvas while the GLTF suspends.
// This keeps every useThree/useFrame consumer alive — no context loss.
// Your real LoadingScreen is a separate DOM overlay (see below), this just
// stops R3F from complaining about an empty scene.
function CanvasFallback() {
  return null; // Canvas stays mounted; DOM LoadingScreen handles the visual
}

function Hotspot({ position, label, onClick }) {
  return (
    <Html position={[position.x, position.y, position.z]} center>
      <div
        onClick={onClick}
        className="relative flex items-center justify-center cursor-pointer"
        style={{ width: 14, height: 14 }}
      >
        {/* Ping ring */}
        <div
          className="absolute inset-0 rounded-full animate-ping"
          style={{
            border: "1px solid rgba(255,255,255,0.6)",
            animationDuration: "2.4s",
          }}
        />
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: "1px solid #ffffff",
            background: "#000000",
          }}
        />
        {/* Inner dot */}
        <div
          className="relative z-10 rounded-full"
          style={{ width: 6, height: 6, background: "#ffffff" }}
        />
        {/* Label */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: 22,
            whiteSpace: "nowrap",
            fontSize: 9,
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#000000",
            background: "#ffffff",
            padding: "3px 7px",
            borderRadius: 3,
          }}
        >
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

  useFrame(() => {
    const el = document.getElementById("cam-debug");
    if (controlsRef.current && el) {
      const pos = camera.position;
      const tar = controlsRef.current.target;
      el.innerText =
        `position: { x: ${pos.x.toFixed(2)}, y: ${pos.y.toFixed(2)}, z: ${pos.z.toFixed(2)} }\n` +
        `target:   { x: ${tar.x.toFixed(2)}, y: ${tar.y.toFixed(2)}, z: ${tar.z.toFixed(2)} }`;
    }
  });

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
  const navigate = useNavigate();
  const currentCar = cars.find((c) => c.id === carId) || cars[0];

  // Kick off GLTF fetch immediately on render, before Suspense even triggers
  useEffect(() => {
    preloadCar(currentCar);
  }, [currentCar]);

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
  const hotspotJustClickedRef = useRef(false);

  const handleIntroComplete = useCallback(() => {
    if (introCompletedRef.current) return;
    introCompletedRef.current = true;
    setIntroDone(true);
    gsap.fromTo(
      carNameRef.current,
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
    );
  }, []);

  useEffect(() => {
    if (modelLoaded) {
      const timer = setTimeout(() => setShowLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [modelLoaded]);

  // useCallback so CameraRig/Hotspot don't cause unnecessary re-renders
  const handleModelLoaded = useCallback(() => setModelLoaded(true), []);

  const handleUserInteract = useCallback(() => {
    if (hotspotJustClickedRef.current) {
      hotspotJustClickedRef.current = false;
      return;
    }
    setIsDragging(true);
    setIsSnapped(false);
    setActiveHotspot(null);
    if (!introDone) {
      handleIntroComplete();
    }
  }, [introDone, handleIntroComplete]);

  const handleUserStopInteract = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleViewClick = useCallback(
    (key) => {
      hotspotJustClickedRef.current = true;
      setTarget({ ...currentCar.views[key] });
      setActiveView(key);
      setIsSnapped(true);
      setActiveHotspot(null);
      setTargetKey((prev) => prev + 1);
    },
    [currentCar],
  );

  return (
    <div className="w-screen h-screen bg-[#e7e5e5]">
      <style>{`
        @keyframes pulse {
          0%   { transform: scale(1);   opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>

      <button
        onClick={() => navigate("/showroom")}
        className="absolute top-6 left-6 z-50 text-sm tracking-[0.2em] uppercase text-gray-400 hover:text-white transition-colors pointer-events-auto"
      >
        ← Back to Collection
      </button>

      <div
        ref={carNameRef}
        className="absolute top-16 left-6 z-30 pointer-events-none opacity-0"
      >
        <div className="text-[10px] tracking-[0.3em] uppercase text-black/40 mb-0.5">
          {currentCar.brand}
        </div>
        <div className="text-base tracking-[0.15em] uppercase font-semibold text-black">
          {currentCar.name}
        </div>
        <div className="mt-8">
          <img
            src={`/logos/${currentCar.id}.png`}
            alt={`${currentCar.brand} logo`}
            className="h-20 w-auto object-contain"
          />
        </div>
      </div>

      {/* DOM loading screen — controlled by modelLoaded state, independent of Suspense */}
      {showLoading && <LoadingScreen />}

      {modelLoaded && !introDone && (
        <IntroOverlay
          carName={currentCar.name}
          carModel={currentCar.brand}
          accent={currentCar.intro.text.accent}
          onComplete={handleIntroComplete}
        />
      )}

      {introDone && (
        <InfoPanel
          hotspot={activeHotspot}
          accent={currentCar.intro.text.accent}
          onClose={() => setActiveHotspot(null)}
          visible={!!activeHotspot && !isDragging}
          logoSrc={`/logos/${currentCar.id}.png`}
          carName={currentCar.brand}
        />
      )}

      {introDone && <BottomTiles car={currentCar} visible={!isDragging} />}

      {/* debug overlay */}
      {/* <div
        id="cam-debug"
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          zIndex: 100,
          color: "lime",
          fontFamily: "monospace",
          fontSize: 12,
          background: "rgba(0,0,0,0.6)",
          padding: "8px 12px",
          borderRadius: 6,
          whiteSpace: "pre",
          pointerEvents: "none",
        }}
      /> */}

      <div className="absolute top-5 right-5 z-10 flex gap-1.5">
        {Object.keys(currentCar.views).map((key) => (
          <button
            key={key}
            onClick={() => handleViewClick(key)}
            className={`px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest rounded-full transition-all duration-200 border border-black/
        ${
          activeView === key && isSnapped
            ? "bg-black/70 text-white border-black/40 backdrop-blur-md"
            : "bg-white/10 text-black/50 border-white/30 backdrop-blur-sm hover:bg-white/20 hover:text-black/70"
        }`}
          >
            {key}
          </button>
        ))}
      </div>

      <Canvas
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        camera={{
          position: [
            currentCar.intro.startPosition.x,
            currentCar.intro.startPosition.y,
            currentCar.intro.startPosition.z,
          ],
          fov: 35,
        }}
      >
        <Environment files="/concrete_1.hdr" background={false} />

        {/*
          Suspense lives INSIDE Canvas — R3F context stays fully alive.
          CanvasFallback renders nothing (null) so the scene stays mounted
          while the GLTF loads. Your DOM LoadingScreen handles the visual.
          Never put Suspense outside <Canvas> — useThree/useFrame will lose
          their provider and throw.
        */}
        <Suspense fallback={<CanvasFallback />}>
          <CarModel
            modelPath={currentCar.model}
            position={
              currentCar.modelPosition && [
                currentCar.modelPosition.x,
                currentCar.modelPosition.y,
                currentCar.modelPosition.z,
              ]
            }
            onLoaded={handleModelLoaded}
          />
        </Suspense>

        <ContactShadows
          position={[0, -0.01, 0]}
          opacity={1}
          scale={20}
          blur={1.5}
          far={5}
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
                  setTargetKey((prev) => prev + 1);
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
      </Canvas>
    </div>
  );
}
