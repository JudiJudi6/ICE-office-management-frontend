import { getUserReservations } from "@/services/apiOffices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetUserReservations({ officeId }: { officeId: string }) {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);

  const { data, isSuccess, refetch } = useQuery({
    queryFn: () => getUserReservations(user?.data.user._id, officeId),
    queryKey: ["userReservations"],
  });

  return { data, isSuccess, refetch };
}
