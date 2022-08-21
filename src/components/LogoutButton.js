import React from "react";
import { navigate } from "gatsby";
import { supabase } from "../utils/supabaseClient";

import { Button } from "./Button";

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
