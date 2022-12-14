import axios from "../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAccountAction() {
  const queryClient = useQueryClient();

  const { mutate: handleUpdateUser, ...rest } = useMutation({
    mutationFn: (action) => {
      const { email } = action;
      return axios.post("/api/meta", { email });
    },
    onSettled: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });

  return { handleUpdateUser, ...rest };
}
