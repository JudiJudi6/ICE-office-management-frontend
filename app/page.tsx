"use client";

import { RxCross2 } from "react-icons/rx";
import React, { useEffect, useState } from "react";
import Greeting from "@/components/features/homepage/Greeting";
import DescriptionBox from "@/components/features/homepage/DescriptionBox";
import Footer from "@/components/features/homepage/Footer";
import CreatorPanel from "@/components/features/homepage/CreatorPanel";
import RegisterAd from "@/components/features/homepage/RegisterAd";
import { useQueryClient } from "@tanstack/react-query";
import UserInterface from "@/interfaces/UserInterface";
import { useRouter } from "next/navigation";

export default function Home() {
  const queryClient = useQueryClient();
  const user: UserInterface | undefined = queryClient.getQueryData(["user"]);
  const isAuth = user?.data.user;
  const router = useRouter();

  useEffect(
    function () {
      if (isAuth) {
        router.push("/view");
      }
    },
    [isAuth, router]
  );

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
            text="Using FireDesk is intuitive and straightforward. Simply utilize our 3D office creator tool to visualize your office space."
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
