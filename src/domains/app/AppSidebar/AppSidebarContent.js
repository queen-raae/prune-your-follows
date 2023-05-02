import React from "react";
import { Link } from "gatsby";
import clsx from "clsx";
import { Logo } from "../../common/Logo";
import XataLogo from "../../common/xata-colored-with-text.svg";
import { LogoutButton } from "../user";
import { useFathom } from "@raae/gatsby-plugin-fathom";

export function AppSidebarContent({ navigation, filters, user }) {
  const { trackGoal } = useFathom();
  return (
    <div className="flex min-h-full flex-col bg-green-100">
      <div className="flex h-16 flex-shrink-0 items-center border-b border-green-200 px-4">
        <Logo as={Link} to="/app" />
      </div>

      <div className="h-0 flex-1 overflow-y-auto pt-6 pr-3">
        <aside className="mb-8 ml-2 rounded-sm border-2 border-red-600 p-3">
          <h2 className="mb-2 text-sm font-semibold tracking-tight text-red-600">
            Notice
          </h2>
          <p className="my-1 text-sm">
            The new Twitter API limits has us back at the drawing board.
          </p>
          <p className="text-xs">
            You may still filter already imported follows, but syncing your
            follows on Twitter has paused and unfollow works sometimes...
          </p>
        </aside>
        <nav className="px-2">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                getProps={({ isCurrent }) => {
                  // the object returned here is passed to the
                  // anchor element's props
                  return {
                    className: clsx(
                      "flex items-center rounded-md px-2 py-2 text-sm font-medium",
                      "transition hover:bg-green-50 hover:text-green-700",
                      isCurrent ? "bg-white text-green-900" : "text-stone-600"
                    ),
                  };
                }}
                aria-current={item.current ? "page" : undefined}
              >
                <item.icon
                  className="mr-3 h-6 w-6 flex-shrink-0"
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        <nav className="px-2">
          <div className="mt-8">
            <h2 className="px-3 text-sm font-semibold tracking-tight text-green-600">
              Filters
            </h2>

            <div className="mt-2 space-y-1" role="group">
              {filters.map((filter) => (
                <Link
                  key={filter.name}
                  to={filter.path}
                  getProps={({ isCurrent }) => {
                    // the object returned here is passed to the
                    // anchor element's props
                    return {
                      className: clsx(
                        "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                        "transition hover:bg-green-50 hover:text-green-700",
                        isCurrent
                          ? "bg-green-50 text-green-900"
                          : "text-stone-600"
                      ),
                    };
                  }}
                >
                  {filter.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <aside className="px-2">
          <a
            onClick={() => trackGoal("E5XIJ5CK", 0)}
            href="https://twitter.com/raae"
            className="group mt-8 block rounded-sm px-3 text-sm font-medium text-stone-600"
          >
            Made by Queen{" "}
            <span className="font-bold group-hover:text-orange-800">@raae</span>{" "}
            <span
              role="img"
              aria-label="crown"
              className="inline-block -translate-y-px translate-x-0.5 scale-110"
            >
              👑
            </span>
          </a>
          <a
            onClick={() => trackGoal("GEVKO638", 0)}
            href="https://xata.io/"
            className="group mt-2 block rounded-sm px-3 text-sm font-medium text-stone-600"
          >
            Powered by{" "}
            <XataLogo className="inline-block h-5 w-16 -translate-y-px transition group-hover:scale-110" />
          </a>
        </aside>
      </div>
      <section className="mt-auto border-t border-green-200 px-4 py-4">
        <p className="truncate text-sm font-medium text-green-900">
          {user?.name || <>&nbsp;</>}
        </p>
        <p className="truncate text-sm text-green-700">
          {user?.username ? `@${user?.username}` : <>&nbsp;</>}
        </p>
        <LogoutButton
          onClick={() => trackGoal("E5XIJ5CK", 0)}
          className="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-green-900 px-3 py-2 text-sm font-medium text-orange-50 shadow-sm sm:px-8"
        />
      </section>
    </div>
  );
}
