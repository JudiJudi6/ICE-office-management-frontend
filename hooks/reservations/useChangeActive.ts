import { changeAvailibility as changeAvailibilityApi } from "@/services/apiOffices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useChangeActive() {
  const queryClient = useQueryClient();
  const { mutate: changeAvailibility, isSuccess } = useMutation({
    mutationFn: (requestData: {
      deskId: string | undefined;
      officeId: string | undefined;
      active: boolean;
    }) =>
      changeAvailibilityApi(
        requestData.deskId,
        requestData.officeId,
        requestData.active
      ),
    onSuccess: () => {
      toast.success("Availibility changed");
      queryClient.invalidateQueries({ queryKey: ["userOffices"] });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return { changeAvailibility, isSuccess };
}
