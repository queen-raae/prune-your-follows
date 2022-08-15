import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabaseClient";

export default function useUser() {
  return useQuery(
    ["user"],
    async () => {
      const result = await supabase.auth.getSession();

      if (result.error) {
        throw result.error;
      } else {
        return result;
      }
    },
    {
      select: (result) => result.data.session?.user,
    }
  );
}
