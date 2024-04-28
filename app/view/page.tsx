"use client";

import SecondNav from "@/components/features/nav/SecondNav";
import Desk3D from "@/components/models3d/Desk3D";
import Render3D from "@/components/models3d/Render3D";
import RenderFloor from "@/components/models3d/RenderFloor";
import RenderWall from "@/components/models3d/RenderWall";
import Spinner from "@/components/ui/Spinner";
import { OfficesContext } from "@/context/OfficesContext";
import OfficeDataInterface from "@/interfaces/OfficeInterface";
import UserInterface from "@/interfaces/UserInterface";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { Suspense, useContext, useEffect, useState } from "react";

export default function App() {
  const [activeDesk, setActiveDesk] = useState("");
  const [selectedDesk, setSelectedDesk] = useState("");
  const [freeCamera, setFreeCamera] = useState(false);
  const [highlightDesks, setHighlightDesks] = useState(false);

  const [selectedOffice, setSelectedOffice] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedDateFrom, setSelectedDateFrom] = useState("");
  const [selectedDateTo, setSelectedDateTo] = useState("");
  const officeData = useContext(OfficesContext);
  const [selectedOfficeBuild, setSelectedOfficeBuild] = useState<
    OfficeDataInterface | undefined
  >(officeData?.data.offices.at(0) || undefined);
  const queryClient = useQueryClient();
  const user: UserInterface | undefined = queryClient.getQueryData(["user"]);
  const isAuth =
    localStorage.getItem("sessionToken") !== null && user?.data.user;
  const router = useRouter();

  useEffect(
    function () {
      if (!isAuth) {
        router.push("/login");
      }
    },
    [isAuth, router]
  );

  useEffect(
    function () {
      console.log(selectedDesk);
    },
    [selectedDesk]
  );

  useEffect(() => {
    const foundOffice = officeData?.data.offices.find(
      (item) => item.id === selectedOffice
    );
    if (foundOffice) {
      setSelectedOfficeBuild(foundOffice);
    }
  }, [officeData, selectedOffice]);

  if (!isAuth) {
    return null;
  }

  return (
    <div className="text-black pt-16 h-screen">
      <SecondNav
        setSelectedOffice={setSelectedOffice}
        selectedOffice={selectedOffice}
        setSelectedDay={setSelectedDay}
        selectedDay={selectedDay}
        setSelectedDateFrom={setSelectedDateFrom}
        selectedDateFrom={selectedDateFrom}
        setSelectedDateTo={setSelectedDateTo}
        selectedDateTo={selectedDateTo}
      />
      <div className="h-[calc(100%-64px)]">
        <Suspense fallback={<Spinner />}>
          <Canvas
            orthographic
            camera={{ zoom: 15, position: [0, 200, 0] }}
            shadows={true}
          >
            {selectedOfficeBuild?.renderData.elements.map((element) => {
              return (
                <Render3D
                  id={element.id}
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
            {selectedOfficeBuild?.renderData.desks.map((element) => {
              return (
                <Desk3D
                  id={element.id}
                  deskName={element.deskName}
                  key={element.id}
                  type={element.type}
                  deskPath={element.deskPath}
                  equipPath={element.equipPath}
                  x={element.x}
                  y={element.y}
                  z={element.z}
                  rotX={element.rotX}
                  rotY={element.rotY}
                  rotZ={element.rotZ}
                  scale={element.scale}
                  equipment={element.equipment}
                  activeDesk={activeDesk}
                  setActiveDesk={setActiveDesk}
                  setSelectedDesk={setSelectedDesk}
                  selectedDesk={selectedDesk}
                />
              );
            })}
            {selectedOfficeBuild?.renderData.floor.map((element) => {
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
                  color={element.color}
                />
              );
            })}
            {selectedOfficeBuild?.renderData.walls.map((element) => {
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
                  color={element.color}
                  transparent={element.transparent}
                />
              );
            })}
            <OrbitControls
              enableRotate={true}
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
          </Canvas>
        </Suspense>
      </div>
    </div>
  );
}
