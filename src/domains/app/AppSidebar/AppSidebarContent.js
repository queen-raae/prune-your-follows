import React from "react";
import { Link } from "gatsby";
import clsx from "clsx";
import { Logo } from "../../common/Logo";

export function AppSidebarContent({ navigation, filters }) {
  return (
    <div className="flex min-h-full flex-col bg-gray-100 pt-5 pb-4 pr-5">
      <div className="flex flex-shrink-0 items-center px-4">
        <Logo as={Link} to="/app" />
      </div>
      <div className="mt-5 h-0 flex-1 overflow-y-auto">
        <nav className="px-2">
          <div className="space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={clsx(
                  item.current
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                  "group flex items-center rounded-md px-2 py-2 text-sm font-medium"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                <item.icon
                  className={clsx(
                    item.current
                      ? "text-gray-500"
                      : "text-gray-400 group-hover:text-gray-500",
                    "mr-3 h-6 w-6 flex-shrink-0"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </a>
            ))}
          </div>
          <div className="mt-8">
            <h3
              className="px-3 text-sm font-medium text-gray-500"
              id="mobile-teams-headline"
            >
              Filters
            </h3>
            <div
              className="mt-1 space-y-1"
              role="group"
              aria-labelledby="mobile-teams-headline"
            >
              {filters.map((team) => (
                <a
                  key={team.name}
                  href={team.href}
                  className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span
                    className={clsx(
                      team.bgColorClass,
                      "mr-4 h-2.5 w-2.5 rounded-full"
                    )}
                    aria-hidden="true"
                  />
                  <span className="truncate">{team.name}</span>
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
