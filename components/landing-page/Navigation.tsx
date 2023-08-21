import React, {useState} from "react";
import Link from "next/link";
import type {MotionValue} from "framer-motion";
import {motion, useMotionValueEvent, useScroll} from "framer-motion";
import {SocialMedia} from "./SocialMedia";
import {cn} from "~/utils/className";
import {isClientSide} from "~/utils/isClientSide";
import {useIsMobile} from "~/hooks/useIsMobile";

const navigationItems: Array<NavigationItemDef> = [
  {
    id: 1,
    text: "Top",
    href: "#top"
  },
  {
    id: 2,
    text: "About",
    href: "#about"
  },
  {
    id: 3,
    text: "Recent work",
    href: "#recent-work"
  },
  {
    id: 4,
    text: "Experience",
    href: "#experience"
  },
  {
    id: 5,
    text: "Contact",
    href: "#keep-in-touch"
  }
];

const Navigation = () => {
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false);
  const [activeItemId, setActiveItemId] = useState<number | null>(null);
  const {scrollY} = useScroll();

  function hideMobileMenu() {
    setMobileMenuExpanded(false);
  }

  function toggleMobileMenu() {
    setMobileMenuExpanded(!mobileMenuExpanded);
  }

  function displayNavigationItems() {
    if (!activeItemId && navigationItems[0]) {
      setActiveItemId(navigationItems[0].id);
    }

    return navigationItems.map((item) => (
      <NavigationItem
        key={item.id}
        onClick={hideMobileMenu}
        isActive={item.id === activeItemId}
        setActiveItemId={setActiveItemId}
        scrollY={scrollY}
        {...item} />
    ));
  }

  return (
    <div className="
      px-4 md:px-6
      w-full h-16 md:h-20
      mx-auto
      bg-white
      sticky z-50
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
          z-50
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

type NavigationItemDef = {
  id: number;
  text: string;
  href: string;
}

type NavigationItemProps = NavigationItemDef & {
  onClick: () => void;
  isActive: boolean;
  setActiveItemId: React.Dispatch<React.SetStateAction<number | null>>;
  scrollY: MotionValue<number>;
}

// For better UX, offset the scroll position by a few pixels
const OFFSET_TOP_MOBILE = 24;
const OFFSET_TOP_DESKTOP = 48;

const NavigationItem = ({
  id,
  href,
  text,
  onClick,
  isActive,
  setActiveItemId,
  scrollY
}: NavigationItemProps) => {
  const isMobile = useIsMobile();
  const sectionEl = isClientSide() ? document.getElementById(href.replace("#", "")) : null;
  const viewOffsetTop = isMobile ? OFFSET_TOP_MOBILE : OFFSET_TOP_DESKTOP;

  useMotionValueEvent(scrollY, "change", (latestPos) => {
    const sectionOffsetTop = Math.max((sectionEl?.offsetTop || 0), 0);
    const halfWindowHeight = window.innerHeight / 2;

    // If the section is in the middle of the screen, set it as active
    if (latestPos >= sectionOffsetTop - halfWindowHeight) {
      setActiveItemId(id);
    }
  });

  function handleNavigationItemClick(e: React.MouseEvent) {
    e.preventDefault();
    onClick();

    if (sectionEl) {
      window.scrollTo({
        top: sectionEl.offsetTop - viewOffsetTop,
        behavior: "smooth"
      });
    }
  }

  return (
    <li className="relative">
      <Link
        href={href}
        onClick={handleNavigationItemClick}
        className="font-medium leading-8 text-md md:text-sm py-2 block">
        {text}
      </Link>

      {isActive ? <motion.div layoutId="underline" className={`
          rounded-full
          w-6 md:w-4 h-0.5
          bg-primary
          absolute
          left-0 md:mx-auto
          bottom-0 md:right-0
          mb-1 md:mb-0
        `} /> : null}
    </li>
  );
};

type NavigationTogglerProps = {
  isActive: boolean;
  onClick?: () => void;
}

const NavigationToggler = ({isActive, onClick}: NavigationTogglerProps) => {
  const dynamicLineStyles = `
    w-8 h-0.5
    bg-slate-900
    absolute top-0 left-0 bottom-0
    m-auto
    transition-transform
    will-change-transform
  `;

  const staticLineStyles = `
    w-6 h-0.5
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