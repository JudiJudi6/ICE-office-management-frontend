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

import { RiArrowGoBackFill } from "react-icons/ri";
import { MdOutlinePartyMode } from "react-icons/md";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { TfiHummer } from "react-icons/tfi";
import { RxCross2 } from "react-icons/rx";

import { Canvas } from "@react-three/fiber";
import DesksSection from "./DesksSection";
import FloorSection from "./FloorSection";
import WallsSection from "./WallsSection";
import ChairsSection from "./ChairsSection";
import FurnitureSection from "./FurnitureSection";
import DecorationSection from "./DecorationSection";

interface MenuProps {
  canvasRef: MutableRefObject<HTMLElement | null>;
  setActiveElement: Dispatch<SetStateAction<string>>;
  setElements: Dispatch<SetStateAction<elementInterface[]>>;
  setFloor: Dispatch<SetStateAction<floorInterface[]>>;
  setWalls: Dispatch<SetStateAction<floorInterface[]>>;
  setFreeCamera: Dispatch<SetStateAction<boolean>>;
  freeCamera: boolean;
  setDestroyer: Dispatch<SetStateAction<boolean>>;
  destroyer: boolean;
  setHistory: Dispatch<SetStateAction<string[]>>;
  backChanges: () => void;
  clearWorkspace: () => void;
}

export default function Menu({
  canvasRef,
  setActiveElement,
  setElements,
  setFloor,
  setFreeCamera,
  setHistory,
  setWalls,
  backChanges,
  setDestroyer,
  destroyer,
  freeCamera,
  clearWorkspace,
}: MenuProps) {
  function appendElement(
    e: React.MouseEvent<HTMLButtonElement>,
    path: string,
    type: "desk" | "static",
    scale: number
  ) {
    const id = `${new Date().getTime().toString()}-${path}`;
    setFreeCamera(false);
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
    setHistory((his) => [...his, "element"]);
  }

  function appendFloor(e: React.MouseEvent<HTMLButtonElement>, color: string) {
    const id = `${new Date().getTime().toString()}-floor`;
    setFreeCamera(false);
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
        color: color,
      },
    ]);
    setActiveElement(id);
    setHistory((his) => [...his, "floor"]);
  }

  function appendWall(
    e: React.MouseEvent<HTMLButtonElement>,
    color: string,
    height: number
  ) {
    const id = `${new Date().getTime().toString()}-wall`;
    setFreeCamera(false);
    setWalls((elements) => [
      ...elements,
      {
        id: id,
        x: e.clientX,
        y: height,
        z: e.clientY,
        endX: 0,
        endY: 0,
        endZ: 0,
        color: color,
      },
    ]);
    setActiveElement(id);
    setHistory((his) => [...his, "wall"]);
  }

  return (
    <div className="flex flex-col w-72 pr-4">
      <button className="p-2  hover:bg-bgWhite1 rounded-xl text-lg transition-colors duration-300 my-2 flex justify-center items-center gap-3">
        Office <span className="text-main2 ">Creator</span>{" "}
        <span className="text-xl">
          <IoIosHelpCircleOutline />
        </span>
      </button>
      <div className="flex w-full justify-between my-2 bg-bgWhite1 p-1 rounded-xl">
        <button
          onClick={clearWorkspace}
          className="p-2 hover:text-main2 rounded-xl text-xl transition-colors duration-300"
        >
          <RxCross2 />
        </button>
        <button
          onClick={() => setFreeCamera((s) => !s)}
          className={`p-2 hover:text-main2 rounded-xl text-xl transition-colors duration-300  ${
            freeCamera && "text-main2"
          }`}
        >
          <MdOutlinePartyMode />
        </button>
        <button
          onClick={() => setDestroyer((s) => !s)}
          className={`p-2 hover:text-main2 rounded-xl text-xl transition-colors duration-300  ${
            destroyer && "text-main2"
          }`}
        >
          <TfiHummer />
        </button>
        <button
          onClick={backChanges}
          className="p-2  hover:text-main2 rounded-xl text-xl transition-colors duration-300"
        >
          <RiArrowGoBackFill />
        </button>
      </div>
      <div className="overflow-y-auto mt-2">
        <FloorSection appendFloor={appendFloor} />
        <WallsSection appendWall={appendWall} />
        <DesksSection appendElement={appendElement} />
        <ChairsSection appendElement={appendElement} />
        <FurnitureSection appendElement={appendElement} />
        <DecorationSection appendElement={appendElement} />
      </div>
    </div>
  );
}
