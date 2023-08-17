import React from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {signOut} from "next-auth/react";
import type {LucideIcon} from "lucide-react";
import {Settings, Info, Laptop2, Image, Mail, Briefcase, LogOut} from "lucide-react";
import {Button} from "~/components/ui/Button";

const sidebarItems: Array<SidebarMenuItemDef> = [
  {
    text: "General",
    href: "/dashboard",
    icon: Settings
  },
  {
    text: "Header",
    href: "/dashboard/header",
    icon: Laptop2
  },
  {
    text: "About",
    href: "/dashboard/about",
    icon: Info
  },
  {
    text: "Portfolio",
    href: [
      "/dashboard/portfolio",
      "/dashboard/portfolio/[id]"
    ],
    icon: Image
  },
  {
    text: "Experience",
    href: [
      "/dashboard/experience",
      "/dashboard/experience/[id]"
    ],
    icon: Briefcase
  },
  {
    text: "Contact",
    href: "/dashboard/contact",
    icon: Mail
  }
];

const SidebarMenu = () => {
  const {pathname} = useRouter();

  function displaySidebarItems() {
    return sidebarItems.map(({href, ...item}) => {
      const mainHref = Array.isArray(href) ? href[0] as string : href;

      const isActive = Array.isArray(href)
        ? !!href.find((href) => href === pathname)
        : (href === pathname);

      return <SidebarMenuItem key={mainHref} isActive={isActive} href={href} {...item} />;
    });
  }

  return (
    <nav className="flex flex-col flex-grow">
      <ul className="flex md:flex-col flex-wrap gap-x-4 gap-y-1 md:gap-y-3">
        {displaySidebarItems()}
      </ul>

      <Button
        variant="ghost"
        className="h-11 w-full justify-start mt-8 md:mt-auto"
        onClick={() => void signOut()}>
        <LogOut size={16} className="mr-2" /> Log Out
      </Button>
    </nav>
  );
};

type SidebarMenuItemDef = {
  text: string;
  icon: LucideIcon;
  href: string | Array<string>;
}

type SidebarMenuItemProps = SidebarMenuItemDef & {
  isActive: boolean;
}

const SidebarMenuItem = ({text, href, icon: Icon, isActive}: SidebarMenuItemProps) => {
  const url = Array.isArray(href) ? href[0] as string : href;

  return (
    <li>
      <Link
        href={url}
        className={`
          font-medium leading-5 text-sm
          py-3 px-4
          flex items-center gap-3
          rounded-lg
          ${isActive ? "bg-slate-100 text-primary" : "text-slate-700"}
          hover:text-primary
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2
          transition-colors
        `}>
        <Icon size={16} />
        {text}
      </Link>
    </li>
  );
};

export {SidebarMenu};