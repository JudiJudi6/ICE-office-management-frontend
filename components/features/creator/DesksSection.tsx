"use client";

import Image from "next/image";
import React, { useState } from "react";
import { SectionsToolTip } from "./SectionsToolTip";
import Modal from "@/components/ui/Modal";
import ShowSelectedDesk from "./ShowSelectedDesk";

interface DesksSectionProps {
  appendDesk: (
    e: React.MouseEvent<HTMLButtonElement>,
    deskPath: string,
    equipPath: string,
    type: "desk" | "static",
    scale: number,
    equipment: string[],
    inputValue: string
  ) => void;
}

export interface selectedDeskType {
  e: React.MouseEvent<HTMLButtonElement> | null;
  deskPath: string;
  equipPath: string;
  type: "desk" | "static";
  scale: number;
  equipment: string[];
}

export default function DesksSection({ appendDesk }: DesksSectionProps) {
  const [selectedDesk, setSelectedDesk] = useState<selectedDeskType>({
    e: null,
    deskPath: "desk",
    equipPath: "pc_setup_single_monitor",
    type: "static",
    scale: 1.6,
    equipment: ["basic pc set"],
  });

  return (
    <div className="flex flex-wrap gap-3 mt-3 w-full">
      <p className="text-lg w-full pl-2">Desks</p>

      <Modal>
        <Modal.Open
          opens="desk1"
          additionalFn={(e) => {
            setSelectedDesk({
              e: e,
              deskPath: "desk",
              equipPath: "pc_setup_single_monitor",
              type: "static",
              scale: 1.6,
              equipment: ["basic pc set"],
            });
          }}
        >
          <SectionsToolTip
            title={
              <>
                <h1 className="text-xs text-main2">Desk Equipment:</h1>
                <ul className="mt-1">
                  <li>- Basic PC Set</li>
                </ul>
              </>
            }
          >
            <button className="w-[90px] h-[90px] border border-solid border-slate-200 rounded-lg p-2 hover:bg-bgWhite1 hover:text-main2 transition-colors duration-300 focus:outline-none">
              <div className="flex justify-center items-center h-[50px]">
                <Image
                  src="/creatorImages/desk.jpg"
                  alt=""
                  width={35}
                  height={35}
                />
              </div>
              <div>
                <p className="text-sm">Desk v.1</p>
              </div>
            </button>
          </SectionsToolTip>
        </Modal.Open>
        <Modal.Window name="desk1">
          <ShowSelectedDesk
            selectedDesk={selectedDesk}
            appendDesk={appendDesk}
            onCloseModal={undefined as never}
            setSelectedDesk={setSelectedDesk}
          />
        </Modal.Window>
      </Modal>

      <Modal>
        <Modal.Open
          opens="desk2"
          additionalFn={(e) => {
            setSelectedDesk({
              e: e,
              deskPath: "desk",
              equipPath: "pc_setup_dual_monitor",
              type: "static",
              scale: 1.6,
              equipment: ["basic pc set", "second monitor"],
            });
          }}
        >
          <SectionsToolTip
            title={
              <>
                <h1 className="text-xs text-main2">Desk Equipment:</h1>
                <ul className="mt-1">
                  <li>- Basic PC Set</li>
                  <li>- Second Monitor</li>
                </ul>
              </>
            }
          >
            <button className="w-[90px] h-[90px] border border-solid border-slate-200 rounded-lg p-2 hover:bg-bgWhite1 hover:text-main2 transition-colors duration-300 focus:outline-none">
              <div className="flex justify-center items-center h-[50px]">
                <Image
                  src="/creatorImages/desk.jpg"
                  alt=""
                  width={35}
                  height={35}
                />
              </div>
              <div>
                <p className="text-sm">Desk v.2</p>
              </div>
            </button>
          </SectionsToolTip>
        </Modal.Open>
        <Modal.Window name="desk2">
          <ShowSelectedDesk
            selectedDesk={selectedDesk}
            appendDesk={appendDesk}
            onCloseModal={undefined as never}
            setSelectedDesk={setSelectedDesk}
          />
        </Modal.Window>
      </Modal>

      <Modal>
        <Modal.Open
          opens="desk3"
          additionalFn={(e) => {
            setSelectedDesk({
              e: e,
              deskPath: "desk_bigger",
              equipPath: "pc_setup_single_monitor",
              type: "static",
              scale: 1.6,
              equipment: ["basic pc set", "big desk"],
            });
          }}
        >
          <SectionsToolTip
            title={
              <>
                <h1 className="text-xs text-main2">Desk Equipment:</h1>
                <ul className="mt-1">
                  <li>- Basic PC Set</li>
                  <li>- Big Desk</li>
                </ul>
              </>
            }
          >
            <button className="w-[90px] h-[90px] border border-solid border-slate-200 rounded-lg p-2 hover:bg-bgWhite1 hover:text-main2 transition-colors duration-300 focus:outline-none">
              <div className="flex justify-center items-center h-[50px]">
                <Image
                  src="/creatorImages/desk.jpg"
                  alt=""
                  width={35}
                  height={35}
                />
              </div>
              <div>
                <p className="text-sm">Desk v.3</p>
              </div>
            </button>
          </SectionsToolTip>
        </Modal.Open>
        <Modal.Window name="desk3">
          <ShowSelectedDesk
            selectedDesk={selectedDesk}
            appendDesk={appendDesk}
            onCloseModal={undefined as never}
            setSelectedDesk={setSelectedDesk}
          />
        </Modal.Window>
      </Modal>

      <Modal>
        <Modal.Open
          opens="desk4"
          additionalFn={(e) => {
            setSelectedDesk({
              e: e,
              deskPath: "desk_bigger",
              equipPath: "pc_setup_dual_monitor",
              type: "static",
              scale: 1.6,
              equipment: ["basic pc set", "second monitor", "big desk"],
            });
          }}
        >
          <SectionsToolTip
            title={
              <>
                <h1 className="text-xs text-main2">Desk Equipment:</h1>
                <ul className="mt-1">
                  <li>- Basic PC Set</li>
                  <li>- Second Monitor</li>
                  <li>- Big Desk</li>
                </ul>
              </>
            }
          >
            <button className="w-[90px] h-[90px] border border-solid border-slate-200 rounded-lg p-2 hover:bg-bgWhite1 hover:text-main2 transition-colors duration-300 focus:outline-none">
              <div className="flex justify-center items-center h-[50px]">
                <Image
                  src="/creatorImages/desk.jpg"
                  alt=""
                  width={35}
                  height={35}
                />
              </div>
              <div>
                <p className="text-sm">Desk v.4</p>
              </div>
            </button>
          </SectionsToolTip>
        </Modal.Open>
        <Modal.Window name="desk4">
          <ShowSelectedDesk
            selectedDesk={selectedDesk}
            appendDesk={appendDesk}
            onCloseModal={undefined as never}
            setSelectedDesk={setSelectedDesk}
          />
        </Modal.Window>
      </Modal>

      <Modal>
        <Modal.Open
          opens="desk5"
          additionalFn={(e) => {
            setSelectedDesk({
              e: e,
              deskPath: "desk90",
              equipPath: "pc_setup_dual_monitor",
              type: "static",
              scale: 1.6,
              equipment: ["basic pc set", "second monitor", "desk 90deg"],
            });
          }}
        >
          <SectionsToolTip
            title={
              <>
                <h1 className="text-xs text-main2">Desk Equipment:</h1>
                <ul className="mt-1">
                  <li>- Basic PC Set</li>
                  <li>- Second monitor</li>
                  <li>- Desk 90deg</li>
                </ul>
              </>
            }
          >
            <button className="w-[90px] h-[90px] border border-solid border-slate-200 rounded-lg p-2 hover:bg-bgWhite1 hover:text-main2 transition-colors duration-300 focus:outline-none">
              <div className="flex justify-center items-center h-[50px]">
                <Image
                  src="/creatorImages/desk.jpg"
                  alt=""
                  width={35}
                  height={35}
                />
              </div>
              <div>
                <p className="text-sm">Desk v.5</p>
              </div>
            </button>
          </SectionsToolTip>
        </Modal.Open>
        <Modal.Window name="desk5">
          <ShowSelectedDesk
            selectedDesk={selectedDesk}
            appendDesk={appendDesk}
            onCloseModal={undefined as never}
            setSelectedDesk={setSelectedDesk}
          />
        </Modal.Window>
      </Modal>
    </div>
  );
}
