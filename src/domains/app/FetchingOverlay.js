import React from "react";
import { ArrowDownTrayIcon as Icon } from "@heroicons/react/20/solid";
import { LogoutButton } from "./user";

import { Modal } from "./Modal";

export function FetchingOverlay({ open }) {
  return (
    <Modal open={open} title="Importing your follows" Icon={Icon}>
      <p>
        This will take a little while...You may log out and come back later, or
        wait it out!
      </p>
      <LogoutButton
        variant="outline"
        className="mt-3 flex w-full items-center justify-center rounded-md border border-transparent bg-green-900 px-3 py-2 text-sm font-medium text-orange-50 shadow-sm sm:px-8"
      />
    </Modal>
  );
}
