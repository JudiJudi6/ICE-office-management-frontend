import Render3D from "@/components/models3d/Render3D";
import { Canvas } from "@react-three/fiber";
import React from "react";

interface DesksSectionProps {
  appendElement: (
    e: React.MouseEvent<HTMLButtonElement>,
    path: string,
    type: "desk" | "static",
    scale: number
  ) => void;
}

export default function DesksSection({ appendElement }: DesksSectionProps) {
  return (
    <div className="flex flex-wrap gap-3 mt-3 w-full">
      <p className="text-lg w-full pl-2">Desks</p>
      <button
        onClick={(e) => appendElement(e, "desk", "static", 1.3)}
        className="w-[90px] h-[90px] border border-solid border-slate-200 rounded-lg p-2 hover:bg-bgWhite1 hover:text-main2 transition-colors duration-300 "
      >
        <div className="h-[50px]">
          <Canvas>
            <Render3D path="desk" x={0} y={-2} z={0} scale={1.5} rotY={1} />
            <ambientLight intensity={4} />
          </Canvas>
        </div>
        <div>
          <p className="text-sm">Desk v.1</p>
        </div>
      </button>
    </div>
  );
}
