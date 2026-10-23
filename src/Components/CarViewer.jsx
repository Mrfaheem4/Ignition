import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  Html,
  ContactShadows,
  useProgress,
} from "@react-three/drei";
import { useRef, useEffect, useState, Suspense, useCallback } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import * as THREE from "three";
import gsap from "gsap";
import IntroOverlay from "./IntroOverlay";
import LoadingScreen from "./LoadingScreen";
import cars from "../data/cars";
import InfoPanel from "./InfoPanel";
import BottomTiles from "./BottomTiles";
import { useAmbientMusic } from "./useAmbientMusic";
import MusicBar from "./MusicBar";
useGLTF.setDecoderPath("/draco/");

const preparedScenes = new WeakSet();

function CarModel({ modelPath, position }) {
  const { scene } = useGLTF(modelPath); // suspends until loaded

  useEffect(() => {
    if (preparedScenes.has(scene)) return;

    scene.traverse((child) => {
      if (child.isMesh) {
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((material) => { material.envMapIntensity = 1.5; });
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    preparedScenes.add(scene);
  }, [scene]);

  return (
    <group position={position || [0, 0, 0]}>
      <primitive object={scene} dispose={null} />
    </group>
  );
}

// This commits only once the entire scene's Suspense boundary resolves.
// Report readiness after the first rendered frame, including the environment.
function SceneReady({ onReady }) {
  const reported = useRef(false);
  const frame = useRef(null);
  useFrame(() => {
    if (reported.current) return;
    reported.current = true;
    frame.current = requestAnimationFrame(onReady);
  });
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  return null;
}

function SceneLoading({ carName, onBack }) {
  const progress = useProgress((state) => state.progress);
  return <LoadingScreen carName={carName} progress={progress > 0 ? progress : undefined} onBack={onBack} />;
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
  const { camera, invalidate } = useThree(); // invalidate tells R3F to draw a frame on demand
  const controlsRef = useRef();
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    controls.enabled = false;
    camera.position.set(startPosition.x, startPosition.y, startPosition.z);
    controls.target.set(defaultView.lookAt.x, defaultView.lookAt.y, defaultView.lookAt.z);
    controls.update();
    const proxy = {
      angle: Math.atan2(startPosition.z, startPosition.x),
      radius: Math.hypot(startPosition.x, startPosition.z),
      y: startPosition.y,
    };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tween = gsap.to(proxy, {
      angle: Math.atan2(defaultView.position.z, defaultView.position.x) - Math.PI * 2,
      radius: Math.hypot(defaultView.position.x, defaultView.position.z),
      y: defaultView.position.y,
      duration: reducedMotion ? 0 : 2,
      ease: "power2.inOut",
      onUpdate: () => {
        camera.position.set(Math.cos(proxy.angle) * proxy.radius, proxy.y, Math.sin(proxy.angle) * proxy.radius);
        controls.update();
        invalidate();
      },
      onComplete: () => {
        controls.enabled = true;
        onIntroComplete?.();
      },
    });
    return () => { tween.kill(); controls.enabled = true; };
  }, [camera, invalidate, startPosition, defaultView, onIntroComplete]);

  useEffect(() => {
    if (!targetPosition || !targetLookAt || !controlsRef.current) return;

    const controls = controlsRef.current;
    gsap.killTweensOf(camera.position);
    gsap.killTweensOf(controls.target);
    controls.enabled = false;

    const tl = gsap.timeline({
      onUpdate: () => {
        controls.update();
        invalidate(); // each GSAP tick needs its own invalidate call
      },
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
    return () => { tl.kill(); controls.enabled = true; };
  }, [camera, invalidate, targetPosition, targetLookAt, targetKey]);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableDamping={true}
      dampingFactor={0.05}
      onChange={invalidate}
      onStart={onUserInteract}
      onEnd={onUserStopInteract}
    />
  );
}

export default function CarViewer() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const currentCar = cars.find((c) => c.id === carId) || cars[0];

  useEffect(() => {
    // Fetch only the selected car, alongside its environment rather than
    // waiting for sibling Suspense work or competing with neighboring cars.
    if (currentCar.id === carId) useGLTF.preload(currentCar.model);
  }, [currentCar, carId]);

  const [target, setTarget] = useState(null);
  const [targetKey, setTargetKey] = useState(0);
  const [activeView, setActiveView] = useState("default");
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isSnapped, setIsSnapped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const carNameRef = useRef();
  const introCompletedRef = useRef(false);
  const hotspotJustClickedRef = useRef(false);

  // Defer audio until the selected scene is ready.
  const musicControls = useAmbientMusic(!showLoading);

  const handleIntroComplete = useCallback(() => {
    if (introCompletedRef.current) return;
    introCompletedRef.current = true;
    setIntroDone(true);
    if (!carNameRef.current) return;
    gsap.fromTo(
      carNameRef.current,
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
    );
  }, []);

  const handleModelLoaded = useCallback(() => setShowLoading(false), []);

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

  if (!cars.some((car) => car.id === carId)) return <Navigate to="/showroom" replace />;

  return (
    <div className="w-screen h-dvh bg-[#e7e5e5]">
      <style>{`
        @keyframes pulse {
          0%   { transform: scale(1);   opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>

      <button
        onClick={() => navigate("/showroom")}
        className="absolute top-6 left-6 z-50 text-sm tracking-[0.2em] uppercase text-black/60 hover:text-black transition-colors pointer-events-auto"
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

      {/* Keep the loading overlay until the entire scene has rendered. */}
      {showLoading && <SceneLoading carName={currentCar.name} onBack={() => navigate("/showroom")} />}

      {!showLoading && !introDone && (
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
          onClose={() => setActiveHotspot(null)}
          visible={!!activeHotspot && !isDragging}
          carName={currentCar.brand}
        />
      )}
      {/* HUD / UI Layer */}
      {introDone && currentCar && (
        <>
          {/* Top-right Music Player */}
          <MusicBar
            trackName="Drop It"
            visible={!isDragging}
            onPause={musicControls?.pause}
            onPlay={musicControls?.play}
            isPaused={musicControls?.isPaused}
          />

          {/* Bottom Feature Tiles */}
          <BottomTiles car={currentCar} visible={!isDragging} />
        </>
      )}

      <div className="absolute top-5 right-3 z-10 flex max-w-[55%] flex-wrap justify-end gap-1.5">
        {Object.keys(currentCar.views).map((key) => (
          <button
            key={key}
            onClick={() => handleViewClick(key)}
            className={`px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest rounded-full transition-all duration-200 border
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
        frameloop="demand"
        gl={{
          antialias: true,
          stencil: false, // Disable if not needed - saves memory
          depth: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
          outputColorSpace: THREE.SRGBColorSpace,
          preserveDrawingBuffer: false, // Changed to false for better performance
          powerPreference: "high-performance",
          alpha: true,
          logarithmicDepthBuffer: false,
        }}
        camera={{
          position: [
            currentCar.intro.startPosition.x,
            currentCar.intro.startPosition.y,
            currentCar.intro.startPosition.z,
          ],
          fov: 35,
          near: 0.1,
          far: 1000,
        }}
        // Keep the same resolution while idle, dragging, and animating.
        // Cap high-density screens at 2x without reducing quality on interaction.
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Environment files="/concrete_1.hdr" background={false} />
          <CarModel
            modelPath={currentCar.model}
            position={
              currentCar.modelPosition && [
                currentCar.modelPosition.x,
                currentCar.modelPosition.y,
                currentCar.modelPosition.z,
              ]
            }
          />

          <ContactShadows
            position={[0, -0.01, 0]}
            opacity={0.55}
            scale={20}
            blur={1}
            far={4.5}
            resolution={256}
            // Cache the shadow map for better performance
            frames={1}
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
          <SceneReady onReady={handleModelLoaded} />
        </Suspense>
      </Canvas>
    </div>
  );
}
