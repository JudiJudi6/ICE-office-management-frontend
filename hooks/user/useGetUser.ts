import { getUser } from "@/services/apiAuth";
import { useQuery } from "@tanstack/react-query";

export function useGetUser(userToken: string | null) {
  const { data, isLoading } = useQuery({
    queryFn: () => getUser(userToken),
    queryKey: ["user"],
  });

  return { data, isLoading };
}
