import axios from "axios";
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
          initializing: data.id && !data.last,
          enableQueries: data.id && data.last,
        };
      },
      refetchInterval: ({ enableQueries }) => {
        if (enableQueries) {
          return false;
        } else {
          return 1000;
        }
      },
    }
  );
}
