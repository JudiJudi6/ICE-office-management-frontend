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
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return { makeReservation, isSuccess };
}
