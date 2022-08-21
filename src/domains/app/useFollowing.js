import { useQuery } from "@tanstack/react-query";
import { supabase } from "./supabaseClient";
import useProfile from "./useProfile";
import useUser from "./useUser";

export const SORT = {
  INACTIVE: "Inactive",
  OVERACTIVE: "Overactive",
  UNPOPULAR: "Unpopular",
  OVERPOPULAR: "Overpopular",
};

export default function useFollowing({ sort = SORT.INACTIVE }) {
  const { data: user } = useUser();
  const { data: profile } = useProfile();

  return useQuery(
    ["following", user?.id, sort],
    async () => {
      // Main query without sort
      const query = supabase
        .from("accounts")
        .select("*, follows!inner(*)")
        .eq("follows.user_id", user?.id)
        .gte("follows.updated_at", profile.last_fetched)
        .limit(150);

      switch (sort) {
        case SORT.INACTIVE:
          query
            .order("average_tweets_per_year")
            .order("age", { ascending: false })
            .order("username");
          break;
        case SORT.OVERACTIVE:
          query
            .order("average_tweets_per_year", { ascending: false })
            .order("age", { ascending: true })
            .order("username");
          break;
        case SORT.UNPOPULAR:
          query.order("followers_count").order("username");
          break;
        case SORT.OVERPOPULAR:
          query
            .order("followers_count", { ascending: false })
            .order("username");
          break;

        default:
      }
      const result = await query;

      if (result.error) {
        throw result.error;
      } else {
        return result;
      }
    },
    {
      enabled: Boolean(user?.id) && Boolean(profile?.last_fetched),
      select: (result) => result.data,
    }
  );
}
