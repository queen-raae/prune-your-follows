import React, { Fragment } from "react";
import clsx from "clsx";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  HomeIcon as FollowingIcon,
  ArchiveBoxXMarkIcon as UnfollowedIcon,
  EyeSlashIcon as HiddenIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { AppSidebarMobile } from "./AppSidebarMobile";
import { AppSidebarDesktop } from "./AppSidebarDesktop";
import { AppSidebarContent } from "./AppSidebarContent";

const navigation = [
  { name: "Following", href: "#", icon: FollowingIcon, current: true },
  { name: "Unfollowed", href: "#", icon: UnfollowedIcon, current: false },
  { name: "Hidden", href: "#", icon: HiddenIcon, current: false },
];

const filters = [
  { name: "Overpopular", href: "#", bgColorClass: "bg-green-500" },
  { name: "Unpopular", href: "#", bgColorClass: "bg-indigo-500" },
  { name: "Unactive", href: "#", bgColorClass: "bg-indigo-500" },
  { name: "Overactive", href: "#", bgColorClass: "bg-yellow-500" },
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
