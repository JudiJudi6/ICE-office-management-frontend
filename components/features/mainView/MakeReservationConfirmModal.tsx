import { deskInterface } from "@/app/view/creator/page";
import { useMakeReservation } from "@/hooks/reservations/useMakeReservation";
import { Desks } from "@/interfaces/OfficeInterface";
import UserInterface from "@/interfaces/UserInterface";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";

interface MakeReservationConfirmModalProps {
  desk: Desks | undefined;
  selectedDay: string;
  officeId: string;
  selectedDateFrom: string;
  selectedDateTo: string;
  onCloseModal: () => void;
}

export default function MakeReservationConfirmModal({
  desk,
  selectedDateFrom,
  selectedDateTo,
  selectedDay,
  onCloseModal,
  officeId,
}: MakeReservationConfirmModalProps) {
  const { makeReservation, isSuccess } = useMakeReservation();
  const queryClient = useQueryClient();
  const user: UserInterface | undefined = queryClient.getQueryData(["user"]);
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
  const today = new Date();
  const day = selectedDay
    ? selectedDay
    : months[today.getMonth()] + " " + today.getDate();

  const timeFrom = selectedDateFrom ? selectedDateFrom : "From: 8:00 AM";
  const timeTo = selectedDateTo ? selectedDateTo : "To: 9:00 AM";

  const timeFromSliced = timeFrom.slice(-8, -6).trim() + timeFrom.slice(-6);
  const timeToSliced = timeTo.slice(-8, -6).trim() + timeFrom.slice(-6);

  const timeFromConverted = convertStringToDate(timeFromSliced, new Date(day));
  const timeToConverted = convertStringToDate(timeToSliced, new Date(day));
  console.log(timeFromConverted, timeToConverted);

  function convertStringToDate(timeString: string, selectedDay: Date) {
    const timeArray = timeString.split(":");
    let hours = parseInt(timeArray[0]);
    let minutes = parseInt(timeArray[1]);
    const ampm = timeArray[2];

    if (ampm === "PM" && hours < 12) {
      hours += 12;
    } else if (ampm === "AM" && hours === 12) {
      hours = 0;
    }

    const date = new Date(selectedDay);
    date.setHours(hours);
    date.setMinutes(minutes);

    return date;
  }

  function handleReservation() {
    if (desk && user)
      makeReservation({
        deskId: desk.deskId,
        officeId: officeId,
        reservation: {
          createdAt: new Date(),
          endTime: timeToConverted,
          reservationId: new Date().getTime() + "-" + desk.deskName,
          startTime: timeFromConverted,
          user: {
            name: user?.data.user.name,
            surname: user?.data.user.surname,
          },
          userId: user.data.user._id,
        },
      });
    onCloseModal();
  }

  return (
    <div className="">
      <p className="mb-5">
        You want to make reservation of desk:{" "}
        <span className="font-medium">{desk?.deskName}</span>
        {/* <p className="my-5"> */}, at{" "}
        <span className="font-medium">{day}</span>, from{" "}
        <span className="font-medium">{timeFromSliced}</span> to{" "}
        <span className="font-medium">{timeToSliced}</span> {/* </p> */}
      </p>
      <div className="flex justify-center items-center gap-3">
        <button
          className="w-[115px] text-sm text-center  py-2 text-red-500 border-2 border-solid border-red-500  tracking-wide rounded-full transition-all duration-300 px-6 hover:text-white hover:bg-red-500"
          onClick={onCloseModal}
        >
          Cancel
        </button>
        <button
          className="w-[115px] text-sm text-center bg-gradient-to-r to-main1 via-main2 from-main1 bg-size-200 bg-pos-0 hover:bg-pos-100 py-[10px] text-white  tracking-wide rounded-full transition-all duration-300 px-6"
          onClick={handleReservation}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
