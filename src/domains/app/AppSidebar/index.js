import React from "react";

import {
  HomeIcon as HomeIcon,
  ArchiveBoxXMarkIcon as UnfollowedIcon,
  EyeSlashIcon as HiddenIcon,
} from "@heroicons/react/24/outline";
import { AppSidebarMobile } from "./AppSidebarMobile";
import { AppSidebarDesktop } from "./AppSidebarDesktop";
import { AppSidebarContent } from "./AppSidebarContent";

const navigation = [
  { name: "Home", to: "/app/", icon: HomeIcon },
  {
    name: "Unfollowed",
    to: "/app/unfollowed/",
    icon: UnfollowedIcon,
  },
  { name: "Hidden", to: "/app/hidden/", icon: HiddenIcon },
];

const filters = [
  {
    name: "Overpopular",
    to: "/app/overpopular/",
    bgColorClass: "bg-green-500",
  },
  { name: "Unpopular", to: "/app/unpopular/", bgColorClass: "bg-indigo-500" },
  { name: "Unactive", to: "/app/unactive", bgColorClass: "bg-indigo-500" },
  { name: "Overactive", to: "/app/overactive", bgColorClass: "bg-yellow-500" },
];

export function AppSidebar({ sidebarOpen, setSidebarOpen }) {
  const content = (
    <AppSidebarContent navigation={navigation} filters={filters} />
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
