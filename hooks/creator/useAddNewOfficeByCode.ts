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
      //   router.push()
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["userOffices"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      const errorObject = JSON.parse(err.message);
      const errorMessage = errorObject.error;
      toast.error(errorMessage);
    },
  });

  return { addByCode, isSuccess };
}
