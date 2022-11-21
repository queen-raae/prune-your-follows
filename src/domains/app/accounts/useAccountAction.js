import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "../user";

export const EXPORT_TYPES = ["CSV", "JSON"];

export default function useAccountAction(props) {
  const { accountId, unfollowed, hidden, last } = props;

  const queryClient = useQueryClient();
  const { data: user } = useUser();

  const { mutate: handleAccountAction, ...rest } = useMutation({
    mutationFn: (action) => {
      return axios.post("/api/accounts", { action, accountId });
    },
    onSettled: () => {
      queryClient.invalidateQueries(["accounts"]);
    },
  });

  const actions = [];
  const disabled = !accountId;

  if (hidden) {
    actions.push({
      label: "Unkeep",
      onClick: () => handleAccountAction("unhide"),
      disabled: disabled,
    });
  } else if (unfollowed || user.lastImport > last) {
    actions.push({
      label: "Follow",
      onClick: () => handleAccountAction("follow"),
      disabled: disabled,
    });
  } else {
    actions.push({
      label: "Keep",
      onClick: () => handleAccountAction("hide"),
      disabled: disabled,
    });
    actions.push({
      label: "Unfollow",
      onClick: () => handleAccountAction("unfollow"),
      disabled: disabled,
    });
  }

  return { handleAccountAction, ...rest, actions };
}
