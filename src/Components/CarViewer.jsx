import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei";
import { useRef, useEffect, useState, Suspense } from "react";
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
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          border: "1.5px solid white",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(4px)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 12,
            height: 12,
            borderRadius: "50%",
            border: "1.5px solid rgba(255,255,255,0.6)",
            animation: "pulse 1.8s ease-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 18,
            left: "50%",
            transform: "translateX(-50%)",
            color: "white",
            fontSize: 9,
            whiteSpace: "nowrap",
            fontFamily: "sans-serif",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            background: "rgba(0,0,0,0.5)",
            padding: "2px 6px",
            borderRadius: 4,
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
  }, [targetPosition, targetLookAt]);

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
  const [activeView, setActiveView] = useState("default");
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isSnapped, setIsSnapped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [introPlaying, setIntroPlaying] = useState(true);
  const [introDone, setIntroDone] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const carNameRef = useRef();
  const introCompletedRef = useRef(false);

  const handleIntroComplete = () => {
    if (introCompletedRef.current) return;
    introCompletedRef.current = true;
    setIntroPlaying(false);
    setIntroDone(true);
    gsap.fromTo(
      carNameRef.current,
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
    );
  };

  const handleUserInteract = () => {
    setIsDragging(true);
    setIsSnapped(false);
    setActiveHotspot(null);
    if (!introDone) {
      setIntroPlaying(false);
      setIntroDone(true);
      gsap.to(carNameRef.current, { opacity: 1, x: 0, duration: 0.3 });
    }
  };

  const handleUserStopInteract = () => {
    setIsDragging(false);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#0a0a0a" }}>
      <style>{`
        @keyframes pulse {
          0%   { transform: scale(1);   opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>

      {/* permanent car name top left */}
      <div
        ref={carNameRef}
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          zIndex: 30,
          opacity: 0,
          color: "white",
          fontFamily: "sans-serif",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontSize: 10,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
            marginBottom: 2,
          }}
        >
          {currentCar.brand}
        </div>
        <div
          style={{
            fontSize: 16,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          {currentCar.name}
        </div>
      </div>

      {/* loading screen */}
      {!modelLoaded && (
        <LoadingScreen
          carName={currentCar.name}
          brand={currentCar.brand}
          accent={currentCar.intro.text.accent}
        />
      )}

      {/* intro overlay */}
      {modelLoaded && !introDone && (
        <IntroOverlay
          carName={currentCar.name}
          carModel={currentCar.brand}
          accent={currentCar.intro.text.accent}
          style={currentCar.intro.text.style}
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
      <div
        style={{
          position: "absolute",
          zIndex: 10,
          top: 20,
          right: 20,
          display: "flex",
          gap: 10,
        }}
      >
        {Object.keys(currentCar.views).map((key) => (
          <button
            key={key}
            onClick={() => {
              setTarget(currentCar.views[key]);
              setActiveView(key);
              setIsSnapped(true);
            }}
            style={{
              padding: "8px 16px",
              background: activeView === key ? "#ffffff40" : "#ffffff20",
              color: "white",
              border: "1px solid #ffffff40",
              borderRadius: 6,
              cursor: "pointer",
            }}
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
                  setTarget(currentCar.views[h.view]);
                  setActiveView(h.id);
                  setIsSnapped(true);
                  setActiveHotspot(h);
                }}
              />
            ))}

        <CameraRig
          targetPosition={target?.position}
          targetLookAt={target?.lookAt}
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
