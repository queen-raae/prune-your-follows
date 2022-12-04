import React from "react";
import { signOut } from "next-auth/react";

export function LogoutButton({ ...rest }) {
  const handleAuth = () => {
    const redirectTo = window.location.origin;
    signOut({ callbackUrl: redirectTo });
  };

  return (
    <button {...rest} onClick={handleAuth}>
      <span>Sign out</span>
    </button>
  );
}
