import { Box } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";

interface WallsSectionProps {
  appendWall: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function WallsSection({ appendWall }: WallsSectionProps) {
  return (
    <div className="flex flex-wrap gap-3 mt-3 w-full">
      <p className="text-lg w-full pl-2">Walls</p>
      <button
        onClick={(e) => appendWall(e)}
        className="w-[90px] h-[90px] border border-solid border-slate-200 rounded-lg p-2 hover:bg-bgWhite1 hover:text-main2 transition-colors duration-300 "
      >
        <div className="h-[50px]">
          <Canvas>
            <Box scale={3.5}>
              <meshStandardMaterial color="#87b6d6" />{" "}
            </Box>
            <ambientLight intensity={4} />
          </Canvas>
        </div>
        <div>
          <p className="text-sm">Wall v.1</p>
        </div>
      </button>
    </div>
  );
}
