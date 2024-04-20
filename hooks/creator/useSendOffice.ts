import { sendOffice as sendOfficeApi } from "@/services/apiOffices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useSendOffice() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: sendOffice, isSuccess } = useMutation({
    mutationFn: sendOfficeApi,
    onSuccess: (data) => {
      console.log(data);
      toast.success("Office has been added");
      queryClient.invalidateQueries();
      router.push(`/view?o=${data.data.id}`);
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(err);
    },
  });

  return { sendOffice, isSuccess };
}
