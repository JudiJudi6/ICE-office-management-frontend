import { useQueryClient } from "@tanstack/react-query";
import React from "react";

export default function AddNewOfficeModal() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);
  
  return <div>AddNewOfficeModal</div>;
}
