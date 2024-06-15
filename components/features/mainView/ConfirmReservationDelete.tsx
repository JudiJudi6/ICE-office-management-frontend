import { deskInterface } from "@/app/view/creator/page";
import { useDeleteReservation } from "@/hooks/reservations/useDeleteReservation";
import { Desks, ReservationData } from "@/interfaces/OfficeInterface";
import React from "react";

interface ConfirmReservationDeleteProps {
  desk: Desks | undefined;
  onCloseModal: () => void;
  reservation: ReservationData | undefined;
  officeId: string | undefined;
}

export default function ConfirmReservationDelete({
  onCloseModal,
  desk,
  officeId,
  reservation,
}: ConfirmReservationDeleteProps) {
  const { deleteReservation } = useDeleteReservation();
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
  //   const day = selectedDay
  //     ? selectedDay
  //     : `${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;

  //   const timeFrom = selectedDateFrom ? selectedDateFrom : "From: 8:00 AM";
  //   const timeTo = selectedDateTo ? selectedDateTo : "To: 9:00 AM";

  //   const timeFromSliced = timeFrom.slice(-8, -6).trim() + timeFrom.slice(-6);
  //   const timeToSliced = timeTo.slice(-8, -6).trim() + timeTo.slice(-6);

  //   const timeFromConverted = convertStringToDate(timeFromSliced, new Date(day));
  //   const timeToConverted = convertStringToDate(timeToSliced, new Date(day));
  //   console.log(timeFromConverted, timeToConverted);

  function convertDayToString(timeDay: string | undefined) {
    if (!timeDay) return;
    const date = new Date(timeDay);
    // const timeArray = timeString.split(":");
    // let hours = parseInt(timeArray[0]);
    // let helper = timeArray[1].split(" ");
    // let minutes = parseInt(helper[0]);
    // const ampm = helper[1];

    // if (ampm === "PM" && hours < 12) {
    //   hours += 12;
    // } else if (ampm === "AM" && hours === 12) {
    //   hours = 0;
    // }

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return `${day} ${months[month]} ${year}`;
  }

  function formatHoursTo12(date: Date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  }

  return (
    <div className="">
      <p className="mb-5">
        You want to delete reservation of desk:{" "}
        <span className="font-medium">{desk?.deskName}</span>
        {/* <p className="my-5"> */}, at{" "}
        <span className="font-medium">
          {convertDayToString(reservation?.startTime)}
        </span>
        , from{" "}
        <span className="font-medium">
          {formatHoursTo12(new Date(reservation?.startTime ?? ""))}
        </span>{" "}
        to{" "}
        <span className="font-medium">
          {formatHoursTo12(new Date(reservation?.endTime ?? ""))}
        </span>
        , that is made by{" "}
        <span className="font-medium">{reservation?.user.name}</span>{" "}
        <span className="font-medium">{reservation?.user.surname}</span>
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
          onClick={() => {
            deleteReservation({
              deskId: desk?.deskId,
              officeId,
              reservationId: reservation?.reservationId,
            });
            onCloseModal();
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
