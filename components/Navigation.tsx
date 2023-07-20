import React, {useState} from "react";
import Link from "next/link";
import {SocialMedia} from "./SocialMedia";
import {cn} from "~/utils/className";

const navigationItems: Array<NavigationItemProps> = [
  {
    id: 1,
    href: "#top",
    text: "Top"
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
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false);

  function hideMobileMenu() {
    setMobileMenuExpanded(false);
  }

  function toggleMobileMenu() {
    setMobileMenuExpanded(!mobileMenuExpanded);
  }

  function displayNavigationItems() {
    return navigationItems.map((item) => (
      <NavigationItem key={item.id} onClick={hideMobileMenu} {...item} />
    ));
  }

  return (
    <div className="
      px-4 md:px-6
      w-full h-16 md:h-20
      mx-auto
      bg-white
      sticky z-20
      top-0 left-0 right-0">
      <nav className="
        section-container
        flex items-center justify-between gap-4
        h-full">
        <NavigationToggler isActive={mobileMenuExpanded} onClick={toggleMobileMenu} />

        <div className={`
          flex
          ${mobileMenuExpanded ? "visible" : "invisible"} md:visible
          ${mobileMenuExpanded ? "opacity-100" : "opacity-0"} md:opacity-100
          justify-between flex-col md:flex-row md:flex-1
          transition-all
          bg-white
          px-4 md:px-0
          fixed md:static
          top-16 left-0 right-0 bottom-0
          z-20
        `}>
          <ul className="
            py-10 md:py-0
            section-container
            flex flex-col flex-1 gap-2 md:gap-8
            md:flex-row md:items-center
          ">
            {displayNavigationItems()}
          </ul>
        </div>

        <SocialMedia />
      </nav>
    </div>
  );
};

type NavigationItemProps = {
  id: number;
  href: string;
  text: string;
  onClick?: () => void;
}

const NavigationItem = ({href, text, onClick = () => null}: NavigationItemProps) => {

  function handleNavigationItemClick(e: React.MouseEvent) {
    e.preventDefault();
    onClick();
  }

  return (
    <li>
      <Link
        href={href}
        onClick={handleNavigationItemClick}
        className="font-medium py-2 leading-8 text-md md:text-sm text-slate-700 block">
        {text}
      </Link>
    </li>
  );
};

type NavigationTogglerProps = {
  isActive: boolean;
  onClick?: () => void;
}

const NavigationToggler = ({isActive, onClick}: NavigationTogglerProps) => {
  const dynamicLineStyles = `
    w-8 h-[0.125rem]
    bg-slate-900
    absolute top-0 left-0 bottom-0
    m-auto
    transition-transform
    will-change-transform
  `;

  const staticLineStyles = `
    w-6 h-[0.125rem]
    bg-slate-900
    flex
    transition-opacity
    ${isActive ? "opacity-0" : "opacity-100"}
  `;

  return (
    <button
      onClick={onClick}
      className="w-8 h-8 flex justify-center flex-col shrink-0 md:hidden relative">
      <span className={cn(dynamicLineStyles, isActive && "-rotate-45")} />
      <span className={cn(dynamicLineStyles, isActive && "rotate-45")} />
      <span className={cn(staticLineStyles, "mb-2")} />
      <span className={cn(staticLineStyles, "mt-2")} />
      <span className="sr-only">Open menu</span>
    </button>
  );
};

export {Navigation};