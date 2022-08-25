import { useQuery } from "@tanstack/react-query";
import { supabase } from "../data/supabaseClient";

export default function useUser() {
  return useQuery(["user"], async () => {
    const session = supabase.auth.session();

    console.log("useUser", session);

    return session?.user;
  });
}
