"use client";

import SelectedDeskModal from "@/components/features/mainView/SelectedDeskModal";
import SecondNav from "@/components/features/nav/SecondNav";
import Desk3D from "@/components/models3d/Desk3D";
import Render3D from "@/components/models3d/Render3D";
import RenderFloor from "@/components/models3d/RenderFloor";
import RenderWall from "@/components/models3d/RenderWall";
import Spinner from "@/components/ui/Spinner";
import { OfficesContext } from "@/context/OfficesContext";
import OfficeDataInterface, {
  ReservationData,
} from "@/interfaces/OfficeInterface";
import UserInterface from "@/interfaces/UserInterface";
import { OrbitControls, OrbitControlsProps } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { MdOutlineChevronRight, MdOutlinePartyMode } from "react-icons/md";
import React, {
  MutableRefObject,
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { SectionsToolTip } from "@/components/features/creator/SectionsToolTip";
import { MdOutlineLockOpen } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { PiMapTrifoldLight } from "react-icons/pi";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import { MdOutlineChevronLeft } from "react-icons/md";

export interface cameraInterface {
  zoom: number;
  position: [number, number, number];
  rotation: [number, number, number];
}

interface CameraRigProps {
  resetTrigger: string;
  controls: MutableRefObject<OrbitControlsProps | undefined>;
  resetCamera: boolean;
  isometricView: boolean;
  isometricViewStep: number;
}

function CameraRig({
  resetTrigger,
  controls,
  resetCamera,
  isometricView,
  isometricViewStep,
}: CameraRigProps) {
  const { camera } = useThree();

  const targetPositions = [
    [100, 120, -100],
    [100, 120, 100],
    [-100, 120, 100],
    [-100, 120, -100],
  ];

  useEffect(() => {
    camera.position.set(0, 200, 0);
    camera.rotation.set(0, 0, 0);
    camera.lookAt(0, 0, 0);

    if (controls.current) {
      controls.current.reset();
    }
  }, [resetTrigger, resetCamera, camera, controls]);

  useFrame(() => {
    if (isometricView) {
      const [targetX, targetY, targetZ] =
        targetPositions[Math.abs(isometricViewStep) % 4];
      camera.position.lerp({ x: targetX, y: targetY, z: targetZ }, 0.1);
      camera.lookAt(0, 0, 0);
      if (controls.current) {
        controls.current.update();
      }
    }
  });

  return null;
}
export default function App() {
  const searchParams = useSearchParams();
  const control = useRef<OrbitControlsProps>();
  const [activeDesk, setActiveDesk] = useState("");
  const [selectedDesk, setSelectedDesk] = useState("");
  const [freeCamera, setFreeCamera] = useState(false);
  const [highlightDesks, setHighlightDesks] = useState(false);
  const [availableDesks, setAvailableDesks] = useState<string[]>([]);
  const [resetCamera, setResetCamera] = useState(false);
  const [isometricView, setIsometricView] = useState(false);
  const [isometricViewStep, setIsometricViewStep] = useState(-1000);

  const [selectedOffice, setSelectedOffice] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedDateFrom, setSelectedDateFrom] = useState("");
  const [selectedDateTo, setSelectedDateTo] = useState("");
  const officeData = useContext(OfficesContext);
  const [selectedOfficeBuild, setSelectedOfficeBuild] = useState<
    OfficeDataInterface | undefined
  >(officeData?.data.offices.at(0));
  const queryClient = useQueryClient();
  const user: UserInterface | undefined = queryClient.getQueryData(["user"]);
  const isAuth =
    localStorage.getItem("sessionToken") !== null && user?.data.user;
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(
    selectedOfficeBuild?.authorId === user?.data.user._id
  );
  
  
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
      const office = searchParams.get("o");
      console.log(office);
      if (office) {
        setSelectedOffice(office);
      }
    },
    [searchParams, setSelectedOffice, selectedOffice]
  );
  
  useEffect(() => {
    const foundOffice = officeData?.data.offices.find(
      (item) => item.id === selectedOffice
    );
    if (foundOffice) {
      setSelectedOfficeBuild(foundOffice);
      setIsAdmin(foundOffice.authorId === user?.data.user._id);
    }
  }, [officeData, selectedOffice, user?.data.user._id]);
  
  if (!isAuth) {
    return null;
  }


  // const isDeskAvailable = (
  //   deskReservationData: ReservationData[] | undefined,
  //   selectedTimeFrom: string,
  //   selectedTimeTo: string
  // ) => {
  //   // Iterujemy przez rezerwacje biurka
  //   for (const reservation of deskReservationData) {
  //     // Pobieramy czasy rozpoczęcia i zakończenia rezerwacji
  //     const startTime = new Date(reservation.startTime);
  //     const endTime = new Date(reservation.endTime);

  //     // Sprawdzamy, czy wybrany przedział czasowy koliduje z rezerwacją
  //     if (
  //       (selectedTimeFrom >= startTime && selectedTimeFrom < endTime) ||
  //       (selectedTimeTo > startTime && selectedTimeTo <= endTime) ||
  //       (selectedTimeFrom <= startTime && selectedTimeTo >= endTime)
  //     ) {
  //       // Jeśli istnieje kolizja, biurko jest niedostępne w wybranym przedziale czasowym
  //       return false;
  //     }
  //   }
  //   // Jeśli nie występuje kolizja, biurko jest dostępne
  //   return true;
  // };

  return (
    <div className="text-black pt-16 h-screen relative overflow-x-hidden">
      {selectedDesk && (
        <SelectedDeskModal
          deskId={selectedDesk}
          setDeskId={setSelectedDesk}
          selectedOfficeBuild={selectedOfficeBuild}
          officeId={selectedOfficeBuild?.id}
          setSelectedDay={setSelectedDay}
          selectedDay={selectedDay}
          setSelectedDateFrom={setSelectedDateFrom}
          selectedDateFrom={selectedDateFrom}
          setSelectedDateTo={setSelectedDateTo}
          selectedDateTo={selectedDateTo}
          isAdmin={isAdmin}
        />
      )}
      <SecondNav
        setSelectedOffice={setSelectedOffice}
        selectedOffice={selectedOffice}
        setSelectedDay={setSelectedDay}
        selectedDay={selectedDay}
        setSelectedDateFrom={setSelectedDateFrom}
        selectedDateFrom={selectedDateFrom}
        setSelectedDateTo={setSelectedDateTo}
        selectedDateTo={selectedDateTo}
        setDeskId={setSelectedDesk}
        selectedOfficeBuild={selectedOfficeBuild}
        isAdmin={isAdmin}
      />
      <div className="relative h-full">
        <SectionsToolTip
          title={
            <>
              <p className="text-xs text-main2">Lock Map Rotation</p>
            </>
          }
        >
          <button
            onClick={() => {
              setFreeCamera((s) => !s);
              if (isometricView) {
                setIsometricView(false);
              }
            }}
            className={`absolute top-[270px] md500:top-[136px] lg:top-[78px] left-4 p-2 z-50 hover:text-main2 rounded-xl text-lg transition-colors duration-300 hidden sm:block ${
              freeCamera && "text-main2"
            }`}
          >
            <MdOutlineLockOpen />
          </button>
        </SectionsToolTip>
        <SectionsToolTip
          title={
            <>
              <p className="text-xs text-main2">Reset camera position</p>
            </>
          }
        >
          <button
            onClick={() => setResetCamera((s) => !s)}
            className={`absolute top-[270px] md500:top-[136px] lg:top-[78px] left-12 p-2 z-50 hover:text-main2 rounded-xl text-lg transition-colors duration-300 hidden sm:block `}
          >
            <GrPowerReset />
          </button>
        </SectionsToolTip>
        <SectionsToolTip
          title={
            <>
              <p className="text-xs text-main2">
                {isometricView
                  ? "Disable isometric view"
                  : "Enable isometric view"}
              </p>
            </>
          }
        >
          <button
            onClick={() => {
              setIsometricView((s) => !s);
              if (isometricView) {
                setFreeCamera(false);
                setResetCamera((s) => !s);
              } else {
                setFreeCamera(true);
              }
            }}
            className={`absolute top-[270px] md500:top-[136px] lg:top-[78px] left-20 p-2 z-50 hover:text-main2 rounded-xl text-lg transition-colors duration-300 hidden sm:block ${
              isometricView && "text-main2"
            }`}
          >
            <PiMapTrifoldLight />
          </button>
        </SectionsToolTip>
        {isometricView && (
          <>
            <SectionsToolTip
              title={
                <>
                  <p className="text-xs text-main2">Rotate left</p>
                </>
              }
            >
              <button
                onClick={() => setIsometricViewStep((s) => s - 1)}
                className={`absolute top-[270px] md500:top-[136px] lg:top-[78px] left-28 p-2 z-50 hover:text-main2 rounded-xl text-lg transition-colors duration-300 `}
              >
                <MdOutlineChevronLeft />
              </button>
            </SectionsToolTip>
            <SectionsToolTip
              title={
                <>
                  <p className="text-xs text-main2">Rotate right</p>
                </>
              }
            >
              <button
                onClick={() => setIsometricViewStep((s) => s + 1)}
                className={`absolute top-[270px] md500:top-[136px] lg:top-[78px] left-36 p-2 z-50 hover:text-main2 rounded-xl text-lg transition-colors duration-300  hidden sm:block`}
              >
                <MdOutlineChevronRight />
              </button>
            </SectionsToolTip>
          </>
        )}
        <Suspense fallback={<Spinner />}>
          <Canvas
            orthographic
            camera={{
              zoom: 15,
              position: [0, 200, 0],
            }}
            shadows={true}
          >
            <CameraRig
              resetTrigger={selectedOffice}
              controls={control}
              resetCamera={resetCamera}
              isometricView={isometricView}
              isometricViewStep={isometricViewStep}
            />
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
              ref={control}
              enableRotate={!freeCamera}
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
