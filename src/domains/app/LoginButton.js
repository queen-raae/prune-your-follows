import React from "react";
import { navigate } from "gatsby";
import { supabase } from "./supabaseClient";

import { Button } from "../common/Button";
import useUser from "./useUser";

export function LoginButton({ children, ...rest }) {
  const { data: user } = useUser();

  const handleAuth = async () => {
    const redirectTo = window.location.origin + "/app/";

    if (user) {
      navigate("app");
    } else {
      await supabase.auth.signIn(
        {
          provider: "twitter",
        },
        {
          redirectTo: redirectTo,
        }
      );
    }
  };

  return (
    <Button {...rest} onClick={handleAuth}>
      {children || "Go to app"}
    </Button>
  );
}
