"use client";

import { RxCross2 } from "react-icons/rx";
import React, { useState } from "react";
import InfoBox from "@/components/features/homepage/InfoBox";
import Greeting from "@/components/features/homepage/Greeting";
import DescriptionBox from "@/components/features/homepage/DescriptionBox";
import Footer from "@/components/features/homepage/Footer";
import CreatorPanel from "@/components/features/homepage/CreatorPanel";
import RegisterAd from "@/components/features/homepage/RegisterAd";

export default function Home() {
  return (
    <div className="  static z-[-1]   overflow-hidden bg-bgWhite1  ">
      <Greeting />

      <div className="  justify-center my-20 px-5 py-1">
        <div className="lg:grid 2xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 m-20 items-stretch">
          <div className=" m-16 ">
            <DescriptionBox
              boxTitle="What is FireDesk?"
              text="FireDesk is a convinient tool that allows you to book your place to work. Only thing you need is a FireDesk account."
              image="FaRegQuestionCircle"
            />
          </div>
          <div className=" m-16 ">
            <DescriptionBox
              boxTitle="Why is FireDesk helpfull?"
              text="Create FireDesk account and book place to work in fast and easy way! "
              image="RiShakeHandsLine"
            />
          </div>
          <div className=" m-16">
            <DescriptionBox
              boxTitle="How do I use FireDesk?"
              text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic atque veniam nisi iure molestias voluptate fuga deleniti ipsa aperiam."
              image="FiTool"
            />
          </div>
        </div>
      </div>
      <CreatorPanel />
      <RegisterAd />
      <Footer />
    </div>
  );
}
