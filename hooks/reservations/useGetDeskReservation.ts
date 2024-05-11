import { getDeskReservations } from "@/services/apiOffices";
import { useQuery } from "@tanstack/react-query";

export function useGetDeskReservation(deskId: string, officeId: string | undefined) {
  const { data, isLoading } = useQuery({
    queryFn: () => getDeskReservations(deskId, officeId),
    queryKey: [officeId + "-desk-" + deskId],
  });

  return { data, isLoading };
}
