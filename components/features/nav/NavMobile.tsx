import Link from "next/link";
import React from "react";
import LoginBtn from "./LoginBtn";
import { MdOutlineViewInAr } from "react-icons/md";
import NavItem from "./NavItem";

export default function NavMobile() {
  const isAuth = true;

  return (
    <div className="w-full ">
      {isAuth ? (
        <div className="w-full flex flex-col  flex-grow justify-center items-center">
          <LoginBtn isInNav={false} />
          <div className="mt-10 w-full flex flex-col justify-center items-center">
            <NavItem href="view" title="View" icon={<MdOutlineViewInAr />} />
            <NavItem href="view" title="Reservations" icon={<MdOutlineViewInAr />} />
            <NavItem href="view" title="Office" icon={<MdOutlineViewInAr />} />
            <NavItem href="view" title="View" icon={<MdOutlineViewInAr />} />
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
