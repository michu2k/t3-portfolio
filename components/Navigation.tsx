import Link from "next/link";
import React from "react";

const navigationItems: Array<NavigationItemProps> = [
  {
    id: 1,
    href: "#top",
    text: "Home"
  },
  {
    id: 2,
    href: "#about",
    text: "About"
  },
  {
    id: 3,
    href: "#recent-work",
    text: "Recent work"
  },
  {
    id: 4,
    href: "#experience",
    text: "Experience"
  },
  {
    id: 5,
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
      border-b-[1px]
      border-slate-200
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
        <span>My Website</span>
        <ul className="flex items-center gap-6">
          {displayNavigationItems()}
        </ul>
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
    <li className="font-medium text-sm text-slate-900">
      <Link href={href}>{text}</Link>
    </li>
  );
};

export {Navigation};