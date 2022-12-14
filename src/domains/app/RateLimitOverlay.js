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
        Unfortunately, there are some strict limits on the number of unfollows
        you may do in 15 minutes, and the number of unfollows Prune your Follows
        may facilitate in a day.
      </p>

      {user.email ? (
        <>
          <p className="my-3">
            Come back again in a couple of days! No worries, you'll get a
            reminder in your inbox.
          </p>
          <LogoutButton className="flex w-full items-center justify-center rounded-md border border-transparent bg-green-900 px-3 py-2 text-sm font-medium text-orange-50 shadow-sm sm:px-8" />
        </>
      ) : (
        <>
          <h4 className="mt-4 text-base font-medium leading-loose">
            Get notified!
          </h4>
          <p className="mb-3">
            Sign up to be notified when Twitter is all rested and ready to roll
            again.
          </p>
          <EmailForm />
        </>
      )}
    </Modal>
  );
}
