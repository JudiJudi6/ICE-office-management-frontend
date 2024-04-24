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
    <div className="  static z-[-1]   overflow-hidden bg-bgWhite1  ">
      <Greeting />


        <div className=" grid static z-0 2xl:grid-cols-3 content-center lg:grid-cols-2 grid-cols-1 2xl:m-20  mx-5 justify-center my-20 px-5 py-1">
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
              text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic atque
              veniam nisi iure molestias voluptate fuga deleniti ipsa aperiam. "
              image="RiShakeHandsLine"
            />
          </div>
          <div className=" xl:m-12 lg:mx-16  lg:col-span-2 2xl:col-span-1  my-16">
            <DescriptionBox
              boxTitle="How do I use FireDesk?"
              text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic atque veniam nisi iure molestias voluptate fuga deleniti ipsa aperiam."
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
