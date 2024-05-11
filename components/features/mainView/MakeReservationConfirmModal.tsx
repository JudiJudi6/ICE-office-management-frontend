import { deskInterface } from "@/app/view/creator/page";
import { Desks } from "@/interfaces/OfficeInterface";
import React from "react";

interface MakeReservationConfirmModalProps {
  desk: Desks | undefined;
  selectedDay: string;
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
}: MakeReservationConfirmModalProps) {
  return (
    <div>
      You want to make reservation of desk: {desk?.deskName} at {selectedDay},
      from {selectedDateFrom} to {selectedDateTo}{" "}
      <div>
        <button onClick={onCloseModal}>Cancel</button>
        <button>Confirm</button>
      </div>
    </div>
  );
}
