import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useUser from "./useUser";

export default function useSearch({ search }) {
  const { data: user } = useUser();

  return useQuery(
    ["search", user?.id, search],
    async () => {
      const { data } = await axios.get("/api/following", {
        params: { search: search },
      });

      console.log({ data });

      return data;
    },
    {
      enabled: Boolean(user?.id) && Boolean(search),
    }
  );
}
