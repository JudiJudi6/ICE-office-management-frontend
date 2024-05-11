import { useGetDeskReservation } from "@/hooks/reservations/useGetDeskReservation";
import OfficeDataInterface from "@/interfaces/OfficeInterface";
import { motion } from "framer-motion";
import React, { Dispatch, SetStateAction, useMemo } from "react";
import { RxCross1 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import { VscError } from "react-icons/vsc";
import Modal from "@/components/ui/Modal";
import MakeReservationConfirmModal from "./MakeReservationConfirmModal";

interface SelectedDeskModalProps {
  deskId: string;
  setDeskId: Dispatch<SetStateAction<string>>;
  officeId: string | undefined;
  selectedOfficeBuild: OfficeDataInterface | undefined;
  setSelectedDay: Dispatch<SetStateAction<string>>;
  selectedDay: string;
  setSelectedDateFrom: Dispatch<SetStateAction<string>>;
  selectedDateFrom: string;
  setSelectedDateTo: Dispatch<SetStateAction<string>>;
  selectedDateTo: string;
}

export default function SelectedDeskModal({
  deskId,
  setDeskId,
  officeId,
  selectedOfficeBuild,
  selectedDateFrom,
  selectedDateTo,
  selectedDay,
  setSelectedDateFrom,
  setSelectedDateTo,
  setSelectedDay,
}: SelectedDeskModalProps) {
  const { data, isLoading } = useGetDeskReservation(deskId, officeId);
  const deskArr = useMemo(
    () =>
      selectedOfficeBuild?.deskList.filter((item) => item.deskId === deskId),
    [deskId, selectedOfficeBuild?.deskList]
  );

  const desk = deskArr && deskArr[0];

  console.log(data);
  console.log(desk?.deskName);

  const today = new Date();
  const options = [];
  const from = [];
  const to = [];

  // Tablica z nazwami miesięcy
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
    for (let minute of ["00", "30"]) {
      const formattedHour = hour > 12 ? hour - 12 : hour;
      const ampm = hour < 12 ? "AM" : "PM";
      const formattedTime = `From: ${formattedHour}:${minute} ${ampm}`;

      from.push(
        <option key={formattedTime} value={formattedTime}>
          {formattedTime}
        </option>
      );
    }
  }

  for (let hour = 9; hour < 22; hour++) {
    for (let minute of ["00", "30"]) {
      const formattedHour = hour > 12 ? hour - 12 : hour;
      const ampm = hour < 12 ? "AM" : "PM";
      const formattedTime = `To: ${formattedHour}:${minute} ${ampm}`;

      to.push(
        <option key={formattedTime} value={formattedTime}>
          {formattedTime}
        </option>
      );
    }
  }

  return (
    <motion.div
      animate={deskId ? { translateX: "0%" } : { translateX: "100%" }}
      initial={{ translateX: "100%" }}
      transition={{ ease: "easeInOut" }}
      className="absolute right-0 top-0 z-[9] -translate-x-full h-full w-[280px] bg-white border-l border-l-slate-200 border-solid p-6 pt-[88px] flex flex-col"
    >
      <div className="flex w-full justify-between items-center">
        <p className="text-xl">Desk name: {desk?.deskName}</p>
        <button
          className="text-2xl p-1 rounded-full hover:bg-bgWhite1Hover transition-colors duration-300 font-extralight"
          onClick={() => setDeskId("")}
        >
          <RxCross1 />
        </button>
      </div>
      <p className="text-gray">{selectedOfficeBuild?.name}</p>
      {desk?.active ? (
        <p className="flex gap-2 self-start my-3 justify-center items-center text-green-500 text-left">
          <span>
            <FaCheck />
          </span>
          Desk available
        </p>
      ) : (
        <p className="flex gap-2 self-start my-3 justify-center items-center text-red-500 text-left">
          <span>
            <VscError />
          </span>
          Desk disabled
        </p>
      )}
      <div>
        <div className="flex flex-col justify-between items-start">
          <p>Select Day: </p>
          <select
            className="bg-transparent border border-gray text-bgDark1 rounded-lg focus:ring-main2 focus:border-main2 block w-full p-2.5 transition-colors duration-300 outline-none cursor-pointer my-2"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            {options}
          </select>
        </div>
        <p>Desk reservations {selectedDay ? "at " + selectedDay : "today"}:</p>
        {desk?.reservationData.length !== 0 ? (
          <div className="flex justify-center items-center gap-2">
            {desk?.reservationData.map((item) => (
              <p key={item.createdAt.getTime()}>
                {item.startTime.getTime()} {item.endTime.getTime()}
              </p>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center w-full py-4 bg-bgWhite1 rounded-lg my-2">
            <p>There is no reservations</p>
          </div>
        )}
      </div>
      <div>
        <p>Select time:</p>
        <div className="w-full flex flex-col justify-center items-center gap-2 my-2">
          <select
            className="bg-transparent border border-gray text-bgDark1 rounded-lg focus:ring-main2 focus:border-main2 block w-full p-2.5 transition-colors duration-300 outline-none cursor-pointer"
            value={selectedDateFrom}
            onChange={(e) => setSelectedDateFrom(e.target.value)}
          >
            {from}
          </select>
          <select
            className="bg-transparent border border-gray text-bgDark1 rounded-lg focus:ring-main2 focus:border-main2 block w-full p-2.5 transition-colors duration-300 outline-none cursor-pointer"
            value={selectedDateTo}
            onChange={(e) => setSelectedDateTo(e.target.value)}
          >
            {to}
          </select>
        </div>
      </div>
      <Modal>
        <Modal.Open opens="confirm">
          <button className="w-full text-sm text-center bg-gradient-to-r to-main1 via-main2 from-main1 bg-size-200 bg-pos-0 hover:bg-pos-100 py-3 text-white  tracking-wide rounded-full transition-all duration-300 px-6 my-2">
            Make reservation
          </button>
        </Modal.Open>
        <Modal.Window name="confirm">
          <MakeReservationConfirmModal
            desk={desk}
            selectedDateFrom={selectedDateFrom}
            selectedDateTo={selectedDateTo}
            selectedDay={selectedDay}
            onCloseModal={undefined as never}
          />
        </Modal.Window>
      </Modal>
      <button className="w-full text-sm text-center hover:bg-gradient-to-r  bg-size-200 bg-pos-0 hover:bg-pos-100 py-3 text-main1 hover:text-main2  tracking-wide  rounded-full transition-all duration-300 px-6">
        Admin options
      </button>
    </motion.div>
  );
}
