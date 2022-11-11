import axios from "axios";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AccountCardLayout } from "./Layout";
import { useUser } from "../user";

export function AccountCard(props) {
  const queryClient = useQueryClient();
  const { data: user } = useUser();
  const { accountId, unfollowed, hidden, last } = props;

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
  const actions = [];
  const messages = [];

  if (hidden) {
    actions.push({
      label: "Unkeep",
      onClick: () => mutate({ accountId: accountId, action: "unhide" }),
      disabled: disabled,
    });
  } else if (unfollowed || user.lastImport > last) {
    actions.push({
      label: "Follow",
      onClick: () => mutate({ accountId: accountId, action: "follow" }),
      disabled: disabled,
    });
  } else {
    actions.push({
      label: "Keep",
      onClick: () => mutate({ accountId: accountId, action: "hide" }),
      disabled: disabled,
    });
    actions.push({
      label: "Unfollow",
      onClick: () => mutate({ accountId: accountId, action: "unfollow" }),
      disabled: disabled,
    });
  }

  if (unfollowed) {
    messages.push({ type: "info", text: "Unfollowed from app" });
  }

  return <AccountCardLayout {...props} actions={actions} messages={messages} />;
}
