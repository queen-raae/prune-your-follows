import { useQuery } from "@tanstack/react-query";
import { navigate } from "gatsby";
import { useSession } from "next-auth/react";

export default function useUser() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      navigate("/");
    },
  });
  const user = session?.user;

  return useQuery(["user", user?.id], async () => {
    return user;
  });
}
