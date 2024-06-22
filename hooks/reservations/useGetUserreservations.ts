import { getUserReservations } from "@/services/apiOffices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useGetUserReservations() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);

  const {
    mutate: getReservations,
    data,
    isSuccess,
  } = useMutation({
    mutationFn: (requestData: { officeId: string | undefined }) => {
      console.log(user?.data.user._id, requestData.officeId);
      return getUserReservations(user?.data.user._id, requestData.officeId);
    },
    onSuccess: (data) => console.log(data),
    onError: (err) => console.log(err),
  });

  return { data, isSuccess, getReservations };
}
