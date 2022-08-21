import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "./supabaseClient";

import useUser from "./useUser";

export const populateTwitterFollowing = async () => {
  const { data } = await supabase.auth.getSession();
  const result = await axios.get("api/populate-following", {
    params: { accessToken: data?.session?.access_token },
    validateStatus: function (status) {
      return status < 300 || status === 429;
    },
  });

  return result;
};

export default function usePopulateFollowing() {
  const { data: user } = useUser();

  return useQuery(["populate", user?.id], populateTwitterFollowing, {
    enabled: Boolean(user?.id),
    staleTime: Infinity,
  });
}
