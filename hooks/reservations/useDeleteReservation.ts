import { deleteReservation as deleteReservationApi } from "@/services/apiOffices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteReservation() {
  const queryClient = useQueryClient();
  const { mutate: deleteReservation, isSuccess } = useMutation({
    mutationFn: (requestData: {
      deskId: string | undefined;
      officeId: string | undefined;
      reservationId: string | undefined;
    }) =>
      deleteReservationApi(
        requestData.deskId,
        requestData.officeId,
        requestData.reservationId
      ),
    onSuccess: () => {
      toast.success("Reservation deleted");
      queryClient.invalidateQueries({ queryKey: ["userOffices"] });
      queryClient.invalidateQueries({ queryKey: ["userReservations"] });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return { deleteReservation, isSuccess };
}
