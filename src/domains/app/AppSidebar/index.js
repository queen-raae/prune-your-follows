import React from "react";

import { AppSidebarMobile } from "./AppSidebarMobile";
import { AppSidebarDesktop } from "./AppSidebarDesktop";
import { AppSidebarContent } from "./AppSidebarContent";

import { useUser } from "../user";
import { FOLLOWS_FILTERS, MAIN_FILTERS } from "../filter";
import { EXPORT_NAV_ITEM } from "../export";

export function AppSidebar({ sidebarOpen, setSidebarOpen }) {
  const { data: user } = useUser();
  const content = (
    <AppSidebarContent
      navigation={[...MAIN_FILTERS, EXPORT_NAV_ITEM]}
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
