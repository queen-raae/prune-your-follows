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

  const disabled = !props.id;

  return (
    <AccountCardLayout
      {...props}
      actions={[
        {
          label: "Hide",
          onClick: () => mutate({ accountId: props.id, action: "hide" }),
          disabled: disabled,
        },
        {
          label: "Unfollow",
          onClick: () => mutate({ accountId: props.id, action: "unfollow" }),
          disabled: disabled,
        },
      ]}
    />
  );
}
