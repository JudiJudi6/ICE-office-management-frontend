import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAddNewOfficeByCode } from "@/hooks/creator/useAddNewOfficeByCode";
interface AddNewOfficeModalProps {
  onCloseModal?: () => void;
}

export default function AddNewOfficeModal({
  onCloseModal,
}: AddNewOfficeModalProps) {
  const { addByCode } = useAddNewOfficeByCode();

  const [inputValue, setInputValue] = useState<string>("");
  const [focus, setFocus] = useState(false);

  useEffect(
    function () {
      if (inputValue) {
        setFocus(true);
      }
    },
    [inputValue, focus]
  );

  function handleAddOffice() {
    addByCode({ invCode: inputValue });
  }

  return (
    <div className="">
      <p className="mb-5">Enter office invitation code to join: </p>
      <div className="relative h-[50px] w-full">
        <motion.label
          htmlFor="code"
          className={`absolute top-1/2 left-3 text-gray cursor-text transition-colors duration-300 ${
            focus ? "text-main1" : ""
          } `}
          animate={
            focus
              ? { translateX: "-15px", translateY: "-170%", scale: 0.8 }
              : { translateX: "0px", translateY: "-50%", scale: 1 }
          }
          initial={{ translateX: "0px", translateY: "-50%", scale: 1 }}
          transition={{ ease: "linear", duration: 0.15 }}
        >
          Your invitation code
        </motion.label>
        <input
          id="code"
          className="border-none focus:outline-none px-3 py-2 w-full"
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
        />
        <div className="absolute h-[1.5px] w-full bg-gradient-to-r from-main1 to-main2"></div>
      </div>
      <div className="flex justify-center items-center gap-3">
        <button
          className="w-[115px] text-sm text-center  py-2 text-red-500 border-2 border-solid border-red-500  tracking-wide rounded-full transition-all duration-300 px-6 hover:text-white hover:bg-red-500"
          onClick={onCloseModal}
        >
          Cancel
        </button>
        <button
          className="w-[115px] text-sm text-center bg-gradient-to-r to-main1 via-main2 from-main1 bg-size-200 bg-pos-0 hover:bg-pos-100 py-[10px] text-white  tracking-wide rounded-full transition-all duration-300 px-6"
          onClick={handleAddOffice}
          disabled={!inputValue}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
