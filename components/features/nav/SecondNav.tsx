import { OfficesContext } from "@/context/OfficesContext";
import OfficeDataInterface from "@/interfaces/OfficeInterface";
import { useReducedMotion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";

interface SecondNavProps {
  setSelectedOffice: Dispatch<SetStateAction<string>>;
  selectedOffice: string;
}

export default function SecondNav({
  setSelectedOffice,
  selectedOffice,
}: SecondNavProps) {
  const officeData = useContext(OfficesContext);
  const searchParams = useSearchParams();

  useEffect(
    function () {
      const office = searchParams.get("o");
      if (office) {
        setSelectedOffice(office);
      }
    },
    [searchParams, setSelectedOffice]
  );

  return (
    <div className="flex">
      <select
        value={selectedOffice}
        onChange={(e) => setSelectedOffice(e.target.value)}
      >
        {officeData?.data?.offices.length === 0 && (
          <option value="">Create some office</option>
        )}
        {officeData?.data?.offices.map((office) => (
          <option key={office.id} value={office.id}>
            {office.name}
          </option>
        ))}
      </select>
    </div>
  );
}
