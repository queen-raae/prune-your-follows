import React from "react";
import { ExclamationTriangleIcon as Icon } from "@heroicons/react/24/outline";
import { EmailForm } from "./EmailForm";

import { Modal } from "./Modal";
import { LogoutButton, useUser } from "./user";

export function RateLimitUserOverlay({ open }) {
  const { data: user } = useUser();
  return (
    <Modal open={open} Icon={Icon} title="Twitter needs a break">
      <p>
        Twitter does not allow you to unfollow more than 50 users in 15 minutes.
        <br />
        <strong>Come back in a couple of minutes!</strong>
      </p>

      <h4 className="mt-4 mb-2 text-base font-medium leading-loose">
        Need a reminder to come back?
      </h4>

      <EmailForm />

      {/* {user.email ? (
        <>
          <p className="my-3">
            You'll get a reminder tomorrow if we don't see you back here before
            then...
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
      )} */}
    </Modal>
  );
}
