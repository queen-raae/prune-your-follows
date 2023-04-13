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
import { RateLimitUnknownOverlay } from "./app/RateLimitUnknownOverlay";
import { RateLimitAppOverlay } from "./app/RateLimitAppOverlay";
import { RateLimitUserOverlay } from "./app/RateLimitUserOverlay";

const RATE_LIMIT_TYPE = {
  UNKNOWN: "Unknown rate limit reached",
  APP: "App rate limit is reached",
  USER: "User rate limit is reached",
};

const Root = ({ children }) => {
  const [rateLimitReachedType, setRateLimitReachedType] = useState(null);

  const queryClient = new QueryClient({
    mutationCache: new MutationCache({
      onError: (error) => {
        if (error.response?.status === 429) {
          switch (error.response?.data?.code) {
            case "RateLimitApp":
              setRateLimitReachedType(RATE_LIMIT_TYPE.APP);
              break;
            case "RateLimitUser":
              setRateLimitReachedType(RATE_LIMIT_TYPE.USER);
              break;

            default:
              setRateLimitReachedType(RATE_LIMIT_TYPE.UNKNOWN);
              break;
          }
        }
      },
    }),
  });

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <RateLimitUnknownOverlay
          open={rateLimitReachedType === RATE_LIMIT_TYPE.UNKNOWN}
        />
        <RateLimitAppOverlay
          open={rateLimitReachedType === RATE_LIMIT_TYPE.APP}
        />
        <RateLimitUserOverlay
          open={rateLimitReachedType === RATE_LIMIT_TYPE.USER}
        />
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Root;
