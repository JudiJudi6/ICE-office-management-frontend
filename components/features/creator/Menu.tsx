import { elementInterface, floorInterface } from "@/app/view/creator/page";
import Render3D from "@/components/models3d/Render3D";
import { Box } from "@react-three/drei";
import React, {
  Dispatch,
  MouseEvent,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { Vector3 } from "three";

interface MenuProps {
  canvasRef: MutableRefObject<HTMLElement | null>;
  setActiveElement: Dispatch<SetStateAction<string>>;
  setElements: Dispatch<SetStateAction<elementInterface[]>>;
  setFloor: Dispatch<SetStateAction<floorInterface[]>>;
  setWalls: Dispatch<SetStateAction<floorInterface[]>>;
  setFreeCamera: Dispatch<SetStateAction<boolean>>;
}

export default function Menu({
  canvasRef,
  setActiveElement,
  setElements,
  setFloor,
  setFreeCamera,
  setWalls,
}: MenuProps) {
  function appendElement(
    e: React.MouseEvent<HTMLButtonElement>,
    path: string,
    type: "desk" | "static",
    scale: number
  ) {
    const id = `${new Date().getTime().toString()}-${path}`;
    console.log(id);
    setElements((elements) => [
      ...elements,
      {
        id: id,
        path: path,
        rotX: 0,
        rotY: 0,
        rotZ: 0,
        scale: scale,
        type: "static",
        x: e.clientX,
        y: 0,
        z: e.clientY,
      },
    ]);
    setActiveElement(id);

    console.log("append");
  }

  function appendFloor(e: React.MouseEvent<HTMLButtonElement>) {
    const id = `${new Date().getTime().toString()}-floor`;
    setFloor((elements) => [
      ...elements,
      {
        id: id,
        x: e.clientX,
        y: 0,
        z: e.clientY,
        endX: 0,
        endY: 0,
        endZ: 0,
      },
    ]);
    setActiveElement(id);

    console.log("append");
  }

  function appendWall(e: React.MouseEvent<HTMLButtonElement>) {
    const id = `${new Date().getTime().toString()}-wall`;
    setWalls((elements) => [
      ...elements,
      {
        id: id,
        x: e.clientX,
        y: 0,
        z: e.clientY,
        endX: 0,
        endY: 0,
        endZ: 0,
      },
    ]);
    setActiveElement(id);

    console.log("append");
  }

  return (
    <div className="flex flex-col">
      <button onClick={(e) => appendElement(e, "pot_cactus", "static", 1)}>
        cactus
      </button>{" "}
      <button onClick={(e) => appendElement(e, "chair2", "static", 1)}>
        chair
      </button>
      <button onClick={(e) => appendElement(e, "desk", "static", 1)}>
        desk
      </button>
      <button onClick={(e) => appendElement(e, "sofa", "static", 1)}>
        sofa
      </button>
      <button onClick={(e) => appendElement(e, "pot_leaves", "static", 1)}>
        choinka
      </button>
      <button onClick={(e) => appendFloor(e)}>floor</button>
      <button onClick={(e) => appendWall(e)}>wall</button>
      <button onClick={() => setFreeCamera((s) => !s)}>free camera</button>
    </div>
  );
}
