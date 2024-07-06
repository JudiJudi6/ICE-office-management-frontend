import { useDeleteReservation } from "@/hooks/reservations/useDeleteReservation";
import { Desks, ReservationData } from "@/interfaces/OfficeInterface";
import React from "react";

interface ConfirmReservationDeleteProps {
  desk: Desks | undefined;
  onCloseModal: () => void;
  reservation: ReservationData | undefined;
  officeId: string | undefined;
  onCloseModalSec?: () => void;
  me?: boolean;
}

export default function ConfirmReservationDelete({
  onCloseModal,
  desk,
  officeId,
  reservation,
  onCloseModalSec,
  me,
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

  function convertDayToString(timeDay: string | undefined) {
    if (!timeDay) return;
    const date = new Date(timeDay);
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
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  }

  return (
    <div className="">
      <p className="mb-5">
        You want to delete reservation of desk:{" "}
        <span className="font-medium">{desk?.deskName}</span>, at{" "}
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
        {!me && (
          <span>
            , that is made by{" "}
            <span className="font-medium">{reservation?.user.name}</span>{" "}
            <span className="font-medium">{reservation?.user.surname}</span>
          </span>
        )}
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
            if (onCloseModalSec) onCloseModalSec();
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
