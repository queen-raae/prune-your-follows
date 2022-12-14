import React from "react";
import { ExclamationTriangleIcon as Icon } from "@heroicons/react/24/outline";

import { Modal } from "./Modal";

export function RateLimitOverlay({ open }) {
  return (
    <Modal open={open} Icon={Icon} title="Twitter needs a break">
      <div className="space-y-3">
        <p>
          Unfortunately, there are some strict limits on the number of unfollows
          you may do in 15 minutes, and the number of unfollows Prune your
          Follows may facilitate in a day.
        </p>
        <p>Come back again tomorrow!</p>
      </div>
    </Modal>
  );
}
