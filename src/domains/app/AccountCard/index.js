import axios from "axios";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AccountCardLayout } from "./Layout";

export function AccountCard(props) {
  const queryClient = useQueryClient();

  const { mutate, isIdle } = useMutation(
    (action) => {
      return axios.post("/api/following", action);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["following"]);
      },
    }
  );

  if (!isIdle) return null;

  return (
    <AccountCardLayout
      {...props}
      onUnfollow={() => mutate({ accountId: props.id, action: "unfollow" })}
      onHide={() => mutate({ accountId: props.id, action: "hide" })}
    />
  );
}
