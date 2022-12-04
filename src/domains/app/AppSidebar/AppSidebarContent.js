import React from "react";
import { Link } from "gatsby";
import clsx from "clsx";
import { Logo } from "../../common/Logo";
import XataLogo from "../../common/xata-colored-with-text.svg";
import { LogoutButton } from "../user";

export function AppSidebarContent({ navigation, filters, user }) {
  return (
    <div className="flex min-h-full flex-col bg-gray-100">
      <div className="flex h-16 flex-shrink-0 items-center border-b px-4">
        <Logo as={Link} to="/app" />
      </div>

      <div className="mt-6 h-0 flex-1 overflow-y-auto pr-3">
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
                      isCurrent
                        ? "bg-gray-200 text-gray-900 [&>:first-child]:text-gray-500"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 [&>:first-child]:text-gray-400 [&>:first-child]hover:text-gray-500",
                      "flex items-center rounded-md px-2 py-2 text-sm font-medium"
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
            <h3
              className="px-3 text-sm font-medium text-gray-500"
              id="mobile-teams-headline"
            >
              Filters
            </h3>
            <div
              className="mt-2 space-y-1"
              role="group"
              aria-labelledby="mobile-teams-headline"
            >
              {filters.map((filter) => (
                <Link
                  key={filter.name}
                  to={filter.path}
                  getProps={({ isCurrent }) => {
                    // the object returned here is passed to the
                    // anchor element's props
                    return {
                      className: clsx(
                        isCurrent
                          ? "bg-gray-200 text-gray-900"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                        "flex px-3 items-center rounded-md px-2 py-2 text-sm font-medium truncate"
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
        <section className="px-2">
          <a
            href="https://xata.io"
            target="_blank"
            rel="noreferrer"
            className="group mt-8 block px-3 text-sm font-medium text-gray-500"
          >
            Powered by{" "}
            <XataLogo className="mt-3 h-10 w-1/2 transition group-hover:scale-110" />
          </a>
        </section>
      </div>
      <section className="mt-auto border-t px-4 py-4">
        <p className="truncate text-sm font-medium text-gray-900">
          {user?.name || "&nbsp"}
        </p>
        <p className="truncate text-sm text-gray-500">
          {user?.username ? `@${user?.username}` : "&nbsp"}
        </p>
        <LogoutButton className="mt-2 w-full" />
      </section>
    </div>
  );
}
