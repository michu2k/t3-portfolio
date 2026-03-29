"use client";

import React from "react";
import type { LucideIcon } from "lucide-react";
import {
  BriefcaseIcon,
  ExternalLinkIcon,
  HeartIcon,
  ImageIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MailIcon,
  User2Icon,
  WallpaperIcon
} from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Sidebar, SidebarContent, SidebarTrigger } from "~/components/ui/sidebar";
import { Skeleton } from "~/components/ui/skeleton";
import { ThemeSwitch } from "~/components/ui/theme-switch";
import { useIsMobile } from "~/hooks/use-is-mobile";
import pkg from "~/package.json";
import { dashboardPaths } from "~/utils/dashboard.config";
import { getUserInitials } from "~/utils/get-user-initials";

const navigationItems: Array<NavigationItemDef> = [
  {
    text: "General",
    href: dashboardPaths.general,
    icon: LayoutDashboardIcon
  },
  {
    text: "Social Media",
    href: dashboardPaths.socialMedia,
    icon: HeartIcon
  },
  {
    text: "Header",
    href: dashboardPaths.header,
    icon: WallpaperIcon
  },
  {
    text: "About",
    href: dashboardPaths.about,
    icon: User2Icon
  },
  {
    text: "Projects",
    href: dashboardPaths.projects,
    icon: ImageIcon
  },
  {
    text: "Experience",
    href: dashboardPaths.experience,
    icon: BriefcaseIcon
  },
  {
    text: "Contact",
    href: dashboardPaths.contact,
    icon: MailIcon
  }
];

export const SidebarNavigation = () => {
  const isMobile = useIsMobile();

  function displayNavigationItems() {
    return navigationItems.map((item) => <NavigationItem key={item.text} {...item} />);
  }

  return (
    <Sidebar isExpandable={isMobile}>
      <SidebarTrigger className="fixed top-4 left-4 md:hidden" />

      <SidebarContent>
        <div className="flex min-w-0 items-center gap-2 px-2">
          <UserPanel />
        </div>

        <div className="flex items-center gap-2">
          <ThemeSwitch />

          <Separator orientation="vertical" />

          <Button variant="ghost" size="sm" asChild className="hover:text-foreground hover:bg-transparent">
            <Link href="/" target="_blank">
              <ExternalLinkIcon size={16} />
              Home page
            </Link>
          </Button>
        </div>

        <nav className="flex grow flex-col">
          <ul className="flex flex-col gap-3">{displayNavigationItems()}</ul>

          <Button
            variant="ghost"
            className="hover:text-foreground mt-auto h-11 w-full justify-start px-3 hover:bg-transparent"
            onClick={() => signOut()}>
            <LogOutIcon size={16} className="mr-1" />
            Log Out
          </Button>
        </nav>

        <span className="text-muted-foreground px-3 text-xs opacity-50">Dashboard v{pkg.version}</span>
      </SidebarContent>
    </Sidebar>
  );
};

type NavigationItemDef = {
  text: string;
  href: string;
  icon: LucideIcon;
};

const NavigationItem = ({ text, href, icon: Icon }: NavigationItemDef) => {
  const pathname = usePathname();
  const params = useParams<{ id: string }>();

  const isActive = params?.id ? pathname === `${href}/${params.id}` : pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={`font-poppins flex items-center gap-3 rounded-md px-3 py-2 text-sm leading-5 font-medium ${isActive ? "text-primary" : "text-foreground"} hover:text-primary focus-visible:ring-appearance transition-colors focus-visible:ring-2 focus-visible:outline-none`}>
        <Icon size={16} />
        {text}
      </Link>
    </li>
  );
};

const UserPanel = () => {
  const { data: sessionData } = useSession();
  const { name, image, email } = sessionData?.user || {};

  if (sessionData?.user) {
    return (
      <>
        <Avatar>
          {image && <AvatarImage src={image} alt="" />}
          <AvatarFallback>{getUserInitials(name)}</AvatarFallback>
        </Avatar>

        <div className="min-w-0 space-y-0.5">
          <p className="font-poppins text-foreground truncate text-sm font-medium">{name}</p>
          <p className="text-muted-foreground truncate text-xs">{email}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Skeleton className="size-10 rounded-full" />

      <div className="min-w-0 space-y-2.5">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-3 w-36" />
      </div>
    </>
  );
};
