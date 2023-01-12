import { useQuery } from "@tanstack/react-query";
import { useUser } from "../user";

import { xataWorker } from "./../../xata";

const searchAccount = xataWorker(
  "searchAccount",
  async ({ xata }, { search }) => {
    const searchResults = await xata.search.all(search, {
      tables: [
        {
          table: "accounts",
          target: [
            { column: "name", weight: 3 },
            { column: "username", weight: 7 },
            { column: "meta.location" },
            { column: "meta.description" },
          ],
        },
      ],
      highlight: { enabled: true },
      fuzziness: 1,
      prefix: "phrase",
    });

    const records = searchResults.map((result) => {
      return {
        ...result,
        searchInfo: result.record.getMetadata(),
      };
    });

    return { records };
  }
);

export default function useSearch({ search }) {
  const { data: user } = useUser();

  return useQuery(
    ["accounts", user?.id, "search", search],
    async () => {
      return searchAccount({ search: search });
    },
    {
      enabled: Boolean(user?.enableQueries) && Boolean(search),
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
