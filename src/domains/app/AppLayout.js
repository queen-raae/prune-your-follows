import React, { useState } from "react";
import { Link } from "gatsby";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";

import { AppSidebar } from "./AppSidebar";
import { Logo } from "../common/Logo";
import { useUser } from "./user";
import { FetchingOverlay } from "./FetchingOverlay";

export function AppLayout({ header, children }) {
  const { data: user } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <FetchingOverlay open={user.initializing} />
      <AppSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Main column */}
      <div className="flex flex-col lg:pl-64">
        <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 items-center border-b border-gray-200 bg-white px-4 lg:px-8">
          <Logo as={Link} to="/app" className="pr-4 lg:hidden" variant="mark" />
          {header}
          <button
            type="button"
            className="ml-auto border-l border-gray-200 pl-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </header>
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </>
  );
}
