import Desk3D from "@/components/models3d/Desk3D";
import { Canvas } from "@react-three/fiber";
import React, { Dispatch, SetStateAction, useState } from "react";
import { selectedDeskType } from "./DesksSection";
import RenderFloor from "@/components/models3d/RenderFloor";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa6";

interface ShowSelectedDeskProps {
  appendDesk: (
    e: React.MouseEvent<HTMLButtonElement>,
    deskPath: string,
    equipPath: string,
    type: "desk" | "static",
    scale: number,
    equipment: string[],
    inputValue: string
  ) => void;
  selectedDesk: selectedDeskType;
  onCloseModal: () => void;
  setSelectedDesk: Dispatch<SetStateAction<selectedDeskType>>;
}

export default function ShowSelectedDesk({
  appendDesk,
  selectedDesk,
  onCloseModal,
  setSelectedDesk,
}: ShowSelectedDeskProps) {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <div className="p-2">
      <h3 className="text-2xl font-medium">Desk version 1</h3>
      <div className="flex ">
        <div className="w-[400px] h-96 pt-10">
          <Canvas camera={{ zoom: 22, position: [-100, 100, 100] }}>
            <Desk3D
              id={"1"}
              deskName={inputValue}
              deskPath={selectedDesk.deskPath}
              equipPath={selectedDesk.equipPath}
              x={0}
              y={0}
              z={0}
              rotX={0}
              rotY={0}
              rotZ={0}
              scale={1.6}
              equipment={selectedDesk.equipment}
            />
            <RenderFloor
              id="1"
              color="#f3ebe6"
              endX={4}
              endY={0}
              endZ={4}
              x={-4}
              y={0}
              z={-4}
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
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              enableDamping={false}
              minPolarAngle={0}
              maxPolarAngle={Math.PI / 2 - 0.1}
            />
          </Canvas>
        </div>
        <div className="flex flex-col justify-between items-start ">
          <div>
            <p className="">Desk Equipment:</p>
            <div className="flex flex-col gap-2 my-2">
              {selectedDesk.equipment.map((item, i) => {
                if (
                  item !== "laptop" &&
                  item !== "mini cactus" &&
                  item !== "lamp"
                ) {
                  return (
                    <div className="flex gap-3 items-center" key={i}>
                      <div className="flex justify-center items-center w-5 h-5 border-2 border-solid bg-gray border-gray rounded-lg text-xs text-white">
                        <FaCheck />
                      </div>
                      <p>{item.charAt(0).toUpperCase() + item.slice(1)}</p>
                    </div>
                  );
                }
              })}
            </div>
            {selectedDesk.equipment.includes("big desk") ? (
              <>
                <p className="mt-6">Addidtional Equipment:</p>
                <div className="flex flex-col gap-2 my-2">
                  <button
                    className="flex gap-3 items-center"
                    onClick={() => {
                      if (selectedDesk.equipment.includes("laptop")) {
                        setSelectedDesk({
                          ...selectedDesk,
                          equipment: selectedDesk.equipment.filter(
                            (item) => item !== "laptop"
                          ),
                        });
                      } else {
                        setSelectedDesk({
                          ...selectedDesk,
                          equipment: [...selectedDesk.equipment, "laptop"],
                        });
                      }
                    }}
                  >
                    <div
                      className={`flex justify-center items-center w-5 h-5 border-2 border-solid border-main2 rounded-lg text-xs text-white  ${
                        selectedDesk.equipment.includes("laptop") && "bg-main2"
                      }`}
                    >
                      <FaCheck />
                    </div>
                    <p>Laptop</p>
                  </button>

                  <button
                    className="flex gap-3 items-center"
                    onClick={() => {
                      if (selectedDesk.equipment.includes("mini cactus")) {
                        setSelectedDesk({
                          ...selectedDesk,
                          equipment: selectedDesk.equipment.filter(
                            (item) => item !== "mini cactus"
                          ),
                        });
                      } else {
                        setSelectedDesk({
                          ...selectedDesk,
                          equipment: [...selectedDesk.equipment, "mini cactus"],
                        });
                      }
                    }}
                  >
                    <div
                      className={`flex justify-center items-center w-5 h-5 border-2 border-solid border-main2 rounded-lg text-xs text-white  ${
                        selectedDesk.equipment.includes("mini cactus") &&
                        "bg-main2"
                      }`}
                    >
                      <FaCheck />
                    </div>
                    <p>Mini Cactus</p>
                  </button>

                  <button
                    className="flex gap-3 items-center"
                    onClick={() => {
                      if (selectedDesk.equipment.includes("lamp")) {
                        setSelectedDesk({
                          ...selectedDesk,
                          equipment: selectedDesk.equipment.filter(
                            (item) => item !== "lamp"
                          ),
                        });
                      } else {
                        setSelectedDesk({
                          ...selectedDesk,
                          equipment: [...selectedDesk.equipment, "lamp"],
                        });
                      }
                    }}
                  >
                    <div
                      className={`flex justify-center items-center w-5 h-5 border-2 border-solid border-main2 rounded-lg text-xs text-white  ${
                        selectedDesk.equipment.includes("lamp") && "bg-main2"
                      }`}
                    >
                      <FaCheck />
                    </div>
                    <p>Lamp</p>
                  </button>
                </div>
              </>
            ) : (
              <p className="text-sm mt-5 pr-10">
                To add additional equipment select{" "}
                <span className="text-main2">&quot;big desk&quot;</span>
              </p>
            )}
          </div>
          <div className="mt-5">
            <div className="mb-3">
              <div className="relative h-[50px] w-full">
                <input
                  id="name"
                  placeholder="Room number"
                  className="border-none focus:outline-none px-3 py-2 w-full"
                  type="text"
                  onChange={(e) => setInputValue(e.target.value)}
                  value={inputValue}
                  autoComplete="off"
                />
                <div className="absolute h-[1.5px] w-full bg-gradient-to-r from-main1 to-main2"></div>
                {!inputValue && (
                  <p className="text-[10px] mt-1 text-main2">
                    Please enter room number
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-4 justify-end items-center p-3 mt-1 flex-col md500:flex-row">
              <button
                onClick={onCloseModal}
                className="w-[115px] text-sm text-center  py-2 text-red-500 border-2 border-solid border-red-500  tracking-wide rounded-full transition-all duration-300 px-6 hover:text-white hover:bg-red-500"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  appendDesk(
                    e,
                    selectedDesk.deskPath,
                    selectedDesk.equipPath,
                    selectedDesk.type,
                    selectedDesk.scale,
                    selectedDesk.equipment,
                    inputValue
                  );
                  onCloseModal();
                }}
                disabled={!inputValue}
                className="w-[115px] text-sm text-center bg-gradient-to-r to-main1 via-main2 from-main1 bg-size-200 bg-pos-0 hover:bg-pos-100 py-[10px] text-white  tracking-wide rounded-full transition-all duration-300 px-6"
              >
                Add Desk
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
