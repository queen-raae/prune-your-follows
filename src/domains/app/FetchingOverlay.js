import React from "react";
import { Dialog } from "@headlessui/react";
import { ArrowDownTrayIcon as Icon } from "@heroicons/react/20/solid";
import { LogoutButton } from "./user";

import { Modal } from "./Modal";

export function FetchingOverlay({ open }) {
  return (
    <Modal open={open}>
      <div>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <Icon className="h-6 w-6 text-green-600" aria-hidden="true" />
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-stone-900"
          >
            Importing your follows
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-stone-500">
              This will take a little while...You may log out and come back
              later, or wait it out!
            </p>
            <LogoutButton
              variant="outline"
              className="mt-3 flex w-full items-center justify-center rounded-md border border-transparent bg-green-900 px-3 py-2 text-sm font-medium text-orange-50 shadow-sm sm:px-8"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
