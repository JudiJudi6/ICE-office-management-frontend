"use client";

import Menu from "@/components/features/creator/Menu";
import AxesHelper from "@/components/models3d/AxesHelper";
import Desk3D from "@/components/models3d/Desk3D";
import Render3D from "@/components/models3d/Render3D";
import RenderFloor from "@/components/models3d/RenderFloor";
import { Box, OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Vector3 } from "three";

export interface elementInterface {
  id: string;
  type: "static" | "desk";
  path: string;
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  scale: number;
}

export interface floorInterface {
  id: string;
  x: number;
  y: number;
  z: number;
  endX: number;
  endY: number;
  endZ: number;
}

interface SpyProps {
  setX: React.Dispatch<React.SetStateAction<number>>;
  setY: React.Dispatch<React.SetStateAction<number>>;
}

function Spy({ setX, setY }: SpyProps) {
  useFrame(({ mouse, viewport, camera }) => {
    const position = new Vector3();
    const x =
      (mouse.x * viewport.width) / (camera.zoom / 15) +
      camera.getWorldPosition(position).x;
    const y =
      (mouse.y * viewport.height) / (camera.zoom / 15) -
      camera.getWorldPosition(position).z;
    setX(x);
    setY(-y);

    // console.log(x, y);
    // console.log(camera., camera.rotateY, camera.rotateZ);
  });

  return <Box />;
}

export default function Creator(): JSX.Element {
  const [elements, setElements] = useState<elementInterface[]>([]);
  const [floor, setFloor] = useState<floorInterface[]>([]);
  const [activeElement, setActiveElement] = useState("");
  const [clientX, setClientX] = useState(0);
  const [clientZ, setClientZ] = useState(0);

  const [floorSize, setFloorSize] = useState({ x: 0, z: 0, endX: 0, endZ: 0 });

  const [rotY, setRotY] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(
    function () {
      console.log("effect");
      function clearActive() {
        setActiveElement("");
        setRotY(0);
      }

      function rotate(e: KeyboardEvent) {
        if (e.key === "ArrowRight") {
          setRotY((s) => (s += 0.335));
        }
        if (e.key === "ArrowLeft") {
          setRotY((s) => (s -= 0.335));
        }
        if (e.key === "Escape") {
          if (activeElement) {
            setElements((s) => s.slice(0, -1));
            setActiveElement("");
            setRotY(0);
          }
          console.log(floorSize);
        }
      }

      if (canvasRef && canvasRef.current) {
        canvasRef.current.addEventListener("click", clearActive);
        document.addEventListener("keydown", rotate);
      }

      return () => {
        if (canvasRef && canvasRef.current) {
          canvasRef.current.removeEventListener("click", clearActive);
          document.removeEventListener("keydown", rotate);
        }
      };
    },
    [
      canvasRef,
      setActiveElement,
      elements,
      activeElement,
      clientX,
      clientZ,
      floorSize,
    ]
  );

  useEffect(
    function () {
      console.log(floorSize);
      console.log(floor);
      function startPos() {
        console.log(clientX, clientZ);
        setFloorSize((s) => ({
          ...s,
          x: clientX,
          z: clientZ,
        }));
      }

      function endPos() {
        console.log(clientX, clientZ);
        setFloorSize((s) => ({
          ...s,
          endX: clientX,
          endZ: clientZ,
        }));
      }
      if (canvasRef && canvasRef.current) {
        canvasRef.current.addEventListener("mousedown", startPos);
        canvasRef.current.addEventListener("mouseup", endPos);
      }

      return () => {
        if (canvasRef && canvasRef.current) {
          canvasRef.current.removeEventListener("mousedown", startPos);
          canvasRef.current.removeEventListener("mouseup", endPos);
        }
      };
    },
    [clientZ, clientX]
  );

  return (
    <div className="flex pt-[80px] h-screen p-4">
      <Menu
        canvasRef={canvasRef}
        setActiveElement={setActiveElement}
        setElements={setElements}
        setFloor={setFloor}
      />
      <Canvas
        ref={canvasRef}
        orthographic
        camera={{ zoom: 30, position: [0, 200, 0] }}
        shadows={true}
      >
        <Spy setX={setClientX} setY={setClientZ} />
        {elements.map((element) => {
          if (element.id === activeElement) {
            if (element.type === "desk") {
              return <Desk3D key={element.id} />;
            } else {
              element.x = clientX;
              element.z = clientZ;
              element.rotY = rotY;
              return (
                <Render3D
                  key={element.id}
                  path={element.path}
                  x={clientX}
                  y={element.y}
                  z={clientZ}
                  rotX={element.rotX}
                  rotY={rotY}
                  rotZ={element.rotZ}
                  scale={element.scale}
                />
              );
            }
          } else {
            if (element.type === "desk") {
              return <Desk3D key={element.id} />;
            } else {
              return (
                <Render3D
                  key={element.id}
                  path={element.path}
                  x={element.x}
                  y={element.y}
                  z={element.z}
                  rotX={element.rotX}
                  rotY={element.rotY}
                  rotZ={element.rotZ}
                  scale={element.scale}
                />
              );
            }
          }
        })}
        {floor.map((element) => {
          if (element.id === activeElement) {
            element.x = floorSize.x;
            element.z = floorSize.z;

            return (
              <RenderFloor
                id={element.id}
                key={element.id}
                x={clientX}
                y={element.y}
                z={clientZ}
                endX={clientX}
                endZ={clientZ}
                endY={element.y}
              />
            );
          }
        })}
        {/* {elements.map((element) => {
          return (
            <Render3D
              key={element.id}
              path={element.path}
              x={element.x}
              y={element.y}
              z={element.z}
              rotX={element.rotX}
              rotY={element.rotY}
              rotZ={element.rotZ}
              scale={element.scale}
            />
          );
        })} */}
        {/* <OrbitControls /> */}
        <OrbitControls enableRotate={false} />
        <ambientLight intensity={4} />
        <directionalLight
          castShadow={true}
          position={[100, 10, 0]}
          intensity={10}
          color="#fff"
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <gridHelper args={[50, 50, 0x000000, "lightgray"]} />
        <AxesHelper />
      </Canvas>
    </div>
  );
}
