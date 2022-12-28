import React from "react";
import { ExclamationTriangleIcon as Icon } from "@heroicons/react/24/outline";
import { EmailForm } from "./EmailForm";

import { Modal } from "./Modal";
import { LogoutButton, useUser } from "./user";

export function RateLimitOverlay({ open }) {
  const { data: user } = useUser();
  return (
    <Modal open={open} Icon={Icon} title="Twitter needs a break">
      {/* <p>
        Look at you pruning to your heart's content. Twitter only allows 50
        unfollows in 15 minutes, though 😬 Wait a couple of minutes and try
        again.
      </p> */}

      <p>
        Twitter does not allow PYF to facilitate any more unfollows today. Such
        is the price of getting featured in Tech Crunch 😬 🤩
      </p>
      <p className="mt-1">
        Come back in 24 hours, and you should be able to unfollow 50 accounts
        per 15 minutes!
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
