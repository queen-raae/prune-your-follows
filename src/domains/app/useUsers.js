import { useQuery } from "@tanstack/react-query";
import { supabase } from "./supabaseClient";

export default function useUsers() {
  return useQuery(
    ["profiles"],
    async () => {
      // Main query without sort
      const result = await supabase.from("public_profiles").select().limit(10);

      if (result.error) {
        throw result.error;
      } else {
        return result;
      }
    },
    {
      select: (result) => result.data,
      placeholderData: { data: [{}] },
    }
  );
}
