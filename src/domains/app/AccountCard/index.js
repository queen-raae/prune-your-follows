import axios from "axios";
import React from "react";
import { useMutation } from "@tanstack/react-query";

import { AccountCardLayout } from "./Layout";

export function AccountCard(props) {
  const { mutate, status } = useMutation((data) => {
    return axios.post("/api/following", data);
  });

  const handleUnfollow = async () => {
    mutate({ accountId: props.id });
  };

  return (
    <AccountCardLayout {...props} status={status} onUnfollow={handleUnfollow} />
  );
}
