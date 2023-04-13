import React from "react";
import { ExclamationTriangleIcon as Icon } from "@heroicons/react/24/outline";
import { EmailForm } from "./EmailForm";

import { Modal } from "./Modal";
import { useUser } from "./user";

export function RateLimitUnknownOverlay({ open }) {
  const { data: user } = useUser();
  return (
    <Modal open={open} Icon={Icon} title="Twitter needs a break">
      <p>
        Prune your Follows is rate limitted for some unknown reason, come back
        back later and try again!
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
          <p className="my-3">You'll get a reminder in your inbox.</p>
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
