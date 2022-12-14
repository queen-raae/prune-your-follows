import React, { useState } from "react";
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";

import "focus-visible";
import "./global.css";
import { RateLimitOverlay } from "./app/RateLimitOverlay";

const Root = ({ children }) => {
  const [isRateLimitted, setIsRateLimitted] = useState(false);

  const queryClient = new QueryClient({
    mutationCache: new MutationCache({
      onError: (error) => {
        if (error.response?.status === 429) {
          setIsRateLimitted(true);
        }
      },
    }),
  });

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <RateLimitOverlay open={isRateLimitted} />
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Root;
