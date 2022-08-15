import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabaseClient";
import useUser from "./useUser";

export default function useProfile() {
  const { data: user } = useUser();

  return useQuery(
    ["profile", user?.id],
    async () => {
      let result = await supabase
        .from("profiles")
        .select()
        .eq("user_id", user.id)
        .single();

      if (result.status === 406) {
        result = await supabase.from("profiles").upsert({ user_id: user.id });
      }

      if (result.error) {
        throw result.error;
      } else {
        return result;
      }
    },
    {
      enabled: Boolean(user?.id),
      select: (result) => result.data,
      refetchInterval: 10 * 1000,
    }
  );
}
