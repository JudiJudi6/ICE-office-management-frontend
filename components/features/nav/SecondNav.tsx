import Modal from "@/components/ui/Modal";
import { OfficesContext } from "@/context/OfficesContext";
import OfficeDataInterface from "@/interfaces/OfficeInterface";
import { useReducedMotion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import AddNewOfficeModal from "../mainView/AddNewOfficeModal";
import { PiCheckSquareOffsetBold } from "react-icons/pi";
import { cameraInterface } from "@/app/view/page";
import { PerspectiveCamera } from "three";
import { Camera } from "@react-three/fiber";

interface SecondNavProps {
  setSelectedOffice: Dispatch<SetStateAction<string>>;
  selectedOffice: string;
  setSelectedDay: Dispatch<SetStateAction<string>>;
  selectedDay: string;
  setSelectedDateFrom: Dispatch<SetStateAction<string>>;
  selectedDateFrom: string;
  setSelectedDateTo: Dispatch<SetStateAction<string>>;
  selectedDateTo: string;
  setDeskId: Dispatch<SetStateAction<string>>;
}

export default function SecondNav({
  setSelectedOffice,
  selectedOffice,
  selectedDateFrom,
  selectedDateTo,
  selectedDay,
  setSelectedDateFrom,
  setSelectedDateTo,
  setSelectedDay,
  setDeskId,
}: SecondNavProps) {
  const officeData = useContext(OfficesContext);
  const searchParams = useSearchParams();

  const today = new Date();
  const options = [];
  const from = [];
  const to = [];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const monthName = months[date.getMonth()];
    const day = date.getDate();

    const formattedDate = `${monthName} ${day}`;

    options.push(
      <option key={formattedDate} value={formattedDate}>
        {formattedDate}
      </option>
    );
  }

  for (let hour = 8; hour <= 21; hour++) {
    const formattedHour = hour > 12 ? hour - 12 : hour;
    const ampm = hour < 12 ? "AM" : "PM";
    const formattedTime = `From: ${formattedHour}:00 ${ampm}`;

    from.push(
      <option key={formattedTime} value={formattedTime}>
        {formattedTime}
      </option>
    );
  }

  for (let hour = 9; hour <= 22; hour++) {
    const formattedHour = hour > 12 ? hour - 12 : hour;
    const ampm = hour < 12 ? "AM" : "PM";
    const formattedTime = `To: ${formattedHour}:00 ${ampm}`;

    to.push(
      <option key={formattedTime} value={formattedTime}>
        {formattedTime}
      </option>
    );
  }

  useEffect(
    function () {
      const office = searchParams.get("o");
      if (office) {
        setSelectedOffice(office);
      }
    },
    [searchParams, setSelectedOffice]
  );

  return (
    <div className="fixed z-10  gap-2 bg-white w-full lg:max-w-[calc(100%-250px)] flex flex-col p-4 md500:p-6 lg:flex-row lg:justify-between lg:items-center">
      <div className="flex justify-center items-center gap-5 flex-col md500:flex-row mb-5 md500:mb-0 max-w-[500px]">
        <select
          className=" h-12 bg-transparent border border-gray text-bgDark1 rounded-lg focus:ring-main2 focus:border-main2 block w-full p-2.5 transition-colors duration-300 outline-none cursor-pointer"
          value={selectedOffice}
          onChange={(e) => {
            setSelectedOffice(e.target.value);
            setDeskId("");
          }}
        >
          {officeData?.data?.offices.length === 0 && (
            <option value="">Create some office</option>
          )}
          {officeData?.data?.offices.map((office) => (
            <option key={office.id} value={office.id}>
              {office.name}
            </option>
          ))}
        </select>
        <div>
          <Modal>
            <Modal.Open opens="addNew">
              <button className="w-[180px] flex justify-center items-center gap-3 text-sm text-center hover:bg-gradient-to-r  bg-size-200 bg-pos-0 hover:bg-pos-100 py-3 text-main1 hover:text-main2  tracking-wide  rounded-full transition-all duration-300 px-6">
                <span className="text-lg">
                  <PiCheckSquareOffsetBold />
                </span>{" "}
                Add new office
              </button>
            </Modal.Open>
            <Modal.Window name="addNew">
              <AddNewOfficeModal />
            </Modal.Window>
          </Modal>
        </div>
      </div>
      <div className="grid gap-2 grid-cols-2 md500:grid-cols-3 ">
        <select
          className="h-12 bg-transparent border border-gray text-bgDark1 rounded-lg focus:ring-main2 focus:border-main2 block p-2.5 transition-colors duration-300 outline-none cursor-pointer col-start-1 col-end-3 md500:col-end-2 "
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          {options}
        </select>
        <select
          className="h-12 bg-transparent border border-gray text-bgDark1 rounded-lg focus:ring-main2 focus:border-main2 block  p-2.5 transition-colors duration-300 outline-none cursor-pointer flex-grow-1"
          value={selectedDateFrom}
          onChange={(e) => setSelectedDateFrom(e.target.value)}
        >
          {from}
        </select>
        <select
          className="h-12 bg-transparent border border-gray text-bgDark1 rounded-lg focus:ring-main2 focus:border-main2 block  p-2.5 transition-colors duration-300 outline-none cursor-pointer flex-grow-1"
          value={selectedDateTo}
          onChange={(e) => setSelectedDateTo(e.target.value)}
        >
          {to}
        </select>
      </div>
    </div>
  );
}
