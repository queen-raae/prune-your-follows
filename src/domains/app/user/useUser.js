import { useEffect } from "react";
import axios from "../axios";
import { setUser as setSentryUser } from "@sentry/gatsby";
import { navigate } from "gatsby";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function useUser() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      navigate("/");
    },
  });

  const user = session?.user;

  useEffect(() => {
    setSentryUser({ id: user?.id });
  }, [user?.id]);

  return useQuery(
    ["user", user?.id],
    async () => {
      const { data } = await axios.get("/api/meta");
      return data;
    },
    {
      enabled: Boolean(user?.id),
      placeholderData: {},
      select: (data) => {
        return {
          ...user,
          lastImport: data.last,
          initializing: Boolean(user?.id && data.next && !data.last),
          enableQueries: Boolean(user?.id && data?.last),
        };
      },
      refetchInterval: (data) => {
        if (data?.enableQueries) {
          return false;
        } else {
          return 1000;
        }
      },
    }
  );
}
