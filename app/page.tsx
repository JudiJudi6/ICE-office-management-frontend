"use client";

import { RxCross2 } from "react-icons/rx";
import { FaFire } from "react-icons/fa";
import React, { useState } from "react";
import InfoBox from "@/components/ui/InfoBox";

export default function Home() {
  const greetingDiv = (
    <div
      id="greeting"
      className=" z-0 text-7xl items-center justify-center flex py-16 drop-shadow-md "
    >
      <h1 className="font-bold items-center lg:flex ">
        Welcome to
        <span className="flex lg:ml-5 ">
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

      <div className="flex justify-center">
        <button className="  m-4  w-40 h-10  shadow-md bg-gradient-to-r to-main1 via-main2 from-main1 bg-size-200 bg-pos-0 hover:bg-pos-100 py-2 text-white uppercase tracking-widest font-light rounded-full transition-all duration-300">
        <a href="/login">
          Log in
          </a>
        </button>
        </div>
      
    </div>
  );

  return (
    <div className=" z-0 min-h-screen py-20 overflow-hidden  ">
      {greetingDiv}
      {subtitle}
      <br />
      <div className="   justify-center mx-10 my-8 px-5 ">
        <div className="lg:flex flex-row items-center">
        <div className="basis-2/3 ">
        <InfoBox
          boxTitle="What is FireDesk?"
          text="FireDesk is a tool that allows you to book your place to work. Only thing you need is a FireDesk account."
          srcImg="/images/image2.png"
          showButton={false}
          showImg={true}
        />
        </div>
        <div className="basis-1/3  h-full">
        <InfoBox
        boxTitle="New to FireDesk?"
          text={"Lorem, ipsum dolor sit amet consectetur adipisicing elit. "}
          showButton={true}
          hrefButton="/signup"
          titleButton="Sign up now!"
          showImg={false}

        />
        </div>
        </div>
        <div className="basis-full">
        <InfoBox 
          boxTitle="New to FireDesk?"
          text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic atque veniam nisi iure molestias voluptate fuga deleniti ipsa aperiam."
          srcImg="/images/office.jpg"
          showImg={true}
          showButton={false}
        />
        </div>
      </div>
    </div>
  );
}
