import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { supabase } from "./app/supabaseClient";
import { SessionProvider } from "next-auth/react";

import "focus-visible";
import "./global.css";

const queryClient = new QueryClient();

const Root = ({ children }) => {
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      // console.log(event, session);
      queryClient.invalidateQueries("user");
    });
  }, []);

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children} <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Root;
