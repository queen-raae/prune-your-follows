import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { supabase } from "../utils/supabaseClient";
import { CssVarsProvider } from "@mui/joy/styles";

const queryClient = new QueryClient();

const Root = ({ children }) => {
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      queryClient.invalidateQueries("user");
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CssVarsProvider>
        {children} <ReactQueryDevtools initialIsOpen={true} />
      </CssVarsProvider>
    </QueryClientProvider>
  );
};

export default Root;
