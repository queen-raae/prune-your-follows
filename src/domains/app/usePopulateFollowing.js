import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "./supabaseClient";

import useUser from "./useUser";

export const populateTwitterFollowing = async () => {
  const session = supabase.auth.session();

  // console.log("populateTwitterFollowing session", session);

  const result = await axios.post(
    "/api/populate-following",
    { accessToken: session.access_token },
    {
      validateStatus: function (status) {
        return status < 300 || status === 405 || status === 429;
      },
    }
  );

  return result;
};

export default function usePopulateFollowing() {
  const { data: user } = useUser();

  return useQuery(["populate", user?.id], populateTwitterFollowing, {
    enabled: Boolean(user?.id),
    staleTime: Infinity,
  });
}
