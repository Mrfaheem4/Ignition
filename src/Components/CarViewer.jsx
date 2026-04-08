import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

function PorscheModel() {
  const { scene } = useGLTF("/porsche.glb");
  return <primitive object={scene} />;
}

function CameraRig({ targetPosition, targetLookAt }) {
  const { camera } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    if (!targetPosition || !targetLookAt) return;

    const controls = controlsRef.current;

    // 1. Kill any existing animations to prevent overlaps
    gsap.killTweensOf(camera.position);
    gsap.killTweensOf(controls.target);

    // 2. Disable user interaction during transition
    controls.enabled = false;

    // 3. Create a timeline for synchronized movement
    const tl = gsap.timeline({
      onUpdate: () => controls.update(), // Essential for smoothness
      onComplete: () => {
        controls.enabled = true;
      },
    });

    // Move the Camera Position
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

    // Move the Pivot Point (LookAt)
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
    />
  );
}
export default function CarViewer() {
  const [target, setTarget] = useState(null);

  const views = {
    default: { position: { x: 4, y: 2, z: 5 }, lookAt: { x: 0, y: 0.5, z: 0 } },
    front: { position: { x: 0, y: 1, z: 6 }, lookAt: { x: 0, y: 0.5, z: 0 } },
    wheel: {
      position: { x: -4, y: 0.5, z: 2 },
      lookAt: { x: -1, y: 0.3, z: 1 },
    },
    rear: { position: { x: 0, y: 1.5, z: -6 }, lookAt: { x: 0, y: 0.5, z: 0 } },
  };

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#0a0a0a" }}>
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
            onClick={() => setTarget(views[key])}
            style={{
              padding: "8px 16px",
              background: "#ffffff20",
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
        <CameraRig
          targetPosition={target?.position}
          targetLookAt={target?.lookAt}
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
