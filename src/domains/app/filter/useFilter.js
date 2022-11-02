import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useUser } from "../user";

export const FILTERS = [
  {
    name: "Overpopular",
    key: "OVERPOPULAR",
    to: "/app/filter/overpopular/",
    description: "The most popular accounts you follow",
  },
  {
    name: "Unpopular",
    key: "UNPOPULAR",
    to: "/app/filter/unpopular/",
    description: "The least popular accounts you follow",
  },
  {
    name: "Unactive",
    key: "INACTIVE",
    to: "/app/filter/unactive/",
    description: "The least active accounts you follow",
  },
  {
    name: "Overactive",
    key: "OVERACTIVE",
    to: "/app/filter/overactive/",
    description: "The most active accounts you follow",
  },
];

export function getFilter({ path }, filters = FILTERS) {
  return filters.find((filter) => {
    return filter.to === path;
  });
}

export default function useFilter({ filter = FILTERS[0] }) {
  const { data: user } = useUser();

  return useQuery(
    ["following", user?.id, filter.key],
    async () => {
      const { data } = await axios.get("/api/following", {
        params: { filter: filter.key },
      });

      return data;
    },
    {
      enabled: Boolean(user?.enableQueries),
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
