import { ReservationData } from "@/interfaces/OfficeInterface";
import { makeReservation as makeReservationApi } from "@/services/apiOffices";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import toast, { useToasterStore } from "react-hot-toast";

export function useMakeReservation() {
  const { toasts } = useToasterStore();
  const queryClient = useQueryClient();
  const { mutate: makeReservation, isSuccess } = useMutation({
    mutationFn: (requestData: {
      deskId: string;
      officeId: string | undefined;
      reservation: ReservationData;
    }) =>
      makeReservationApi(
        requestData.deskId,
        requestData.officeId,
        requestData.reservation
      ),
    onSuccess: () => {
      toast.success("Reservation done");
      queryClient.invalidateQueries({ queryKey: ["userOffices"] });
    },
    onError: (err) => {
      const errorObject = JSON.parse(err.message);
      const errorMessage = errorObject.error;
      toast.error(errorMessage);
    },
  });

  return { makeReservation, isSuccess };
}
