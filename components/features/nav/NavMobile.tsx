"use client";

import React from "react";
import LoginBtn from "./LoginBtn";
import NavItem from "./NavItem";

import { MdOutlineViewInAr } from "react-icons/md";
import { TbReservedLine } from "react-icons/tb";
import { SiSpringCreators } from "react-icons/si";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

interface NavMobileProps {
  loginBtns?: boolean;
  closeNav?: () => void;
}

export default function NavMobile({
  closeNav,
  loginBtns = true,
}: NavMobileProps) {
  const isAuth = true;

  return (
    <div className="w-full">
      {isAuth ? (
        <div className="w-full flex flex-col  flex-grow justify-center items-center">
          {loginBtns && <LoginBtn isInNav={false} />}
          <div className="mt-10 w-full flex flex-col justify-center items-center gap-3">
            <NavItem
              href="/view"
              title="View"
              icon={<MdOutlineViewInAr />}
              onClick={() => {
                closeNav && closeNav();
              }}
            />
            <NavItem
              href="/view/reservations"
              title="Reservations"
              icon={<TbReservedLine />}
              onClick={() => {
                closeNav && closeNav();
              }}
            />
            <NavItem
              href="/view/creator"
              title="Office Creator"
              icon={<SiSpringCreators />}
              onClick={() => {
                closeNav && closeNav();
              }}
            />
            <NavItem
              href="/view/settings"
              title="Settings"
              icon={<IoSettingsOutline />}
              onClick={() => {
                closeNav && closeNav();
              }}
            />
            <NavItem
              href="/"
              title="Log out"
              icon={<FiLogOut />}
              onClick={() => {
                closeNav && closeNav();
              }}
            />
          </div>
        </div>
      ) : (
        <>
          <LoginBtn isInNav={false} />
          <p className="self-start mt-10 text-center text-sm">
            Create <span className="text-main2">a free account</span>, build
            your <span className="text-main2">office</span> and organize{" "}
            <span className="text-main2">your business</span> with us
          </p>
        </>
      )}
    </div>
  );
}
