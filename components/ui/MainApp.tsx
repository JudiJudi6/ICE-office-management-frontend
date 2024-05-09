"use client";

import React from "react";
import Spinner from "./Spinner";
import { useGetOffices } from "@/hooks/creator/useGetOffices";
import { OfficesContext } from "@/context/OfficesContext";
import { useGetUserOffices } from "@/hooks/creator/useGetUserOffices";
import { useQueryClient } from "@tanstack/react-query";

interface MainAppProps {
  children: React.ReactElement;
}

export default function MainApp({ children }: MainAppProps) {
  const userToken = localStorage.getItem("sessionToken");
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);
  const { data, isLoading } = useGetUserOffices(user?.data?.user?.userId);
  console.log(user?.data?.user?.userId);
  // const { data, isLoading } = useGetOffices();

  console.log(data);

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
