import Render3D from "@/components/models3d/Render3D";
import RenderFloor from "@/components/models3d/RenderFloor";
import { Box } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";

interface FloorSectionProps {
  appendFloor: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function FloorSection({ appendFloor }: FloorSectionProps) {
  return (
    <div className="flex flex-wrap gap-3 mt-3 w-full">
      <p className="text-lg w-full pl-2">Floors</p>
      <button
        onClick={(e) => appendFloor(e)}
        className="w-[90px] h-[90px] border border-solid border-slate-200 rounded-lg p-2 hover:bg-bgWhite1 hover:text-main2 transition-colors duration-300 "
      >
        <div className="h-[50px]">
          <Canvas>
            <Box scale={3.5} />
            <ambientLight intensity={4} />
          </Canvas>
        </div>
        <div>
          <p className="text-sm">Floor v.1</p>
        </div>
      </button>
    </div>
  );
}
