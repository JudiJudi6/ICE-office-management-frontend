import { addByCode as addByCodeApi } from "@/services/apiOffices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useAddNewOfficeByCode() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const user = queryClient.getQueryData(["user"]);
  const { mutate: addByCode, isSuccess } = useMutation({
    mutationFn: (requestData: { invCode: string }) =>
      addByCodeApi(requestData.invCode, user?.data.user._id),
    onSuccess: (data) => {
      toast.success("Office added");
      router.push(`view?o=${data.data.offices.at(-1)}`);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["userOffices"] });
    },
    onError: (err) => {
      const errorObject = JSON.parse(err.message);
      const errorMessage = errorObject.error;
      toast.error(errorMessage);
    },
  });

  return { addByCode, isSuccess };
}
