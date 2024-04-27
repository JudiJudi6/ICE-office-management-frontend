"use client";

import UserInterface from "@/interfaces/UserInterface";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface LoginBtnProps {
  isInNav: boolean;
  onCloseNav?: () => void;
}

export default function LoginBtn({ isInNav, onCloseNav }: LoginBtnProps) {
  const queryClient = useQueryClient();
  const user: UserInterface | undefined = queryClient.getQueryData(["user"]);
  const isAuth = user?.data.user;
  const pathName = usePathname();

  if (pathName !== "/view/creator") {
    return (
      <div className={`${isInNav ? "hidden lg:block" : ""}`}>
        {isAuth ? (
          <div
            className={`flex justify-center items-center self-end gap-3 ${
              !isInNav && "mt-5"
            }`}
          >
            {!isInNav && (
              <div>
                <Image
                  src="/images/default.jpg"
                  width={40}
                  height={40}
                  alt=""
                  className="rounded-full"
                />
              </div>
            )}
            <p>
              {user.data.user.name} {user.data.user.surname}
            </p>
            {isInNav && (
              <div>
                <Image
                  src="/images/default.jpg"
                  width={30}
                  height={30}
                  alt=""
                  className="rounded-full"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center gap-4">
            <Link
              onClick={onCloseNav}
              href="/login"
              className="w-[110px] text-sm text-center hover:bg-gradient-to-r  bg-size-200 bg-pos-0 hover:bg-pos-100 py-2 text-main1 hover:text-main2  tracking-wide  rounded-full transition-all duration-300 px-6"
            >
              Log in
            </Link>
            <Link
              onClick={onCloseNav}
              href="/signup"
              className="w-[110px] text-sm text-center bg-gradient-to-r to-main1 via-main2 from-main1 bg-size-200 bg-pos-0 hover:bg-pos-100 py-2 text-white  tracking-wide rounded-full transition-all duration-300 px-6"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
}
