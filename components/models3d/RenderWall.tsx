import { floorInterface } from "@/app/view/creator/page";
import { Box } from "@react-three/drei";
import React, { useEffect } from "react";
import { Vector3 } from "three";

export default function RenderWall({
  x,
  y,
  z,
  endX,
  endY,
  endZ,
}: floorInterface) {
  const width = Math.abs(endX - x);
  const depth = Math.abs(endZ - z);

  const centerX = (x + endX) / 2;
  const centerZ = (z + endZ) / 2;

  return (
    <>
      <mesh position={[centerX, 2, centerZ]} receiveShadow castShadow>
        {width > depth ? (
          <boxGeometry args={[width, 5, 0.5]} />
        ) : (
          <boxGeometry args={[0.5, 5, depth]} />
        )}
        <meshPhongMaterial color={0x87b6d6} />
      </mesh>
    </>
  );
}
