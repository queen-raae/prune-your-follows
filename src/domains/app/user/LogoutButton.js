import React from "react";
import { signOut } from "next-auth/react";

import { Button } from "../../common/Button";

export function LogoutButton({ ...rest }) {
  const handleAuth = () => {
    const redirectTo = window.location.origin;
    signOut({ callbackUrl: redirectTo });
  };

  return (
    <Button {...rest} onClick={handleAuth}>
      <span>Sign out</span>
    </Button>
  );
}
