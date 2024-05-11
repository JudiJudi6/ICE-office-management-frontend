"use client";

import React, { useEffect } from "react";
import Spinner from "./Spinner";
import { useGetOffices } from "@/hooks/creator/useGetOffices";
import { OfficesContext } from "@/context/OfficesContext";
import { useGetUserOffices } from "@/hooks/creator/useGetUserOffices";
import { useQueryClient } from "@tanstack/react-query";
import UserInterface from "@/interfaces/UserInterface";

interface MainAppProps {
  children: React.ReactElement;
}

export default function MainApp({ children }: MainAppProps) {
  const userToken = localStorage.getItem("sessionToken");
  const queryClient = useQueryClient();
  const user: UserInterface | undefined = queryClient.getQueryData(["user"]);
  const { data, isLoading } = useGetUserOffices(user?.data?.user?._id);
  // const { data, isLoading } = useGetOffices();

  console.log(data);

  useEffect(function(){
    if(!isLoading) queryClient.invalidateQueries({queryKey: ['userOffices']})
  },[isLoading, queryClient])

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
