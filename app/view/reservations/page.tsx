"use client";

import Spinner from "@/components/ui/Spinner";
import { OfficesContext } from "@/context/OfficesContext";
import { useGetUserReservations } from "@/hooks/reservations/useGetUserreservations";
import OfficeDataInterface, {
  ReservationData,
} from "@/interfaces/OfficeInterface";
import { convertTo12HourFormat, formatDateTo12Hour } from "@/utils/helpers";
import React, { useContext, useEffect, useState } from "react";
import { PiClockCountdownLight } from "react-icons/pi";
interface Reservations {
  reservations: ReservationData[];
}

export default function Reservations() {
  const officeData = useContext(OfficesContext);
  const [selectedOffice, setSelectedOffice] = useState(
    officeData?.data.offices[0].id
  );
  const isAuth = localStorage.getItem("sessionToken") !== null;
  const { data, getReservations, isSuccess } = useGetUserReservations();
  const reservations: Reservations = data;
  useEffect(() => {
    getReservations({ officeId: selectedOffice });
  }, [getReservations, selectedOffice]);
  const today = new Date();
  const daysArray = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    return date;
  });
  const filteredReservations = isSuccess
    ? reservations.reservations.filter((item) => {
        const reservationDate = new Date(item.startTime);
        return (
          reservationDate >= daysArray[0] && reservationDate < daysArray[6]
        );
      })
    : [];

  const reservationsByDate: { [key: string]: ReservationData[] } = {};
  if (isSuccess) {
    reservations.reservations.forEach((item) => {
      const reservationDate = new Date(item.startTime);
      const dateKey = reservationDate.toLocaleDateString("en-GB");
      if (!reservationsByDate[dateKey]) {
        reservationsByDate[dateKey] = [];
      }
      reservationsByDate[dateKey].push(item);
    });

    Object.keys(reservationsByDate).forEach((dateKey) => {
      reservationsByDate[dateKey].sort((a, b) => {
        const startTimeA = new Date(a.startTime).getTime();
        const startTimeB = new Date(b.startTime).getTime();
        return startTimeA - startTimeB;
      });
    });
  }

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

  if (!isAuth) {
    return null;
  }

  return (
    <div className="text-black pt-16 h-screen relative overflow-x-hidden">
      <div className=" z-10  gap-2 bg-white w-full lg:max-w-[calc(100%-250px)] flex flex-col p-4 md500:p-6 lg:flex-row lg:justify-between lg:items-center">
        <div className="flex justify-center items-center gap-5 flex-col md500:flex-row mb-5 md500:mb-0 max-w-[500px]">
          <select
            className=" h-12 bg-transparent border border-gray text-bgDark1 rounded-lg focus:ring-main2 focus:border-main2 block w-full p-2.5 transition-colors duration-300 outline-none cursor-pointer"
            value={selectedOffice}
            onChange={(e) => {
              setSelectedOffice(e.target.value);
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
        </div>
      </div>
      <div className="grid grid-cols-7 pb-10">
        {daysArray.map((day, index) => {
          const dateKey = day.toLocaleDateString("en-GB");
          const dayReservations = reservationsByDate[dateKey] || [];

          return (
            <div
              key={index}
              className=" flex flex-col items-center max-w-[139px]"
            >
              <div className="h-10 flex justify-center items-center">
                {day.getDate()}.
                {day.getMonth() + 1 < 10
                  ? `0${day.getMonth() + 1}`
                  : day.getMonth() + 1}
              </div>
              {dayReservations.length === 0 ? (
                <div className="col-start-1 col-end-[-1] flex justify-center items-start w-full h-full">
                  <p className="text-center text-xl mt-5">
                    <PiClockCountdownLight />
                  </p>
                </div>
              ) : (
                dayReservations.map((item: ReservationData) => (
                  <div
                    className="flex justify-center items-center p-1 w-full"
                    key={new Date(item.createdAt).getTime()}
                  >
                    <div className="bg-bgWhite1 rounded-lg w-full p-2">
                      <div className="flex justify-between flex-col gap-1 items-start p-1 mb-4">
                        <p className="text-xs">
                          From:{" "}
                          <span className="font-semibold">
                            {convertTo12HourFormat(
                              new Date(item.startTime).getHours()
                            )}{" "}
                          </span>
                        </p>
                        <p className="text-xs">
                          To:{" "}
                          <span className="font-semibold">
                            {convertTo12HourFormat(
                              new Date(item.endTime).getHours()
                            )}
                          </span>
                        </p>
                      </div>
                      <p className="text-[10px] p-1">
                        Created at:{" "}
                        {formatDateTo12Hour(new Date(item.createdAt))}{" "}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
