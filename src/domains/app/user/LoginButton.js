import React from "react";
import { navigate } from "gatsby";
import { signIn, useSession } from "next-auth/react";

export function LoginButton({ children, ...rest }) {
  const { data: session } = useSession();

  const handleAuth = () => {
    const redirectTo = window.location.origin + "/app/";

    if (session?.user) {
      navigate("app");
    } else {
      signIn("twitter", { callbackUrl: redirectTo });
    }
  };

  return (
    <button {...rest} onClick={handleAuth}>
      {children || "Go to app"}
    </button>
  );
}
