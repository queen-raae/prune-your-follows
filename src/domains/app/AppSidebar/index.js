import React from "react";

import {
  HomeIcon,
  ArchiveBoxXMarkIcon as UnfollowedIcon,
  EyeSlashIcon as HiddenIcon,
} from "@heroicons/react/24/outline";
import { AppSidebarMobile } from "./AppSidebarMobile";
import { AppSidebarDesktop } from "./AppSidebarDesktop";
import { AppSidebarContent } from "./AppSidebarContent";

import { FILTERS } from "../filter/useFilter";
import { useUser } from "../user";

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
  const { data: user } = useUser();
  const content = (
    <AppSidebarContent navigation={navigation} filters={FILTERS} user={user} />
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
