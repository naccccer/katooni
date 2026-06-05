// Library: react-three-fiber only. Instanced particle field.
"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sceneColors } from "@/lib/three-config";

const COUNT = 240;

export function Particles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Pre-randomize positions, scales, and per-instance speeds
  const seeds = useMemo(() => {
    return Array.from({ length: COUNT }).map((_, i) => {
      const seed = i * 0.137;
      return {
        x: (Math.sin(seed * 2.7) * 3.5),
        y: (Math.cos(seed * 1.3) * 2.0),
        z: (Math.sin(seed * 0.9) * 3.0),
        scale: 0.008 + (Math.abs(Math.sin(seed * 4.1)) * 0.022),
        speed: 0.2 + Math.abs(Math.sin(seed * 5.0)) * 0.8,
        phase: seed,
      };
    });
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < COUNT; i++) {
      const s = seeds[i];
      const y = s.y + Math.sin(t * s.speed + s.phase) * 0.4;
      const x = s.x + Math.cos(t * s.speed * 0.7 + s.phase) * 0.3;
      dummy.position.set(x, y, s.z);
      dummy.scale.setScalar(s.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial
        color={sceneColors.volt}
        emissive={sceneColors.volt}
        emissiveIntensity={0.6}
        transparent
        opacity={0.7}
      />
    </instancedMesh>
  );
}
