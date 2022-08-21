import React from "react";
import { navigate } from "gatsby";
import { supabase } from "./supabaseClient";

import { Button } from "../common/Button";

export function LogoutButton({ ...rest }) {
  const handleAuth = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <Button {...rest} onClick={handleAuth}>
      <span>Sign out</span>
    </Button>
  );
}
