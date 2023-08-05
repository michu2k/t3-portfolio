import React from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import type {LucideIcon} from "lucide-react";
import {Settings, Info, Laptop2, Image, Mail, Briefcase} from "lucide-react";

const sidebarItems: Array<SidebarItemDef> = [
  {
    text: "General",
    href: "/admin/general",
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
    href: "/admin/portfolio",
    icon: Image
  },
  {
    text: "Experience",
    href: "/admin/experience",
    icon: Briefcase
  },
  {
    text: "Contact",
    href: "/admin/contact",
    icon: Mail
  }
];

const Sidebar = () => {
  const pathname = usePathname();

  function displaySidebarItems() {
    return sidebarItems.map((item) => (
      <SidebarItem key={item.href} isActive={item.href === pathname} {...item} />
    ));
  }

  return (
    <nav>
      <ul className="flex md:flex-col flex-wrap gap-x-4 gap-y-1 md:gap-y-3">
        {displaySidebarItems()}
      </ul>
    </nav>
  );
};

type SidebarItemDef = {
  text: string;
  href: string;
  icon: LucideIcon;
}

type SidebarItemProps = SidebarItemDef & {
  isActive: boolean;
}

const SidebarItem = ({text, href, icon: Icon, isActive}: SidebarItemProps) => {
  return (
    <li>
      <Link
        href={href}
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