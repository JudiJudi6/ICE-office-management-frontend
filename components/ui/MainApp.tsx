"use client";

import React from "react";
import Spinner from "./Spinner";
import { useGetOffices } from "@/hooks/creator/useGetOffices";
import { OfficesContext } from "@/context/OfficesContext";

interface MainAppProps {
  children: React.ReactElement;
}

export default function MainApp({ children }: MainAppProps) {
  const { data, isLoading } = useGetOffices();

  return (
    <>
      {isLoading ? (
        <div className="pt-16 w-full h-screen">
          <Spinner />
        </div>
      ) : (
        <OfficesContext.Provider value={data}>
          <div className="overflow-x-auto flex-grow h-screen">{children}</div>
        </OfficesContext.Provider>
      )}
      ;
    </>
  );
}
