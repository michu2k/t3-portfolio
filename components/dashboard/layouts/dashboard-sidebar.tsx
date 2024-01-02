"use client";

import React from "react";
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import {useParams, usePathname} from "next/navigation";
import type {LucideIcon} from "lucide-react";
import {
  SettingsIcon,
  ImageIcon,
  MailIcon,
  BriefcaseIcon,
  LogOutIcon,
  HeartIcon,
  User2Icon,
  WallpaperIcon
} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/avatar";
import {Sidebar, SidebarContent, SidebarTrigger} from "~/components/ui/sidebar";
import {Button} from "~/components/ui/button";
import {getUserInitials} from "~/utils/get-user-initials";

const navigationItems: Array<NavigationItemDef> = [
  {
    text: "General",
    href: "/dashboard",
    icon: SettingsIcon
  },
  {
    text: "Social Media",
    href: "/dashboard/social-media",
    icon: HeartIcon
  },
  {
    text: "Header",
    href: "/dashboard/header",
    icon: WallpaperIcon
  },
  {
    text: "About",
    href: "/dashboard/about",
    icon: User2Icon
  },
  {
    text: "Projects",
    href: "/dashboard/projects",
    icon: ImageIcon
  },
  {
    text: "Experience",
    href: "/dashboard/experience",
    icon: BriefcaseIcon
  },
  {
    text: "Contact",
    href: "/dashboard/contact",
    icon: MailIcon
  }
];

const DashboardSidebar = () => {
  const {data: sessionData} = useSession();
  const {name, image, email} = sessionData?.user || {};

  function displayNavigationItems() {
    return navigationItems.map(({href, ...item}) => <NavigationItem key={href} href={href} {...item} />);
  }

  return (
    <Sidebar>
      <SidebarTrigger className="fixed left-4 top-4 z-40 md:hidden" />

      <SidebarContent className="gap-10">
        <div className="flex min-w-0 items-center gap-2 px-2">
          <Avatar>
            {image && <AvatarImage src={image} alt="" />}
            <AvatarFallback>{getUserInitials(name)}</AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="overflow-hidden text-ellipsis whitespace-nowrap font-poppins text-sm font-medium text-slate-700">
              {name}
            </p>
            <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs">{email}</p>
          </div>
        </div>

        <nav className="flex flex-grow flex-col">
          <ul className="flex flex-col gap-3">{displayNavigationItems()}</ul>

          <Button
            variant="ghost"
            className="mb-4 mt-auto h-11 w-full justify-start hover:bg-transparent hover:text-slate-900"
            onClick={() => signOut()}>
            <LogOutIcon size={16} className="mr-2" />
            Log Out
          </Button>
        </nav>
      </SidebarContent>
    </Sidebar>
  );
};

type NavigationItemDef = {
  text: string;
  icon: LucideIcon;
  href: string;
};

const NavigationItem = ({text, href, icon: Icon}: NavigationItemDef) => {
  const pathname = usePathname();
  const params = useParams<{id: string}>();

  const isActive = params?.id ? pathname === `${href}/${params.id}` : pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={`
          flex items-center gap-3 rounded-lg px-3 py-2.5 font-poppins text-sm font-medium leading-5
          ${isActive ? "text-primary" : "text-slate-700"}
          transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2
        `}>
        <Icon size={16} />
        {text}
      </Link>
    </li>
  );
};

export {DashboardSidebar};
