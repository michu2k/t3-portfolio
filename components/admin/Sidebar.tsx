import React from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import type {LucideIcon} from "lucide-react";
import {Settings, Info, Laptop2, Image, Mail, Briefcase} from "lucide-react";

const sidebarItems: Array<SidebarItemDef> = [
  {
    text: "General",
    href: "/admin",
    icon: Settings
  },
  {
    text: "Header",
    href: "/admin/header",
    icon: Laptop2
  },
  {
    text: "About",
    href: "/admin/about",
    icon: Info
  },
  {
    text: "Portfolio",
    href: [
      "/admin/portfolio",
      "/admin/portfolio/[id]"
    ],
    icon: Image
  },
  {
    text: "Experience",
    href: [
      "/admin/experience",
      "/admin/experience/[id]"
    ],
    icon: Briefcase
  },
  {
    text: "Contact",
    href: "/admin/contact",
    icon: Mail
  }
];

const Sidebar = () => {
  const {pathname} = useRouter();

  function displaySidebarItems() {
    return sidebarItems.map(({href, ...item}) => {
      const mainHref = Array.isArray(href) ? href[0] as string : href;

      const isActive = Array.isArray(href)
        ? !!href.find((href) => href === pathname)
        : (href === pathname);

      return <SidebarItem key={mainHref} isActive={isActive} href={href} {...item} />;
    });
  }

  return (
    <nav className="md:sticky md:top-10">
      <ul className="flex md:flex-col flex-wrap gap-x-4 gap-y-1 md:gap-y-3">
        {displaySidebarItems()}
      </ul>
    </nav>
  );
};

type SidebarItemDef = {
  text: string;
  icon: LucideIcon;
  href: string | Array<string>;
}

type SidebarItemProps = SidebarItemDef & {
  isActive: boolean;
}

const SidebarItem = ({text, href, icon: Icon, isActive}: SidebarItemProps) => {
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
          ${isActive ? "bg-slate-50 text-primary" : "text-slate-700"}
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

export {Sidebar};