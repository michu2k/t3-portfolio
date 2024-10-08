"use client";

import React, {memo} from "react";
import type {LucideIcon} from "lucide-react";
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
import {useParams, usePathname} from "next/navigation";
import {signOut, useSession} from "next-auth/react";

import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/avatar";
import {Button} from "~/components/ui/button";
import {Separator} from "~/components/ui/separator";
import {Sidebar, SidebarContent, SidebarTrigger} from "~/components/ui/sidebar";
import {Skeleton} from "~/components/ui/skeleton";
import {ThemeSwitch} from "~/components/ui/theme-switch";
import {useIsMobile} from "~/hooks/use-is-mobile";
import pkg from "~/package.json";
import {getUserInitials} from "~/utils/get-user-initials";

const navigationItems: Array<NavigationItemDef> = [
  {
    id: "general",
    text: "General",
    href: "/dashboard",
    icon: LayoutDashboardIcon
  },
  {
    id: "social-media",
    text: "Social Media",
    href: "/dashboard/social-media",
    icon: HeartIcon
  },
  {
    id: "header",
    text: "Header",
    href: "/dashboard/header",
    icon: WallpaperIcon
  },
  {
    id: "about",
    text: "About",
    href: "/dashboard/about",
    icon: User2Icon
  },
  {
    id: "projects",
    text: "Projects",
    href: "/dashboard/projects",
    icon: ImageIcon
  },
  {
    id: "experience",
    text: "Experience",
    href: "/dashboard/experience",
    icon: BriefcaseIcon
  },
  {
    id: "contact",
    text: "Contact",
    href: "/dashboard/contact",
    icon: MailIcon
  }
];

const SidebarNavigation = () => {
  const isMobile = useIsMobile();

  function displayNavigationItems() {
    return navigationItems.map((item) => <NavigationItem key={item.id} {...item} />);
  }

  return (
    <Sidebar isExpandable={isMobile}>
      <SidebarTrigger className="fixed left-4 top-4 md:hidden" />

      <SidebarContent>
        <div className="flex min-w-0 items-center gap-2 px-2">
          <UserPanel />
        </div>

        <div className="flex items-center gap-2">
          <ThemeSwitch />

          <Separator orientation="vertical" />

          <Button variant="ghost" size="sm" asChild className="hover:bg-transparent hover:text-foreground">
            <Link href="/" target="_blank">
              <ExternalLinkIcon size={16} />
              Home page
            </Link>
          </Button>
        </div>

        <nav className="flex flex-grow flex-col">
          <ul className="flex flex-col gap-2 md:gap-3">{displayNavigationItems()}</ul>

          <Button
            variant="ghost"
            className="mt-auto h-11 w-full justify-start px-3 hover:bg-transparent hover:text-foreground"
            onClick={() => signOut()}>
            <LogOutIcon size={16} className="mr-1" />
            Log Out
          </Button>
        </nav>

        <span className="px-3 text-xs text-muted-foreground opacity-50">Dashboard v{pkg.version}</span>
      </SidebarContent>
    </Sidebar>
  );
};

type NavigationItemDef = {
  id: string;
  text: string;
  href: string;
  icon: LucideIcon;
};

const NavigationItem = memo(({text, href, icon: Icon}: NavigationItemDef) => {
  const pathname = usePathname();
  const params = useParams<{id: string}>();

  const isActive = params?.id ? pathname === `${href}/${params.id}` : pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={`flex items-center gap-3 rounded-md px-3 py-2.5 font-poppins text-sm font-medium leading-5 ${isActive ? "text-primary" : "text-foreground"} transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-appearance`}>
        <Icon size={16} />
        {text}
      </Link>
    </li>
  );
});

NavigationItem.displayName = "NavigationItem";

const UserPanel = () => {
  const {data: sessionData} = useSession();
  const {name, image, email} = sessionData?.user || {};

  if (sessionData?.user) {
    return (
      <>
        <Avatar>
          {image && <AvatarImage src={image} alt="" />}
          <AvatarFallback>{getUserInitials(name)}</AvatarFallback>
        </Avatar>

        <div className="min-w-0 space-y-0.5">
          <p className="truncate font-poppins text-sm font-medium text-foreground">{name}</p>
          <p className="truncate text-xs text-muted-foreground">{email}</p>
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

export {SidebarNavigation};
