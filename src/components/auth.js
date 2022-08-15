import React from "react";
import { supabase } from "../utils/supabaseClient";

import useUser from "../hooks/useUser";
import { Button } from "@mui/joy";

const Auth = ({ sx, ...rest }) => {
  const { data: user } = useUser();

  const handleAuth = async () => {
    if (user) {
      await supabase.auth.signOut();
    } else {
      await supabase.auth.signInWithOAuth(
        {
          provider: "twitter",
        },
        {
          redirectTo: window.location.origin,
        }
      );
    }
  };

  const buttonText = user ? "Sign out" : "Sign in with Twitter";

  return (
    <Button
      variant="soft"
      size="md"
      {...rest}
      sx={{ ...sx }}
      onClick={handleAuth}
    >
      {buttonText}
    </Button>
  );
};

export default Auth;
