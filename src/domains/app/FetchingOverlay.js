import React from "react";
import { WrenchScrewdriverIcon as Icon } from "@heroicons/react/20/solid";
import { useFathom } from "@raae/gatsby-plugin-fathom";

import { useUser } from "./user";

import { Modal } from "./Modal";
import { EmailForm } from "./EmailForm";

export function FetchingOverlay({ open }) {
  const { data: user } = useUser();
  const { trackGoal } = useFathom();
  return (
    <Modal open={open} Icon={Icon} title="Work in Progress">
      <p className="mb-3">
        The new Twitter API limits has us back at the drawing board. Follow{" "}
        <a
          onClick={() => trackGoal("E5XIJ5CK", 0)}
          href="https://twitter.com/raae"
          className="group mt-8"
        >
          Queen{" "}
          <span className="font-bold underline group-hover:text-orange-800 group-hover:no-underline">
            @raae
          </span>{" "}
          on Twitter{" "}
        </a>
        {!user.email && <>, or sign up below,</>}
        for a closer look at the process.
      </p>

      {!user.email && (
        <>
          <EmailForm />
        </>
      )}
    </Modal>
  );
}
