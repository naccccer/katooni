// Library: react-three-fiber only. Scroll-driven camera + lighting rig.
"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";

// Three keyframe views
const KEYS = [
  { pos: [2.6, 1.6, 3.4], look: [0, 0, 0] }, // 3/4 front
  { pos: [0, 1.0, 4.2], look: [0, 0, 0] }, // profile-ish
  { pos: [0.0, 4.4, 0.01], look: [0, 0, 0] }, // overhead
  { pos: [2.6, 1.6, 3.4], look: [0, 0, 0] }, // back to 3/4
];

function lerpVec3(a: number[], b: number[], t: number, out: THREE.Vector3) {
  out.set(
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  );
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export function CameraRig() {
  const { camera } = useThree();
  const scroll = useScroll();
  const lookTarget = useRef(new THREE.Vector3(0, 0, 0));
  const desiredPos = useRef(new THREE.Vector3());
  const desiredLook = useRef(new THREE.Vector3());

  useFrame(() => {
    const offset = scroll.offset; // 0..1
    // Map offset to a keyframe segment
    const segs = KEYS.length - 1;
    const raw = offset * segs;
    const i = Math.min(Math.floor(raw), segs - 1);
    const t = easeInOut(raw - i);
    lerpVec3(KEYS[i].pos, KEYS[i + 1].pos, t, desiredPos.current);
    lerpVec3(KEYS[i].look, KEYS[i + 1].look, t, desiredLook.current);
    // Smooth toward desired
    camera.position.lerp(desiredPos.current, 0.12);
    lookTarget.current.lerp(desiredLook.current, 0.12);
    camera.lookAt(lookTarget.current);
  });

  return null;
}
