"use client";

import React, { useState } from "react";
import BurgerBtn from "./BurgerBtn";
import { createPortal } from "react-dom";

export default function BurgerNav() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <BurgerBtn onOpen={setOpen} />
      {createPortal(
        <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center bg-red-300 ">
          {open && <div className="absolute z-50">dsa</div>}
        </div>,
        document.body
      )}
    </div>
  );
}
