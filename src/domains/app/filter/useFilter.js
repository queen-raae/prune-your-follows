import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  HomeIcon,
  ArchiveBoxXMarkIcon as UnfollowedIcon,
  EyeSlashIcon as KeptIcon,
} from "@heroicons/react/24/outline";
import { useUser } from "../user";

export const FOLLOWS_FILTERS = [
  {
    name: "Overpopular",
    key: "popular",
    to: "/app/filter/overpopular/",
    description: "Your follows with the most number of followers",
  },
  {
    name: "Unpopular",
    key: "unpopular",
    to: "/app/filter/unpopular/",
    description: "Your follows with the least number of followers",
  },
  {
    name: "Unactive",
    key: "inactive",
    to: "/app/filter/unactive/",
    description: "Your follows with the lowest number of tweets per year",
  },
  {
    name: "Overactive",
    key: "active",
    to: "/app/filter/overactive/",
    description: "Your follows with the highest number of tweets per year",
  },
];

export const MAIN_FILTERS = [
  {
    name: "Home",
    key: "home",
    to: "/app/",
    icon: HomeIcon,
  },
  {
    name: "Unfollowed",
    key: "unfollowed",
    to: "/app/unfollowed/",
    description: "(Not done) The accounts unfollowed from the app",
    icon: UnfollowedIcon,
  },
  {
    name: "Keep",
    key: "hidden",
    to: "/app/keep/",
    description: "(Not done) The accounts marked keep",
    icon: KeptIcon,
  },
];

export const FILTERS = [...MAIN_FILTERS, ...FOLLOWS_FILTERS];

export function getFilter({ path }, filters = FILTERS) {
  return filters.find((filter) => {
    return filter.to === path;
  });
}

export default function useFilter({ filter = FILTERS[0] }) {
  const { data: user } = useUser();

  return useQuery(
    ["accounts", user?.id, "filter", filter.key],
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
