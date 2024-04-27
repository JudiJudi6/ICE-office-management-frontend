import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "@/services/apiAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: login, isSuccess } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      toast.success("Logged in");
      router.push("/view");
    },
    onError: (err) => {
      toast.error(err.message);
      console.error(err.message);
    },
  });

  return { login, isSuccess };
}
