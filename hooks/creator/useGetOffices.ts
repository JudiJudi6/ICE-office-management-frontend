import { getOffice } from "@/services/apiOffices";
import { useQuery } from "@tanstack/react-query";

export function useGetOffices() {
  const { data, isLoading } = useQuery({
    queryFn: getOffice,
    queryKey: ["offices"],
  });

  return { data, isLoading };
}
