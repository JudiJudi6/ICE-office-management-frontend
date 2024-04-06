import Link from "next/link";
import React from "react";
import LoginBtn from "./LoginBtn";
import { MdOutlineViewInAr } from "react-icons/md";
import NavItem from "./NavItem";

interface NavMobileProps {
  closeNav: () => void;
}

export default function NavMobile({ closeNav }: NavMobileProps) {
  const isAuth = true;

  return (
    <div className="w-full ">
      {isAuth ? (
        <div className="w-full flex flex-col  flex-grow justify-center items-center">
          <LoginBtn isInNav={false} />
          <div className="mt-10 w-full flex flex-col justify-center items-center">
            <NavItem
              href="view"
              title="View"
              icon={<MdOutlineViewInAr />}
              onClick={closeNav}
            />
            <NavItem
              href="reservations"
              title="Reservations"
              icon={<MdOutlineViewInAr />}
              onClick={closeNav}
            />
            <NavItem
              href="/view/creator"
              title="Office Creator"
              icon={<MdOutlineViewInAr />}
              onClick={closeNav}
            />
            <NavItem
              href="settings"
              title="Settings"
              icon={<MdOutlineViewInAr />}
              onClick={closeNav}
            />
            <NavItem
              href="/"
              title="Log out"
              icon={<MdOutlineViewInAr />}
              onClick={closeNav}
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
