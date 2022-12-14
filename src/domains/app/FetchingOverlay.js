import React from "react";
import { ArrowDownTrayIcon as Icon } from "@heroicons/react/20/solid";
import { LogoutButton, useUser } from "./user";

import { Modal } from "./Modal";
import { EmailForm } from "./EmailForm";

export function FetchingOverlay({ open }) {
  const { data: user } = useUser();
  return (
    <Modal open={open} title="Importing your follows" Icon={Icon}>
      <div className="space-y-4">
        {user.email ? (
          <>
            <p className="mb-3">
              The import will take some time...You may log out and come back
              later, or wait it out!
            </p>
            <LogoutButton className="flex w-full items-center justify-center rounded-md border border-transparent bg-green-900 px-3 py-2 text-sm font-medium text-orange-50 shadow-sm sm:px-8" />
          </>
        ) : (
          <>
            <p className="mb-3">
              The import will take some time... While you wait maybe sign up for
              news and product updates?
            </p>
            <EmailForm />
          </>
        )}
      </div>
    </Modal>
  );
}
