import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { supabase } from "../data/supabaseClient";

import "focus-visible";
import "./root.css";

const queryClient = new QueryClient();

const Root = ({ children }) => {
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      // console.log(event, session);
      queryClient.invalidateQueries("user");
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children} <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Root;
