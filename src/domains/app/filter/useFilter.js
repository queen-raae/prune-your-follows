import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useUser } from "../user";

export const FILTERS = [
  {
    name: "Overpopular",
    key: "OVERPOPULAR",
    to: "/app/filter/overpopular/",
    description: "Your follows with the most number of followers",
  },
  {
    name: "Unpopular",
    key: "UNPOPULAR",
    to: "/app/filter/unpopular/",
    description: "Your follows with the least number of followers",
  },
  {
    name: "Unactive",
    key: "INACTIVE",
    to: "/app/filter/unactive/",
    description: "Your follows with the lowest number of tweets per year",
  },
  {
    name: "Overactive",
    key: "OVERACTIVE",
    to: "/app/filter/overactive/",
    description: "Your follows with the highest number of tweets per year",
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
      const { data } = await axios.get("/api/accounts", {
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
