// Library: react-three-fiber only. Procedural shoe geometry.
"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { sceneColors } from "@/lib/three-config";

export function ShoeModel() {
  const root = useRef<THREE.Group>(null);
  const voltBand = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!voltBand.current) return;
    const t = state.clock.elapsedTime;
    // Pulsing emissive on the volt accent band
    const mat = voltBand.current.material as THREE.MeshStandardMaterial;
    if (mat && "emissiveIntensity" in mat) {
      mat.emissiveIntensity = 0.7 + Math.sin(t * 1.4) * 0.3;
    }
  });

  const lacePositions = useMemo(
    () => [
      [-0.45, 0.05, 0.32],
      [-0.15, 0.06, 0.34],
      [0.15, 0.05, 0.34],
      [0.45, 0.03, 0.32],
    ],
    [],
  );

  return (
    <Float
      speed={1.2}
      rotationIntensity={0.18}
      floatIntensity={0.25}
      floatingRange={[-0.05, 0.05]}
    >
      <group ref={root} position={[0, -0.2, 0]} scale={1.4}>
        {/* Midsole (the chunky white-ish base layer) */}
        <RoundedBox
          args={[2.6, 0.42, 1.05]}
          radius={0.18}
          smoothness={4}
          position={[0, -0.35, 0]}
        >
          <meshStandardMaterial
            color={sceneColors.ink2}
            roughness={0.55}
            metalness={0.05}
          />
        </RoundedBox>

        {/* Volt accent band (the eye-catching midsole stripe) */}
        <mesh ref={voltBand} position={[0, -0.32, 0]}>
          <boxGeometry args={[2.55, 0.06, 1.06]} />
          <meshStandardMaterial
            color={sceneColors.volt}
            emissive={sceneColors.volt}
            emissiveIntensity={0.8}
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>

        {/* Upper (rounded box on top) */}
        <RoundedBox
          args={[2.4, 0.55, 0.95]}
          radius={0.22}
          smoothness={4}
          position={[-0.05, 0.05, 0]}
        >
          <meshStandardMaterial
            color={sceneColors.ink1}
            roughness={0.85}
            metalness={0}
          />
        </RoundedBox>

        {/* Toe cap (front rounded section) */}
        <RoundedBox
          args={[0.7, 0.4, 0.85]}
          radius={0.2}
          smoothness={4}
          position={[1.1, -0.05, 0]}
        >
          <meshStandardMaterial
            color={sceneColors.ink2}
            roughness={0.7}
            metalness={0.05}
          />
        </RoundedBox>

        {/* Heel cup */}
        <RoundedBox
          args={[0.55, 0.65, 0.85]}
          radius={0.18}
          smoothness={4}
          position={[-1.2, 0.05, 0]}
        >
          <meshStandardMaterial
            color={sceneColors.ink2}
            roughness={0.7}
            metalness={0.05}
          />
        </RoundedBox>

        {/* Tongue (slightly raised panel) */}
        <RoundedBox
          args={[0.9, 0.08, 0.6]}
          radius={0.04}
          smoothness={2}
          position={[0.1, 0.4, 0]}
          rotation={[0, 0, -0.05]}
        >
          <meshStandardMaterial
            color={sceneColors.ink1}
            roughness={0.95}
            metalness={0}
          />
        </RoundedBox>

        {/* Volt heel tab */}
        <mesh position={[-1.45, 0.25, 0]}>
          <boxGeometry args={[0.05, 0.18, 0.22]} />
          <meshStandardMaterial
            color={sceneColors.volt}
            emissive={sceneColors.volt}
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Laces (4 rings across the upper) */}
        {lacePositions.map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <torusGeometry args={[0.05, 0.012, 8, 16]} />
            <meshStandardMaterial
              color={sceneColors.ink0}
              roughness={0.5}
              metalness={0.4}
            />
          </mesh>
        ))}

        {/* Volt stripe along the side */}
        <mesh position={[0, 0, 0.49]} rotation={[0, 0, 0]}>
          <boxGeometry args={[1.6, 0.03, 0.02]} />
          <meshStandardMaterial
            color={sceneColors.volt}
            emissive={sceneColors.volt}
            emissiveIntensity={0.4}
          />
        </mesh>
        <mesh position={[0, 0, -0.49]}>
          <boxGeometry args={[1.6, 0.03, 0.02]} />
          <meshStandardMaterial
            color={sceneColors.volt}
            emissive={sceneColors.volt}
            emissiveIntensity={0.4}
          />
        </mesh>
      </group>
    </Float>
  );
}
