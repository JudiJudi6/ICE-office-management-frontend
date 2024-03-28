"use client";

import Menu from "@/components/features/creator/Menu";
import AxesHelper from "@/components/models3d/AxesHelper";
import Desk3D from "@/components/models3d/Desk3D";
import Render3D from "@/components/models3d/Render3D";
import { Box, OrbitControls } from "@react-three/drei";
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

interface SpyProps {
  setX: React.Dispatch<React.SetStateAction<number>>;
  setY: React.Dispatch<React.SetStateAction<number>>;
}

function Spy({ setX, setY }: SpyProps) {
  useFrame(({ mouse, viewport }) => {
    const x = (mouse.x * viewport.width) / 2.5;
    const y = (mouse.y * viewport.height) / 2.5;
    setX(x);
    setY(-y);

    // console.log(x, y);
  });

  return <Box />;
}

export default function Creator(): JSX.Element {
  const [elements, setElements] = useState<elementInterface[]>([]);
  const [activeElement, setActiveElement] = useState("");
  const [clientX, setClientX] = useState(0);
  const [clientZ, setClientZ] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // useEffect(
  //   function () {
  //     function spyMouse(e: MouseEvent) {
  //       const mScale = 100;
  //       const offsetX = (window.innerWidth / 2) * mScale;
  //       const offsetY = (window.innerHeight / 2) * mScale;
  //       if (activeElement) {
  //         setClientX(((e.clientX / window.innerWidth) * 2 - 1) * mScale);
  //         setClientZ(((e.clientY / window.innerHeight) * 2 - 1) * mScale);

  //         console.log("x: " + clientX + "y: " + clientZ);
  //       }
  //     }

  //     document.addEventListener("mousemove", spyMouse);

  //     return () => {
  //       document.removeEventListener("mousemove", spyMouse);
  //     };
  //   },
  //   [activeElement, clientX, clientZ]
  // );

  useEffect(
    function () {
      function clearActive() {
        setActiveElement("");
        console.log("object");
        console.log(elements);
      }

      if (canvasRef && canvasRef.current) {
        canvasRef.current.addEventListener("click", clearActive);
      }

      return () => {
        if (canvasRef && canvasRef.current) {
          canvasRef.current.removeEventListener("click", clearActive);
        }
      };
    },
    [canvasRef, setActiveElement, elements]
  );

  return (
    <div className="flex pt-[80px] h-screen p-4">
      <Menu
        canvasRef={canvasRef}
        setActiveElement={setActiveElement}
        setElements={setElements}
      />
      <Canvas
        ref={canvasRef}
        camera={{
          fov: 75,
          position: [0, 80, 0],
        }}
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
              return (
                <Render3D
                  key={element.id}
                  path={element.path}
                  x={clientX}
                  y={element.y}
                  z={clientZ}
                  rotX={element.rotX}
                  rotY={element.rotY}
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
        {elements.map((element) => {
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
        })}
        <Render3D path="desk" x={0} y={0} z={0} key={2} />
        <OrbitControls />
        <ambientLight intensity={4} />
        <directionalLight
          castShadow={true}
          position={[1, 3, 0]}
          intensity={10}
          color="#fff"
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <AxesHelper />
      </Canvas>
      <button>box</button>
    </div>
  );
}
