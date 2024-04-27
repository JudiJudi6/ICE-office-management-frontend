import OfficeDataInterface from "@/interfaces/OfficeInterface";
import { createContext } from "react";

export const OfficesContext = createContext<{
  status: string;
  data: { offices: OfficeDataInterface[] };
}>({
  status: "",
  data: { offices: [] },
});
