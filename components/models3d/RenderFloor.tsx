import { floorInterface } from "@/app/view/creator/page";
import React from "react";

export default function RenderFloor({
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
      <mesh position={[centerX, -0.24, centerZ]} receiveShadow castShadow>
        <boxGeometry args={[width, 0.5, depth]} />
        <meshPhongMaterial color={0xf3ebe6} />
      </mesh>
    </>
  );
}
