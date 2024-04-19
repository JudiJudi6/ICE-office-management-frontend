"use client";

import { RxCross2 } from "react-icons/rx";
import React, { useState } from "react";
import InfoBox from "@/components/features/homepage/InfoBox";
import Greeting from "@/components/features/homepage/Greeting";
import Slogan from "@/components/features/homepage/Slogan";
import Footer from "@/components/features/homepage/Footer";

export default function Home() {
  return (
    <div className="  static z-[-1] min-h-screen  overflow-hidden bg-bgWhite1  ">
      <Greeting />

      <br />

      <div className="  justify-center mt-2 px-5 py-1">
        <div className="lg:grid grid-cols-3  items-stretch">
          <div className="basis-2/3 m-5 col-span-2">
            <InfoBox
              boxTitle="What is FireDesk?"
              text="FireDesk is a convinient tool that allows you to book your place to work. Only thing you need is a FireDesk account."
              srcImg="/images/image2.png"
              showButton={false}
              showImg={true}
            />
          </div>
          <div className="basis-1/3 m-5 ">
            <InfoBox
              boxTitle="New to FireDesk?"
              text={
                "Create FireDesk account and book place to work in fast and easy way! "
              }
              showButton={true}
              hrefButton="/signup"
              titleButton="Sign up now!"
              showImg={false}
            />
          </div>
        </div>
        <div className="basis-full m-5">
          <InfoBox
            boxTitle="FireDesk Creator"
            text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic atque veniam nisi iure molestias voluptate fuga deleniti ipsa aperiam."
            srcImg="/images/office.jpg"
            showImg={true}
            showButton={false}
            textLeft={false}
          />
        </div>
      </div>
      <div></div>
      <Footer />
    </div>
  );
}
