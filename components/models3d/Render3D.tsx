import { useLoader } from "@react-three/fiber";
import React, { useRef } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

interface ModelProps {
  path: string;
  x: number;
  y: number;
  z: number;
  scale?: number;
  rotX?: number;
  rotY?: number;
  rotZ?: number;
}

export default function Render3D({
  x,
  y,
  z,
  scale,
  rotX = 0,
  rotY = 0,
  rotZ = 0,
  path,
}: ModelProps) {
  const fileUrl = `/assets3d/${path}.glb`;
  const mesh = useRef<Mesh>(null!);
  const gltf = useLoader(GLTFLoader, fileUrl);


  return (
    <mesh
      ref={mesh}
      position={[x, y, z]}
      scale={scale}
      rotation={[rotX, rotY, rotZ]}
      receiveShadow={true}
      castShadow={true}
    >
      <primitive object={gltf.scene} receiveShadow={true} castShadow={true} />
    </mesh>
  );
}
