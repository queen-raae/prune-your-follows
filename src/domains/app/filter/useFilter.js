import axios from "../axios";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../user";

import { FILTERS } from "./filters";

export function getFilter({ filterParam }, filters = FILTERS) {
  return filters.find((filter) => {
    return filter.path.includes(`/${filterParam}/`);
  });
}

export default function useFilter({
  filter = FILTERS[0],
  pageIndex = 0,
  size = 64,
}) {
  const { data: user } = useUser();
  const offset = size * pageIndex;

  return useQuery(
    ["accounts", user?.id, "filter", filter.key, size, offset],
    async () => {
      const { data } = await axios.get("/api/accounts", {
        params: { filter: filter.key, size: size, offset: offset },
      });

      return data;
    },
    {
      enabled: Boolean(user?.enableQueries),
      keepPreviousData: true,
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
