import React, { useState } from "react";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";

import { AppSidebar } from "./AppSidebar";

export function AppLayout({ header, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <AppSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Main column */}
      <div className="flex flex-col lg:pl-64 [&>:last-child]:flex-1">
        <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 items-center border-b border-gray-200 bg-white [&>:last-child]:flex-1">
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          {header}
        </header>
        <main>{children}</main>
      </div>
    </>
  );
}
