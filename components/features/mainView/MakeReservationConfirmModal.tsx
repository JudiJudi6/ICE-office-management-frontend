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

  const timeFromConverted = convertStringToDate(timeFromSliced);
  const timeToConverted = convertStringToDate(timeToSliced);

  function convertStringToDate(timeString: string) {
    const [time, ampm] = timeString.split(" ");

    const [hours, minutes] = time.split(":");

    let hours24 = parseInt(hours, 10);
    if (ampm === "PM" && hours24 < 12) {
      hours24 += 12;
    } else if (ampm === "AM" && hours24 === 12) {
      hours24 = 0;
    }

    const date = new Date();
    date.setHours(hours24);
    date.setMinutes(parseInt(minutes, 10));
    date.setSeconds(0);
    date.setMilliseconds(0);

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
    <div>
      You want to make reservation of desk: {desk?.deskName} at {day}, from{" "}
      {timeFromSliced} to {timeToSliced}{" "}
      <div>
        <button onClick={onCloseModal}>Cancel</button>
        <button onClick={handleReservation}>Confirm</button>
      </div>
    </div>
  );
}
