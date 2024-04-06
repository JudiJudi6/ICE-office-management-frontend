"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import BurgerBtn from "./BurgerBtn";
import { createPortal } from "react-dom";
import LoginBtn from "./LoginBtn";
import NavMobile from "./NavMobile";

export default function BurgerNav() {
  const app = typeof window !== "undefined" && document.querySelector("#app");
  const [open, setOpen] = useState<boolean>(false);
  const [domReady, setDomReady] = useState(false);

  React.useEffect(() => {
    setDomReady(true);
  }, []);

  const variantsBar1 = {
    closed: {
      rotate: "45deg",
      translateX: 5,
      translateY: -2.5,
    },
    open: {
      rotate: "0deg",
    },
  };

  const variantsBar2 = {
    closed: {
      rotate: "-45deg",
    },
    open: {
      rotate: "0deg",
    },
  };

  const variantsBar3 = {
    closed: {
      rotate: "45deg",
      translateX: 3,
      translateY: 2,
    },
    open: {
      rotate: "0deg",
    },
  };

  return (
    <div className="md600:hidden">
      <button
        onClick={() => setOpen((s) => !s)}
        className="flex justify-center items-center w-10 h-10 rounded-full text-xl transition-colors duration-500 m-1"
      >
        <div className="flex flex-col h-full justify-evenly items-center py-1">
          <motion.div
            variants={variantsBar1}
            animate={open ? "closed" : "open"}
            transition={{ ease: "easeInOut" }}
            className="bg-main2 w-4 h-[3px] rounded-2xl self-start origin-left"
          ></motion.div>

          <motion.div
            variants={variantsBar2}
            animate={open ? "closed" : "open"}
            transition={{ ease: "easeInOut" }}
            className="bg-main2 w-8 h-[3px] rounded-2xl "
          ></motion.div>

          <motion.div
            variants={variantsBar3}
            animate={open ? "closed" : "open"}
            transition={{ ease: "easeInOut" }}
            className="bg-main2 w-6 h-[3px] rounded-2xl self-start origin-right"
          ></motion.div>
        </div>
      </button>
      {domReady &&
        app &&
        createPortal(
          <>
            <motion.div
              onClick={() => setOpen(false)}
              animate={open ? { translateX: "0%" } : { translateX: "100%" }}
              initial={{ translateX: "100%" }}
              transition={{ ease: "easeInOut" }}
              className="absolute w-full h-full z-[9] top-0 left-0  flex justify-center items-center overflow-hidden md600:hidden"
            ></motion.div>
            <motion.div
              animate={open ? { translateX: "0%" } : { translateX: "100%" }}
              initial={{ translateX: "100%" }}
              transition={{ ease: "easeInOut" }}
              className="absolute right-0 top-0 z-[9] -translate-x-full h-full w-[280px] bg-white border-l border-l-slate-200 border-solid p-6 pt-[88px] flex flex-col md600:hidden"
            >
              
              <NavMobile />
            </motion.div>
          </>,
          app
        )}
    </div>
  );
}
