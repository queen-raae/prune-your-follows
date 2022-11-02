import React from "react";

import {
  HomeIcon as HomeIcon,
  ArchiveBoxXMarkIcon as UnfollowedIcon,
  EyeSlashIcon as HiddenIcon,
} from "@heroicons/react/24/outline";
import { AppSidebarMobile } from "./AppSidebarMobile";
import { AppSidebarDesktop } from "./AppSidebarDesktop";
import { AppSidebarContent } from "./AppSidebarContent";

import { FILTERS } from "../filter/useFilter";

const navigation = [
  { name: "Home", to: "/app/", icon: HomeIcon },
  {
    name: "Unfollowed",
    to: "/app/unfollowed/",
    icon: UnfollowedIcon,
  },
  {
    name: "Hidden",
    to: "/app/hidden/",
    icon: HiddenIcon,
  },
];

export function AppSidebar({ sidebarOpen, setSidebarOpen }) {
  const content = (
    <AppSidebarContent navigation={navigation} filters={FILTERS} />
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
