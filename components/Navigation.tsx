import React from "react";
import Link from "next/link";
import {SocialMedia} from "./SocialMedia";

const navigationItems: Array<NavigationItemProps> = [
  {
    id: 1,
    href: "#about",
    text: "About"
  },
  {
    id: 2,
    href: "#recent-work",
    text: "Recent work"
  },
  {
    id: 3,
    href: "#experience",
    text: "Experience"
  },
  {
    id: 4,
    href: "#keep-in-touch",
    text: "Contact"
  }
];

const Navigation = () => {

  function displayNavigationItems() {
    return navigationItems.map((item) => (
      <NavigationItem key={item.id} {...item} />
    ));
  }

  return (
    <div className="
      bg-white
      px-4 md:px-6
      w-full h-20
      sticky z-20
      top-0 left-0 right-0
      mx-auto">
      <nav className="
        flex items-center justify-between
        w-full max-w-xl md:max-w-5xl
        h-full
        mx-auto">
        <ul className="flex items-center gap-8">
          {displayNavigationItems()}
        </ul>

        <SocialMedia />
      </nav>
    </div>
  );
};

type NavigationItemProps = {
  id: number;
  href: string;
  text: string;
}

const NavigationItem = ({href, text}: NavigationItemProps) => {

  return (
    <li className="text-sm text-slate-700">
      <Link href={href}>{text}</Link>
    </li>
  );
};

export {Navigation};