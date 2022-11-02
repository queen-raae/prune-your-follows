import React from "react";

import { AppSidebarMobile } from "./AppSidebarMobile";
import { AppSidebarDesktop } from "./AppSidebarDesktop";
import { AppSidebarContent } from "./AppSidebarContent";

import { FOLLOWS_FILTERS, MAIN_FILTERS } from "../filter";
import { useUser } from "../user";

export function AppSidebar({ sidebarOpen, setSidebarOpen }) {
  const { data: user } = useUser();
  const content = (
    <AppSidebarContent
      navigation={MAIN_FILTERS}
      filters={FOLLOWS_FILTERS}
      user={user}
    />
  );
  return (
    <>
      <AppSidebarMobile
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      >
        {content}
      </AppSidebarMobile>
      <AppSidebarDesktop
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      >
        {content}
      </AppSidebarDesktop>
    </>
  );
}
