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
  }

  function appendFloor(e: React.MouseEvent<HTMLButtonElement>) {
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
      },
    ]);
    setActiveElement(id);
  }

  function appendWall(e: React.MouseEvent<HTMLButtonElement>) {
    const id = `${new Date().getTime().toString()}-wall`;
    setFreeCamera(false);
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
        <button className="p-2  hover:text-main2 rounded-xl text-xl transition-colors duration-300">
          <RiArrowGoBackFill />
        </button>
        <button
          onClick={() => setFreeCamera((s) => !s)}
          className="p-2 hover:text-main2 rounded-xl text-xl transition-colors duration-300"
        >
          <MdOutlinePartyMode />
        </button>
        <button className="p-2 hover:text-main2 rounded-xl text-xl transition-colors duration-300">
          <CiSquarePlus />
        </button>
        <button className="p-2 hover:text-main2 rounded-xl text-xl transition-colors duration-300">
          <CiSquareMinus />
        </button>
      </div>
      <div
        className="overflow-y-auto"
        id="scrollBarLeft"
        // style={{ scrollbarColor: "#007 #fff" }}
      >
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
