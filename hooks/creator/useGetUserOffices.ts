import { getUserOffice } from "@/services/apiOffices";
import { useQuery } from "@tanstack/react-query";

export function useGetUserOffices(userId: string | null) {
  const { data, isLoading } = useQuery({
    queryFn: () => getUserOffice(userId),
    queryKey: ["userOffices"],
  });

  return { data, isLoading };
}
