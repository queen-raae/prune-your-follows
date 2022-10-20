import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useUser from "./useUser";

export const SORT = {
  OVERPOPULAR: "Overpopular",
  OVERACTIVE: "Overactive",
  INACTIVE: "Inactive",
  UNPOPULAR: "Unpopular",
};

export default function useFollowing({ sort = SORT.INACTIVE }) {
  const { data: user } = useUser();

  return useQuery(
    ["following", user?.id, sort],
    async () => {
      const { data } = await axios.get("/api/following", {
        params: { sort: sort },
      });

      return data;
    },
    {
      enabled: Boolean(user?.id),
      select: (result) => result.records,
      placeholderData: {
        records: [
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
        ],
      },
    }
  );
}
