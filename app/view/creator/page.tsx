"use client";

import Menu from "@/components/features/creator/Menu";
import AxesHelper from "@/components/models3d/AxesHelper";
import Desk3D from "@/components/models3d/Desk3D";
import Render3D from "@/components/models3d/Render3D";
import RenderFloor from "@/components/models3d/RenderFloor";
import RenderWall from "@/components/models3d/RenderWall";
import Spinner from "@/components/ui/Spinner";
import { Box, OrbitControls, Stats, useHelper } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  DirectionalLight,
  DirectionalLightHelper,
  PointLightHelper,
  SpotLightHelper,
  Vector3,
} from "three";

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
  freeCamera: boolean;
}

function Spy({ setX, setY, freeCamera }: SpyProps) {
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
  });

  return (
    <gridHelper visible={!freeCamera} args={[50, 50, 0x000000, "lightgray"]} />
  );
}

export default function Creator(): JSX.Element {
  const [elements, setElements] = useState<elementInterface[]>([]);
  const [floor, setFloor] = useState<floorInterface[]>([]);
  const [walls, setWalls] = useState<floorInterface[]>([]);
  const [activeElement, setActiveElement] = useState("");
  const [clientX, setClientX] = useState(0);
  const [clientZ, setClientZ] = useState(0);

  const [mouseDown, setMouseDown] = useState(false);
  const [freeCamera, setFreeCamera] = useState(false);

  const [floorSize, setFloorSize] = useState({ x: 0, z: 0, endX: 0, endZ: 0 });

  const [rotY, setRotY] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controlsRef = useRef<any>(null);

  useEffect(
    function () {
      function clearActive() {
        setActiveElement("");
        setRotY(0);
      }

      function rotate(e: KeyboardEvent) {
        if (e.key === "ArrowRight") {
          setRotY((s) => (s += Math.PI / 8));
        }
        if (e.key === "ArrowLeft") {
          setRotY((s) => (s -= Math.PI / 8));
        }
        if (e.key === "Escape") {
          if (activeElement) {
            if (activeElement.includes("floor")) {
              setFloor((s) => s.slice(0, -1));
            } else if (activeElement.includes("wall")) {
              setWalls((s) => s.slice(0, -1));
            } else {
              setElements((s) => s.slice(0, -1));
            }
            setActiveElement("");
            setRotY(0);
          }
          console.log(floorSize);
          console.log(floor);
        }
      }

      if (canvasRef && canvasRef.current) {
        canvasRef.current?.addEventListener("click", clearActive);
        document?.addEventListener("keydown", rotate);
      }

      return () => {
        if (canvasRef && canvasRef.current) {
          canvasRef.current?.removeEventListener("click", clearActive);
          document?.removeEventListener("keydown", rotate);
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
      floor,
    ]
  );

  useEffect(
    function () {
      function startPos() {
        console.log("dupa");
        setMouseDown(true);
        setFloorSize((s) => ({
          ...s,
          x: clientX,
          z: clientZ,
        }));
      }

      if (canvasRef && canvasRef.current) {
        canvasRef.current?.addEventListener("mousedown", startPos);
      }

      return () => {
        if (canvasRef && canvasRef.current) {
          canvasRef.current?.removeEventListener("mousedown", startPos);
        }
      };
    },
    [clientX, clientZ]
  );

  useEffect(
    function () {
      function endPos() {
        console.log(clientX, clientZ);
        setFloorSize((s) => ({
          ...s,
          endX: clientX,
          endZ: clientZ,
        }));
        setActiveElement("");
        setFloorSize({ x: 0, z: 0, endX: 0, endZ: 0 });
        setMouseDown(false);
      }

      if (canvasRef && canvasRef.current) {
        canvasRef.current?.addEventListener("mouseup", endPos);
      }

      return () => {
        if (canvasRef && canvasRef.current) {
          canvasRef.current?.removeEventListener("mouseup", endPos);
        }
      };
    },
    [clientZ, clientX]
  );

  useEffect(
    function () {
      if (!freeCamera && controlsRef.current) {
        controlsRef.current.reset();
      }
    },
    [freeCamera]
  );

  return (
    <div className="flex pt-[80px] h-screen p-4">
      {/* <Suspense fallback={<Spinner />}> */}
      <Menu
        canvasRef={canvasRef}
        setActiveElement={setActiveElement}
        setElements={setElements}
        setFloor={setFloor}
        setWalls={setWalls}
        setFreeCamera={setFreeCamera}
      />
      <Canvas
        ref={canvasRef}
        orthographic
        camera={{ zoom: 30, position: [0, 200, 0] }}
        shadows={true}
      >
        <Spy setX={setClientX} setY={setClientZ} freeCamera={freeCamera} />
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
            element.endZ = clientZ;
            element.endX = clientX;

            if (mouseDown) {
              return (
                <RenderFloor
                  id={element.id}
                  key={element.id}
                  x={floorSize.x}
                  y={element.y}
                  z={floorSize.z}
                  endX={clientX}
                  endZ={clientZ}
                  endY={element.endY}
                />
              );
            } else {
              return (
                <Box
                  key={1}
                  position={
                    new Vector3(clientX + 0.5, element.y, clientZ + 0.5)
                  }
                />
              );
            }
          } else {
            return (
              <RenderFloor
                id={element.id}
                key={element.id}
                x={element.x}
                y={element.y}
                z={element.z}
                endX={element.endX}
                endZ={element.endZ}
                endY={element.y}
              />
            );
          }
        })}
        {walls.map((element) => {
          if (element.id === activeElement) {
            element.x = floorSize.x;
            element.z = floorSize.z;
            element.endZ = clientZ;
            element.endX = clientX;

            if (mouseDown) {
              return (
                <RenderWall
                  id={element.id}
                  key={element.id}
                  x={floorSize.x}
                  y={element.y}
                  z={floorSize.z}
                  endX={clientX}
                  endZ={clientZ}
                  endY={element.endY}
                />
              );
            } else {
              return (
                <mesh
                  key={2}
                  position={new Vector3(clientX + 0.25, 2, clientZ + 0.25)}
                >
                  <boxGeometry args={[0.5, 5, 0.5]} />
                  <meshPhongMaterial color={0x87b6d6} />
                </mesh>
              );
            }
          } else {
            return (
              <RenderWall
                id={element.id}
                key={element.id}
                x={element.x}
                y={element.y}
                z={element.z}
                endX={element.endX}
                endZ={element.endZ}
                endY={element.y}
              />
            );
          }
        })}
        <OrbitControls
          ref={controlsRef}
          enableRotate={freeCamera}
          enableDamping={false}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2 - 0.1}
        />
        <ambientLight intensity={4} />
        <directionalLight
          castShadow={true}
          position={[5, 100, 0]}
          intensity={4}
          color="#fff"
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-left={-30}
          shadow-camera-right={20}
          shadow-camera-top={25}
          shadow-camera-bottom={-25}
          shadow-camera-far={200}
        />
        <Stats />
      </Canvas>
      {/* </Suspense> */}
    </div>
  );
}
