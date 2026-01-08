import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { FC, Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

/* ---------------- Bottle Model ---------------- */

interface BottleModelProps {
  rotationY?: number;
}

const BottleModel: FC<BottleModelProps> = ({ rotationY = 0 }) => {
  const { scene } = useGLTF("/models/plastic_bottle.glb") as {
    scene: THREE.Group;
  };
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);
  }, [scene]);

  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      // @ts-ignore
      if (child.isMesh) {
        // @ts-ignore
        if (child.material) {
          // @ts-ignore
          child.material.side = THREE.DoubleSide;
          // @ts-ignore
          child.material.transparent = false;
        }
        // @ts-ignore
        child.castShadow = true;
        // @ts-ignore
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotationY + Math.PI / 4;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive
        object={scene}
        scale={0.1}
        position={[0, -0.8, 0]}
      />
    </group>
  );
};


/* ---------------- Background Canvas ---------------- */

interface Background3DProps {
  rotationY?: number;
}

const Background3D: FC<Background3DProps> = ({ rotationY = 0 }) => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 35 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <hemisphereLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <Environment preset="studio" />
        <Suspense fallback={null}>
          <BottleModel rotationY={rotationY} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Background3D;

/* ---------------- Preload (correct place) ---------------- */
useGLTF.preload("/models/plastic_bottle.glb");
