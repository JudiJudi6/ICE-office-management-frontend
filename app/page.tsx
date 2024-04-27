"use client";

import { RxCross2 } from "react-icons/rx";
import React, { useState } from "react";
import Greeting from "@/components/features/homepage/Greeting";
import DescriptionBox from "@/components/features/homepage/DescriptionBox";
import Footer from "@/components/features/homepage/Footer";
import CreatorPanel from "@/components/features/homepage/CreatorPanel";
import RegisterAd from "@/components/features/homepage/RegisterAd";

export default function Home() {
  return (
    <div className="z-[-1]   overflow-hidden bg-bgWhite1  ">
      <Greeting />
      <div className=" grid static z-0 2xl:grid-cols-3 content-center lg:grid-cols-2 grid-cols-1   justify-center px-5 py-1 max-w-7xl mx-auto">
        <div className=" xl:m-12 lg:mx-16  my-16">
          <DescriptionBox
            boxTitle="What is FireDesk?"
            text="FireDesk is a convinient tool that allows you to book your place to work. Only thing you need is a FireDesk account."
            image="FaRegQuestionCircle"
          />
        </div>
        <div className="xl:m-12 lg:mx-16  my-16">
          <DescriptionBox
            boxTitle="Why is FireDesk helpfull?"
            text="Firedesk is incredibly helpful due to its ability to optimize office space, ensuring efficient desk layouts and better space utilization."
            image="RiShakeHandsLine"
          />
        </div>
        <div className=" xl:m-12 lg:mx-16  lg:col-span-2 2xl:col-span-1  my-16">
          <DescriptionBox
            boxTitle="How do I use FireDesk?"
            text="Using FireDesk is intuitive and straightforward. Simply utilize our 3D office creator tool to visualize your office space. Then, drag and drop desks into your desired layout, adjust configurations as needed, and voila! You've successfully optimized your workspace with FireDesk."
            image="FiTool"
          />
        </div>
      </div>

      <CreatorPanel />
      <RegisterAd />
      <Footer />
    </div>
  );
}
