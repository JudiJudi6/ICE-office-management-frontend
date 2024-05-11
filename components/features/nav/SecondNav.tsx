import { OfficesContext } from "@/context/OfficesContext";
import OfficeDataInterface from "@/interfaces/OfficeInterface";
import { useReducedMotion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";

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
    <div className="flex">
      <select
        className="bg-transparent border border-gray text-bgDark1 rounded-lg focus:ring-main2 focus:border-main2 block w-full p-2.5 transition-colors duration-300 outline-none cursor-pointer"
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
        <select
          className="bg-transparent border border-gray text-bgDark1 rounded-lg focus:ring-main2 focus:border-main2 block w-full p-2.5 transition-colors duration-300 outline-none cursor-pointer"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          {options}
        </select>
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
  );
}
