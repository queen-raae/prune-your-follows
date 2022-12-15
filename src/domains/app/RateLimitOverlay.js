import React from "react";
import { ExclamationTriangleIcon as Icon } from "@heroicons/react/24/outline";
import { EmailForm } from "./EmailForm";

import { Modal } from "./Modal";
import { LogoutButton, useUser } from "./user";

export function RateLimitOverlay({ open }) {
  const { data: user } = useUser();
  return (
    <Modal open={open} Icon={Icon} title="Wow, thank you for the love! ">
      <p>
        Today's success has capped PYF's Twitter access{" "}
        <strong>across all users</strong>.
      </p>
      <p className="mt-1">
        Come back tomorrow, and you should be able to unfollow 50 accounts per
        15 minutes!
      </p>

      {user.email ? (
        <>
          <p className="my-3">
            No worries, you'll get a reminder in your inbox.
          </p>
          <LogoutButton className="flex w-full items-center justify-center rounded-md border border-transparent bg-green-900 px-3 py-2 text-sm font-medium text-orange-50 shadow-sm sm:px-8" />
        </>
      ) : (
        <>
          <h4 className="mt-4 mb-2 text-base font-medium leading-loose">
            Need a reminder to come back?
          </h4>

          <EmailForm />
        </>
      )}
    </Modal>
  );
}
