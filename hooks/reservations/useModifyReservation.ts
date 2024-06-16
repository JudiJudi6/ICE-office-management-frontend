import { modifyReservation as modifyReservationApi } from "@/services/apiOffices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useModifyReservation() {
  const queryClient = useQueryClient();
  const { mutate: modifyReservation, isSuccess } = useMutation({
    mutationFn: (requestData: {
      deskId: string | undefined;
      officeId: string | undefined;
      reservationId: string | undefined;
      startTime: string | undefined;
      endTime: string | undefined;
    }) =>
      modifyReservationApi(
        requestData.deskId,
        requestData.officeId,
        requestData.reservationId,
        requestData.startTime,
        requestData.endTime
      ),
    onSuccess: () => {
      toast.success("Reservation modified");
      queryClient.invalidateQueries({ queryKey: ["userOffices"] });
    },
    onError: (err) => {
      console.log(err.message);
      toast.error("Something went wrong");
    },
  });

  return { modifyReservation, isSuccess };
}
