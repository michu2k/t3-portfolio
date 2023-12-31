import React from "react";
import Link from "next/link";
import {signOut} from "next-auth/react";
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
import {Button} from "~/components/ui/Button";
import {usePathname} from "next/navigation";

const navigationItems: Array<NavigationItemDef> = [
  {
    text: "General",
    href: "/dashboard",
    icon: SettingsIcon
  },
  {
    text: "Social Media",
    href: "/dashboard/social-media", //["/dashboard/social-media", "/dashboard/social-media/[id]"],
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
    href: "/dashboard/projects", //["/dashboard/projects", "/dashboard/projects/[id]"],
    icon: ImageIcon
  },
  {
    text: "Experience",
    href: "/dashboard/experience", //["/dashboard/experience", "/dashboard/experience/[id]"],
    icon: BriefcaseIcon
  },
  {
    text: "Contact",
    href: "/dashboard/contact", //["/dashboard/contact", "/dashboard/contact/[id]"],
    icon: MailIcon
  }
];

const SidebarNavigation = () => {
  const pathname = usePathname();

  function displayNavigationItems() {
    return navigationItems.map(({href, ...item}) => {
      const mainHref = Array.isArray(href) ? (href[0] as string) : href;
      const isActive = Array.isArray(href) ? !!href.find((href) => href === pathname) : href === pathname;

      return <NavigationItem key={mainHref} isActive={isActive} href={href} {...item} />;
    });
  }

  return (
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
  );
};

type NavigationItemDef = {
  text: string;
  icon: LucideIcon;
  href: string | Array<string>;
};

type NavigationItemProps = NavigationItemDef & {
  isActive: boolean;
};

const NavigationItem = ({text, href, icon: Icon, isActive}: NavigationItemProps) => {
  const url = Array.isArray(href) ? (href[0] as string) : href;

  return (
    <li>
      <Link
        href={url}
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

export {SidebarNavigation};