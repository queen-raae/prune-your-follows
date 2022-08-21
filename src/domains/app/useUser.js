import { useQuery } from "@tanstack/react-query";
import { supabase } from "./supabaseClient";

export default function useUser() {
  return useQuery(
    ["user"],
    async () => {
      const result = await supabase.auth.getSession();

      // console.log(result.data.session?.user);

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
