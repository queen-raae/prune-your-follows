import React from "react";
import { ExclamationTriangleIcon as Icon } from "@heroicons/react/24/outline";
import { EmailForm } from "./EmailForm";

import { Modal } from "./Modal";
import { LogoutButton, useUser } from "./user";

export function RateLimitOverlay({ open }) {
  const { data: user } = useUser();
  return (
    <Modal open={open} Icon={Icon} title="Twitter needs a break">
      <p>
        Wow, thank you for the love! Today's success has pushed us over the
        limit of the number of unfollows PYF's is allowed to facilitate{" "}
        <strong>across</strong> all users. Come back tomorrow, and you should be
        able to unfollow 50 accounts per 15 minutes!
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
          <h4 className="mt-4 text-base font-medium leading-loose">
            Need a reminder?
          </h4>
          <p className="mb-3">
            Sign up for a reminder to come back when PYF is not such hot news.
          </p>
          <EmailForm />
        </>
      )}
    </Modal>
  );
}
