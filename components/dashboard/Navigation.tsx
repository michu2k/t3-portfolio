import React from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {signOut} from "next-auth/react";
import type {LucideIcon} from "lucide-react";
import {
  SettingsIcon,
  InfoIcon,
  Laptop2Icon,
  ImageIcon,
  MailIcon,
  BriefcaseIcon,
  LogOutIcon
} from "lucide-react";
import {Button} from "~/components/ui/Button";

const navigationItems: Array<NavigationItemDef> = [
  {
    text: "General",
    href: "/dashboard",
    icon: SettingsIcon
  },
  {
    text: "Header",
    href: "/dashboard/header",
    icon: Laptop2Icon
  },
  {
    text: "About",
    href: "/dashboard/about",
    icon: InfoIcon
  },
  {
    text: "Portfolio",
    href: [
      "/dashboard/portfolio",
      "/dashboard/portfolio/[id]"
    ],
    icon: ImageIcon
  },
  {
    text: "Experience",
    href: [
      "/dashboard/experience",
      "/dashboard/experience/[id]"
    ],
    icon: BriefcaseIcon
  },
  {
    text: "Contact",
    href: "/dashboard/contact",
    icon: MailIcon
  }
];

const Navigation = () => {
  const {pathname} = useRouter();

  function displayNavigationItems() {
    return navigationItems.map(({href, ...item}) => {
      const mainHref = Array.isArray(href) ? href[0] as string : href;

      const isActive = Array.isArray(href)
        ? !!href.find((href) => href === pathname)
        : (href === pathname);

      return <NavigationItem key={mainHref} isActive={isActive} href={href} {...item} />;
    });
  }

  return (
    <nav className="flex flex-col flex-grow">
      <ul className="flex flex-col gap-3">
        {displayNavigationItems()}
      </ul>

      <Button
        variant="ghost"
        className="h-11 w-full justify-start mt-auto mb-4 hover:text-primary"
        onClick={() => void signOut()}>
        <LogOutIcon size={16} className="mr-2" /> Log Out
      </Button>
    </nav>
  );
};

type NavigationItemDef = {
  text: string;
  icon: LucideIcon;
  href: string | Array<string>;
}

type NavigationItemProps = NavigationItemDef & {
  isActive: boolean;
}

const NavigationItem = ({text, href, icon: Icon, isActive}: NavigationItemProps) => {
  const url = Array.isArray(href) ? href[0] as string : href;

  return (
    <li>
      <Link
        href={url}
        className={`
          font-medium leading-5 text-sm
          py-3 px-3
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

export {Navigation};