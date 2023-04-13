import React from "react";
import { ExclamationTriangleIcon as Icon } from "@heroicons/react/24/outline";
import { EmailForm } from "./EmailForm";

import { Modal } from "./Modal";
import { useUser } from "./user";

export function RateLimitAppOverlay({ open }) {
  const { data: user } = useUser();
  return (
    <Modal open={open} Icon={Icon} title="Twitter needs a break">
      <p>
        Twitter does not allow Prune your Follows to facilitate any more
        unfollows today. <br /> <strong>Come back in 24 hours!</strong>
      </p>

      {!user.email && (
        <>
          <h4 className="mt-4 mb-2 text-base font-medium leading-loose">
            Need a reminder to come back?
          </h4>

          <EmailForm />
        </>
      )}

      {/* {user.email ? (
        <>
          <p className="my-3">
            No worries, you'll get a reminder in your inbox tomorrow.
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
