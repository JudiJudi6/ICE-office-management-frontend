"use client";

import { RxCross2 } from "react-icons/rx";
import { FaFire } from "react-icons/fa";
import React, { useState } from "react";
import InfoBox from "@/components/ui/InfoBox";

export default function Home() {
  const greetingDiv = (
    <div
      id="greeting"
      className=" text-7xl items-center justify-center flex py-16 drop-shadow-md "
    >
      <h1 className="font-bold md800:flex ">
        Welcome to
        <span className="flex md800:ml-5 ">
          <FaFire className="  text-main2 " />
          <span className="font-normal">Fire</span>
          <span className="text-main2">Desk</span>!
        </span>
      </h1>
    </div>
  );

  const subtitle = (
    <div className=" md800:flex justify-center   drop-shadow-md">
      <h1 className="text-2xl md800:my-5 flex justify-center items-centre text-center">
        Book your desk and do not worry about place to work!
      </h1>

      <a href="/login" className="flex justify-center">
        <button className=" m-4  w-40 h-10  shadow-md bg-gradient-to-r to-main1 via-main2 from-main1 bg-size-200 bg-pos-0 hover:bg-pos-100 py-2 text-white uppercase tracking-widest font-light rounded-full transition-all duration-300">
          Log in
        </button>
      </a>
    </div>
  );

  return (
    <div className="min-h-screen py-20  ">
      {greetingDiv}
      {subtitle}
      <br />
      <div className="flex mx-20 my-8">
        <InfoBox
          boxTitle="What is FireDesk?"
          text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic atque veniam nisi iure molestias voluptate fuga deleniti ipsa aperiam."
          image="/images/image.png"
        />
        <InfoBox
          boxTitle="New to FireDesk?"
          text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic atque veniam nisi iure molestias voluptate fuga deleniti ipsa aperiam. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic atque veniam nisi iure molestias voluptate fuga deleniti ipsa aperiam."
          image="/images/image.png"
        />
      </div>
    </div>
  );
}
