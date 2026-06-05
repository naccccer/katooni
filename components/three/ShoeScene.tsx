// Library: react-three-fiber only. The Canvas root.
"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls, useScroll, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ShoeModel } from "./ShoeModel";
import { Particles } from "./Particles";
import { CameraRig } from "./CameraRig";
import { sceneColors } from "@/lib/three-config";

function SceneRoot() {
  // useScroll is provided by ScrollControls wrapper
  void useScroll; // satisfy tree-shake
  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.25} color={sceneColors.ink1} />
      <directionalLight position={[3, 5, 2]} intensity={0.8} color="#ffffff" />
      <directionalLight position={[-3, 1, -2]} intensity={0.4} color={sceneColors.volt} />
      <pointLight position={[0, 0, 3]} intensity={0.6} color={sceneColors.volt} />

      <ShoeModel />
      <Particles />

      {/* Floor / contact darkening plane */}
      <mesh position={[0, -1.0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow={false}>
        <circleGeometry args={[6, 64]} />
        <meshStandardMaterial color={sceneColors.ink0} roughness={0.95} />
      </mesh>

      <Environment preset="night" />
    </>
  );
}

export function ShoeScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      camera={{ position: [2.6, 1.6, 3.4], fov: 38 }}
      style={{ background: "#0A0A0B" }}
    >
      <color attach="background" args={[sceneColors.ink0]} />
      <fog attach="fog" args={[sceneColors.ink0, 6, 16]} />
      <Suspense fallback={null}>
        <ScrollControls pages={3} damping={0.18}>
          <SceneRoot />
        </ScrollControls>
      </Suspense>
    </Canvas>
  );
}
