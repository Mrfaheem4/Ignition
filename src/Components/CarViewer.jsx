import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import IntroOverlay from "./IntroOverlay";

function PorscheModel() {
  const { scene } = useGLTF("/porsche.glb");
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
  introPlaying,
}) {
  const { camera } = useThree();
  const controlsRef = useRef();

  // Intro sequence
  useEffect(() => {
    if (!introPlaying) return;

    const controls = controlsRef.current;
    controls.enabled = false;

    // Set start position
    camera.position.set(8, 0.5, 4);
    controls.target.set(0, 0.5, 0);
    controls.update();

    const tl = gsap.timeline({
      onUpdate: () => {
        controls.update();
      },
    });

    // Shot 2 — Sweep to front
    tl.to(camera.position, {
      x: 1,
      y: 1.2,
      z: 7,
      duration: 1.2,
      ease: "power3.inOut",
    })

      // NEW Shot 3 — Close-up on the Wheel/Side
      .to(camera.position, {
        x: -4,
        y: 0.5,
        z: 2,
        duration: 1.5,
        ease: "power2.inOut",
      })
      .to(
        controls.target,
        {
          x: -1,
          y: 0.3,
          z: 1,
          duration: 1.5,
          ease: "power2.inOut",
        },
        "<",
      ) // "<" starts this at the same time as the camera position move

      // Shot 4 — Settle to default
      .to(camera.position, {
        x: 4,
        y: 2,
        z: 5,
        duration: 1.2,
        ease: "power3.inOut",
      })
      .to(
        controls.target,
        {
          x: 0,
          y: 0.5,
          z: 0,
          duration: 1.2,
          ease: "power3.inOut",
        },
        "<",
      );

    return () => tl.kill();
  }, [introPlaying]);

  // Regular camera transitions
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
    />
  );
}
export default function CarViewer() {
  const [target, setTarget] = useState(null);
  const [activeView, setActiveView] = useState("default");
  const [isSnapped, setIsSnapped] = useState(false);
  const [introPlaying, setIntroPlaying] = useState(true);
  const [introDone, setIntroDone] = useState(false);
  const carNameRef = useRef();

  const views = {
    default: { position: { x: 4, y: 2, z: 5 }, lookAt: { x: 0, y: 0.5, z: 0 } },
    front: { position: { x: 0, y: 1, z: 6 }, lookAt: { x: 0, y: 0.5, z: 0 } },
    wheel: {
      position: { x: -4, y: 0.5, z: 2 },
      lookAt: { x: -1, y: 0.3, z: 1 },
    },
    rear: { position: { x: 0, y: 1.5, z: -6 }, lookAt: { x: 0, y: 0.5, z: 0 } },
  };

  const hotspots = [
    {
      id: "front",
      label: "Front",
      position: { x: 0, y: 0.5, z: 2.2 },
      view: views.front,
    },
    {
      id: "wheel",
      label: "Wheels",
      position: { x: 0.85, y: 0.3, z: 1.5 },
      view: views.wheel,
    },
    {
      id: "rear",
      label: "Rear",
      position: { x: 0, y: 0.6, z: -2.2 },
      view: views.rear,
    },
  ];

  const handleIntroComplete = () => {
    setIntroPlaying(false);
    setIntroDone(true);
    gsap.fromTo(
      carNameRef.current,
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
    );
  };

  const handleUserInteract = () => {
    setIsSnapped(false);
    if (!introDone) {
      setIntroDone(true);
      gsap.to(carNameRef.current, { opacity: 1, x: 0, duration: 0.3 });
    }
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
          Porsche
        </div>
        <div
          style={{
            fontSize: 16,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          911 Carrera S
        </div>
      </div>

      {/* intro overlay */}
      {!introDone && (
        <IntroOverlay
          carName="Carrera S"
          carModel="Porsche 911"
          onComplete={handleIntroComplete}
        />
      )}

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
        {Object.keys(views).map((key) => (
          <button
            key={key}
            onClick={() => {
              setTarget(views[key]);
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

      <Canvas camera={{ position: [8, 0.5, 4], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <PorscheModel />

        {introDone &&
          hotspots
            .filter((h) => !(isSnapped && h.id === activeView))
            .map((h) => (
              <Hotspot
                key={h.id}
                position={h.position}
                label={h.label}
                onClick={() => {
                  setTarget(h.view);
                  setActiveView(h.id);
                  setIsSnapped(true);
                }}
              />
            ))}

        <CameraRig
          targetPosition={target?.position}
          targetLookAt={target?.lookAt}
          onUserInteract={handleUserInteract}
          introPlaying={introPlaying}
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
