import React from "react";

export function AppSidebarDesktop({ children }) {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:block lg:w-64 lg:border-r lg:border-green-200">
      {children}
    </div>
  );
}
