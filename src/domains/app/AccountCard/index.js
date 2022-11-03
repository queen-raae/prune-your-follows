import axios from "axios";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AccountCardLayout } from "./Layout";

export function AccountCard(props) {
  const queryClient = useQueryClient();

  const { mutate, isIdle } = useMutation(
    (action) => {
      return axios.post("/api/accounts", action);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["accounts"]);
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
          label: "Keep",
          onClick: () => mutate({ accountId: props.accountId, action: "hide" }),
          disabled: disabled,
        },
        {
          label: "Unfollow",
          onClick: () =>
            mutate({ accountId: props.accountId, action: "unfollow" }),
          disabled: disabled,
        },
      ]}
    />
  );
}
