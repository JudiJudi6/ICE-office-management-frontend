"use client";

import NavMobile from "@/components/features/nav/NavMobile";
import MainApp from "@/components/ui/MainApp";
import { usePathname } from "next/navigation";
import React from "react";

interface AppLayoutProps {
  children: React.ReactElement;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathName = usePathname();

  return (
    <>
      <div className=" flex justify-start items-start">
        {pathName !== "/view/creator" && (
          <div className="hidden lg:block pt-16 p-4 w-[250px] h-screen border-solid border-r border-r-slate-200">
            <NavMobile loginBtns={false} />
          </div>
        )}
        <MainApp>{children}</MainApp>
      </div>
    </>
  );
}
