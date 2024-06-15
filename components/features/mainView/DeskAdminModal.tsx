import { useChangeActive } from "@/hooks/reservations/useChangeActive";
import { Desks, ReservationData } from "@/interfaces/OfficeInterface";
import { convertTo12HourFormat } from "@/utils/helpers";
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { CgUnavailable } from "react-icons/cg";
import { FaCheck } from "react-icons/fa";
import { VscError } from "react-icons/vsc";
import Modal from "@/components/ui/Modal";
import { Button, Menu, MenuItem } from "@mui/material";
import ConfirmReservationDelete from "./ConfirmReservationDelete";
interface DeskAdminModalProps {
  desk: Desks | undefined;
  selectedDay: string;
  officeId: string;
  selectedDateFrom: string;
  selectedDateTo: string;
  onCloseModal: () => void;
}

export default function DeskAdminModal({
  desk,
  selectedDateFrom,
  selectedDateTo,
  onCloseModal,
  officeId,
}: DeskAdminModalProps) {
  const [selectedDay, setSelectedDay] = useState("");
  const { changeAvailibility } = useChangeActive();
  const [selectedReservationId, setSelectedReservationId] =
    useState<ReservationData>();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    res: ReservationData
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedReservationId(res);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const today = new Date();
  const options = [];
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

  const formatDateTo12Hour = (date: Date) => {
    let dateDay = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    const formattedDay = dateDay < 10 ? "0" + dateDay : dateDay;
    const formattedMonth = month < 10 ? "0" + month : month;
    const formattedDate = `${formattedDay}.${formattedMonth}.${year}`;

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const strTime = hours + ":" + formattedMinutes + " " + ampm;

    const createdAt = formattedDate + " " + strTime;
    return createdAt;
  };

  return (
    <div className="w-[260px] xs:w-[300px] sm:w-[500px] md:w-[600px]">
      <div className="w-full flex justify-between items-center gap-5 mb-5">
        <div className="flex flex-col justify-center items-start gap-2">
          <p className="text-xl sm:text-2xl">Admin options</p>
          <p className="text-sm">
            Here you can manage desk reservations, check who has made them,
            modify the time or delete reservations.
          </p>
        </div>
        <button
          className="text-2xl p-1 rounded-full hover:bg-bgWhite1Hover transition-colors duration-300 font-extralight"
          onClick={onCloseModal}
        >
          <RxCross1 />
        </button>
      </div>
      <div className=" flex justify-start items-center gap-3 mb-5">
        {" "}
        <button
          className={`flex justify-center items-center rounded-full  text-sm text-center py-2   tracking-wide transition-all duration-300 gap-3 ${
            desk?.active ? "hover:text-green-500" : "hover:text-red-500"
          }`}
          onClick={() => {
            if (desk?.active) {
              changeAvailibility({
                deskId: desk.deskId,
                officeId: officeId,
                active: false,
              });
            } else {
              changeAvailibility({
                deskId: desk?.deskId,
                officeId: officeId,
                active: true,
              });
            }
          }}
        >
          <p className="text-sm">Change availability</p>
          {desk?.active ? (
            <span className="text-green-500 text-base">
              <FaCheck />
            </span>
          ) : (
            <span className="text-red-500 text-base">
              <VscError />
            </span>
          )}
        </button>
      </div>
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
      <div className="flex justify-center items-center flex-col gap-2 overflow-y-auto h-52 my-2 ">
        <div className=" flex flex-col gap-2 h-full w-full">
          <Modal>
            {desk?.reservationData.filter((item) => {
              const reservationDate = new Date(item.startTime);
              const dayOfMonth = reservationDate.getDate();
              return selectedDay
                ? dayOfMonth === parseInt(selectedDay.split(" ")[1])
                : dayOfMonth === new Date().getDate();
            }).length === 0 ? (
              <div className="bg-bgWhite1 rounded-lg w-full p-2 py-4">
                <p className="text-sm">No reservations on this day</p>
              </div>
            ) : (
              desk?.reservationData
                .filter((item) => {
                  const reservationDate = new Date(item.startTime);
                  const dayOfMonth = reservationDate.getDate();
                  return selectedDay
                    ? dayOfMonth === parseInt(selectedDay.split(" ")[1])
                    : dayOfMonth === new Date().getDate();
                })
                .map((item) => (
                  <div
                    className="w-full"
                    key={new Date(item?.createdAt).getTime()}
                  >
                    <Button
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={(e) => handleClick(e, item)}
                      disableRipple
                      sx={{
                        background: "none",
                        "&:hover": {
                          background: "none",
                        },
                        padding: 0,
                        minWidth: 0,
                        border: "none",
                        textTransform: "none",
                        fontFamily: "inherit",
                        fontSize: "inherit",
                        color: "inherit",
                        width: "100%",
                      }}
                    >
                      <div className="bg-bgWhite1 rounded-lg w-full p-4 font-normal">
                        <div className="flex justify-between items-center mb-6">
                          <p className="text-sm">
                            From:{" "}
                            <span className="font-semibold">
                              {convertTo12HourFormat(
                                new Date(item?.startTime).getHours()
                              )}{" "}
                            </span>
                          </p>
                          <p className="text-sm">
                            To:{" "}
                            <span className="font-semibold">
                              {convertTo12HourFormat(
                                new Date(item?.endTime).getHours()
                              )}
                            </span>
                          </p>
                        </div>
                        <p className="text-sm text-left">
                          Created at:{" "}
                          {formatDateTo12Hour(new Date(item?.createdAt))} by{" "}
                          <span className="font-semibold">
                            {item.user.name} {item.user.surname}
                          </span>
                        </p>
                      </div>{" "}
                    </Button>
                  </div>
                ))
            )}
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
                sx: {
                  backgroundColor: "#fefefe",
                  zIndex: 0,
                  boxShadow: "0px 20px 4px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <Modal.Open opens="edit" additionalFn={handleClose}>
                <MenuItem
                  onClick={() => {
                    handleClose();
                  }}
                  sx={{
                    backgroundColor: "#fefefe",
                    color: "#0a0b0d",
                    fontWeight: 500,
                    fontSize: 14,
                    letterSpacing: "0.025em",
                    transition: "color 0.3s",
                    "&:hover": {
                      color: "#fc4508",
                      background: "none",
                    },
                  }}
                >
                  Edit
                </MenuItem>
              </Modal.Open>
              <Modal.Open opens="delete" additionalFn={handleClose}>
                <MenuItem
                  sx={{
                    backgroundColor: "#fefefe",
                    color: "red",
                    fontWeight: 500,
                    fontSize: 14,
                    letterSpacing: "0.025em",
                    transition: "color 0.3s",
                    "&:hover": {
                      color: "#fb8c23",
                      background: "none",
                    },
                  }}
                >
                  Delete
                </MenuItem>
              </Modal.Open>
            </Menu>
            <Modal.Window name="delete">
              <ConfirmReservationDelete
                onCloseModal={undefined as never}
                reservation={selectedReservationId}
                officeId={officeId}
                desk={desk}
              />
            </Modal.Window>
            <Modal.Window name="edit">
              <div>edit</div>
            </Modal.Window>
          </Modal>
        </div>
      </div>
    </div>
  );
}
