import { deskInterface } from "@/app/view/creator/page";
import Modal from "@/components/ui/Modal";
import { useDeleteReservation } from "@/hooks/reservations/useDeleteReservation";
import { Desks, ReservationData } from "@/interfaces/OfficeInterface";
import { convertTo12HourFormat, formatDateTo12Hour } from "@/utils/helpers";
import React, { useState } from "react";
import ConfirmReservationDelete from "./ConfirmReservationDelete";
import { RxCross1 } from "react-icons/rx";
import { useModifyReservation } from "@/hooks/reservations/useModifyReservation";

interface EditReservationModalProps {
  desk: Desks | undefined;
  onCloseModal: () => void;
  reservation: ReservationData | undefined;
  officeId: string | undefined;
}

export default function EditReservationModal({
  onCloseModal,
  desk,
  officeId,
  reservation,
}: EditReservationModalProps) {
  const { modifyReservation } = useModifyReservation();
  const [selectedDateFrom, setSelectedDateFrom] = useState(
    `From: ${convertTo12HourFormat(
      new Date(reservation?.startTime ?? "").getHours()
    )}`
  );
  const [selectedDateTo, setSelectedDateTo] = useState(
    `To: ${convertTo12HourFormat(
      new Date(reservation?.endTime ?? "").getHours()
    )}`
  );

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

  const timeFromSliced =
    selectedDateFrom.slice(-8, -6).trim() + selectedDateFrom.slice(-6);
  const timeToSliced =
    selectedDateTo.slice(-8, -6).trim() + selectedDateTo.slice(-6);

  const timeFromConverted = convertStringToDate(
    timeFromSliced,
    new Date(reservation?.startTime ?? "")
  );
  const timeToConverted = convertStringToDate(
    timeToSliced,
    new Date(reservation?.startTime ?? "")
  );
  console.log(timeFromConverted, timeToConverted);

  function convertStringToDate(timeString: string, selectedDay: Date) {
    const timeArray = timeString.split(":");
    let hours = parseInt(timeArray[0]);
    let helper = timeArray[1].split(" ");
    let minutes = parseInt(helper[0]);
    const ampm = helper[1];

    if (ampm === "PM" && hours < 12) {
      hours += 12;
    } else if (ampm === "AM" && hours === 12) {
      hours = 0;
    }

    const year = today.getFullYear();
    const month = selectedDay.getMonth();
    const day = selectedDay.getDate();

    const date = new Date(year, month, day, hours, minutes);

    return date;
  }

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

  const formatDateTo12Hour = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const strTime = hours + ":" + formattedMinutes + " " + ampm;
    return strTime;
  };

  return (
    <div className="">
      <Modal>
        <div className="w-full flex justify-between items-center gap-5 mb-5">
          <p className=" text-lg">
            You want to edit reservation of desk:{" "}
            <span className="font-medium">{desk?.deskName}</span>
          </p>
          <button
            className="text-2xl p-1 rounded-full hover:bg-bgWhite1Hover transition-colors duration-300 font-extralight"
            onClick={onCloseModal}
          >
            <RxCross1 />
          </button>
        </div>
        <div className="bg-bgWhite1 rounded-lg w-full p-4 font-normal mt-8">
          <div className="flex justify-between items-center mb-6">
            <p className="text-base">
              From:{" "}
              <span className="font-semibold">
                {convertTo12HourFormat(
                  new Date(reservation?.startTime ?? "").getHours()
                )}{" "}
              </span>
            </p>
            <p className="text-base">
              To:{" "}
              <span className="font-semibold">
                {convertTo12HourFormat(
                  new Date(reservation?.endTime ?? "").getHours()
                )}
              </span>
            </p>
          </div>
          <p className="text-sm text-left">
            Created at: {new Date(reservation?.createdAt ?? "").getDate()}{" "}
            {months[new Date(reservation?.createdAt ?? "").getMonth()]}{" "}
            {new Date(reservation?.createdAt ?? "").getFullYear()}{" "}
            {formatDateTo12Hour(new Date(reservation?.createdAt ?? ""))}, by{" "}
            <span className="font-semibold">
              {reservation?.user.name} {reservation?.user.surname}
            </span>
          </p>
        </div>{" "}
        <div className="text-base mt-5 mb-8">
          <p>Change reservation hours to:</p>
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
          {(selectedDateFrom !==
            `From: ${convertTo12HourFormat(
              new Date(reservation?.startTime ?? "").getHours()
            )}` ||
            selectedDateTo !==
              `To: ${convertTo12HourFormat(
                new Date(reservation?.endTime ?? "").getHours()
              )}`) && (
            <p className="text-main2 text-xs">
              Click Save button to keep changes
            </p>
          )}
        </div>
        <div className="flex justify-center items-center gap-3">
          <Modal.Open opens="delete">
            <button className="w-[115px] text-sm text-center  py-2 text-red-500 border-2 border-solid border-red-500  tracking-wide rounded-full transition-all duration-300 px-6 hover:text-white hover:bg-red-500">
              Delete
            </button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmReservationDelete
              onCloseModal={undefined as never}
              onCloseModalSec={onCloseModal}
              reservation={reservation}
              officeId={officeId}
              desk={desk}
            />
          </Modal.Window>
          <button
            className="w-[115px] text-sm text-center bg-gradient-to-r to-main1 via-main2 from-main1 bg-size-200 bg-pos-0 hover:bg-pos-100 py-[10px] text-white  tracking-wide rounded-full transition-all duration-300 px-6"
            onClick={() => {
              modifyReservation({
                deskId: desk?.deskId,
                officeId: officeId,
                reservationId: reservation?.reservationId,
                endTime: timeToConverted.toString(),
                startTime: timeFromConverted.toString(),
              });
              onCloseModal();
            }}
          >
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
}
