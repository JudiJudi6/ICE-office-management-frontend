"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface InputProps {
  label: string;
  setValue: Dispatch<SetStateAction<string | number>>;
  type: "text" | "email" | "number" | "password";
  id: string;
}

export default function Input({ setValue, type, id, label }: InputProps) {
  const [inputValue, setInputValue] = useState<string | number>("");
  const [focus, setFocus] = useState(false);

  function changeValue(val: string | number) {
    setInputValue(val);
    setValue(val);
  }

  useEffect(
    function () {
      if (inputValue) {
        setFocus(true);
      }
    },
    [inputValue, focus]
  );

  return (
    <div className="relative">
      <motion.label
        htmlFor={id}
        className="absolute top-1/2 left-3 text-gray cursor-text"
        animate={
          focus
            ? { translateX: "-15px", translateY: "-140%", scale: 0.8 }
            : { translateX: "0px", translateY: "-50%", scale: 1 }
        }
        initial={{ translateX: "0px", translateY: "-50%", scale: 1 }}
        transition={{ ease: "linear", duration: 0.15 }}
      >
        {label}
      </motion.label>
      <motion.input
        id={id}
        className="border-none focus:outline-none px-3 py-2 w-full"
        type={type}
        value={inputValue}
        onChange={(e) => changeValue(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      <div className="absolute h-[1.5px] w-full bg-gradient-to-r from-main1 to-main2"></div>
    </div>
  );
}
