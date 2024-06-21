import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  async function logout() {
    queryClient.removeQueries();
    localStorage.removeItem("sessionToken");
    router.push("/");
    toast.success("Logged out");
  }

  return logout;
}
