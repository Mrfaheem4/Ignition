import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

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

function CameraRig({ targetPosition, targetLookAt, onUserInteract }) {
  const { camera } = useThree();
  const controlsRef = useRef();

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

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#0a0a0a" }}>
      <style>{`
        @keyframes pulse {
          0%   { transform: scale(1);   opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>

      <div
        style={{
          position: "absolute",
          zIndex: 10,
          top: 20,
          left: 20,
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

      <Canvas camera={{ position: [4, 2, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <PorscheModel />

        {hotspots
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
          onUserInteract={() => setIsSnapped(false)}
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
