import {
  deskInterface,
  elementInterface,
  floorInterface,
} from "@/app/view/creator/page";
import React, { useState } from "react";

interface SaveOfficeProps {
  onCloseModal: () => void;
  officeBuild: {
    elements: elementInterface[];
    floor: floorInterface[];
    walls: floorInterface[];
    desks: deskInterface[];
  };
}

export default function SaveOffice({
  onCloseModal,
  officeBuild,
}: SaveOfficeProps) {
  const [officeAddress, setOfficeAddress] = useState("");
  const [officeName, setOfficeName] = useState("");

  function generateInvitationCode() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  async function sendOffice() {
    async function pushOffice() {
      const response = await fetch("http://localhost:3000/api/v1/office/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...officeData,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const bodyText = await response.text();
        throw new Error(`${bodyText}`);
      }
    }

    const officeId = `${new Date().getTime().toString()}-${officeName}`;
    let desks = officeBuild.desks.map((item) => {
      return {
        deskId: item.id,
        deskname: item.deskName,
        equipment: item.equipment,
        reservationData: [],
        active: true,
      };
    });
    const officeData = {
      id: officeId,
      name: officeName,
      address: officeAddress,
      renderData: officeBuild,
      deskList: desks,
      authorId: "cza tu uzupełnic",
      users: [{ name: "tutaj", surname: "tez" }],
      invitationCode: generateInvitationCode(),
    };
    try {
      const response = await pushOffice();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    console.log(officeData);
  }

  return (
    <div>
      <h3 className="text-2xl font-medium mb-5">Office properties</h3>
      <div className="flex justify-center">
        <div className="w-72">
          <p className="mb-3">Elements list:</p>
          <ul className="flex flex-col gap-2">
            <li>
              <span className="font-medium">
                - desks: {officeBuild.desks.length}
              </span>
            </li>
            <li>- decoration elements: {officeBuild.elements.length}</li>
            <li>- floor elements: {officeBuild.floor.length}</li>
            <li>- wall elements: {officeBuild.walls.length}</li>
          </ul>
        </div>
        <div className="w-80 flex flex-col justify-between items-center ">
          <div className="w-[270px]">
            <p className="mb-3">Office data:</p>
            <div className="flex flex-col gap-5">
              <div className="relative h-[50px] w-full">
                <input
                  id="name"
                  placeholder="Office name"
                  className="border-none focus:outline-none px-3 py-2 w-full"
                  type="text"
                  onChange={(e) => setOfficeName(e.target.value)}
                  value={officeName}
                  autoComplete="off"
                />
                <div className="absolute h-[1.5px] w-full bg-gradient-to-r from-main1 to-main2"></div>
                {!officeName && (
                  <p className="text-[10px] mt-1 text-main2">
                    Please enter office name
                  </p>
                )}
              </div>
              <div className="relative h-[50px] w-full">
                <input
                  id="name"
                  placeholder="Office address"
                  className="border-none focus:outline-none px-3 py-2 w-full"
                  type="text"
                  onChange={(e) => setOfficeAddress(e.target.value)}
                  value={officeAddress}
                  autoComplete="off"
                />
                <div className="absolute h-[1.5px] w-full bg-gradient-to-r from-main1 to-main2"></div>
                {!officeAddress && (
                  <p className="text-[10px] mt-1 text-main2">
                    Please enter office address
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-end items-center p-3 mt-10 flex-col md500:flex-row">
            <button
              onClick={onCloseModal}
              className="w-[115px] text-sm text-center  py-2 text-red-500 border-2 border-solid border-red-500  tracking-wide rounded-full transition-all duration-300 px-6 hover:text-white hover:bg-red-500"
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                sendOffice();
                onCloseModal();
              }}
              disabled={!officeAddress || !officeName}
              className="w-[115px] text-sm text-center bg-gradient-to-r to-main1 via-main2 from-main1 bg-size-200 bg-pos-0 hover:bg-pos-100 py-[10px] text-white  tracking-wide rounded-full transition-all duration-300 px-6"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
