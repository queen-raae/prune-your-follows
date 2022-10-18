import React from "react";
import { navigate } from "gatsby";
import { signIn, useSession } from "next-auth/react";

import { Button } from "../common/Button";

export function LoginButton({ children, ...rest }) {
  const { data: session } = useSession();

  console.log(session);

  const handleAuth = () => {
    const redirectTo = window.location.origin + "/app/";

    if (session?.user) {
      navigate("app");
    } else {
      signIn("twitter", { callbackUrl: redirectTo });
    }
  };

  return (
    <Button {...rest} onClick={handleAuth}>
      {children || "Go to app"}
    </Button>
  );
}
