import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp as signUpApi } from "@/services/apiAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function useSignUp() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: signUp, isSuccess } = useMutation({
    mutationFn: signUpApi,
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

  return { signUp, isSuccess };
}
