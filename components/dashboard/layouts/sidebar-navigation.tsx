"use client";

import React from "react";
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import {useParams, usePathname} from "next/navigation";
import type {LucideIcon} from "lucide-react";
import {
  LayoutDashboardIcon,
  HeartIcon,
  WallpaperIcon,
  User2Icon,
  ImageIcon,
  BriefcaseIcon,
  MailIcon,
  LogOutIcon,
  ExternalLinkIcon
} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/avatar";
import {Sidebar, SidebarContent, SidebarTrigger} from "~/components/ui/sidebar";
import {ThemeSwitch} from "~/components/ui/theme-switch";
import {Button} from "~/components/ui/button";
import {Separator} from "~/components/ui/separator";
import {getUserInitials} from "~/utils/get-user-initials";
import pkg from "~/package.json";

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
  const {data: sessionData} = useSession();
  const {name, image, email} = sessionData?.user || {};

  function displayNavigationItems() {
    return navigationItems.map((item) => <NavigationItem key={item.id} {...item} />);
  }

  return (
    <Sidebar>
      <SidebarTrigger className="fixed left-4 top-4 z-40 md:hidden" />

      <SidebarContent className="gap-6 md:gap-8">
        <div className="flex min-w-0 items-center gap-2 px-2">
          <Avatar>
            {image && <AvatarImage src={image} alt="" />}
            <AvatarFallback>{getUserInitials(name)}</AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="overflow-hidden text-ellipsis whitespace-nowrap font-poppins text-sm font-medium text-foreground">
              {name}
            </p>
            <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-muted-foreground">{email}</p>
          </div>
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
          ${isActive ? "text-primary" : "text-foreground"}
          transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2
        `}>
        <Icon size={16} />
        {text}
      </Link>
    </li>
  );
};

export {SidebarNavigation};
