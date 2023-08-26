import React, {useContext, useState} from "react";
import Link from "next/link";
import type {MotionValue} from "framer-motion";
import {motion, useMotionValueEvent, useScroll} from "framer-motion";
import {Sidebar, SidebarContent, SidebarContext, SidebarTrigger} from "~/components/ui/Sidebar";
import {SocialMedia} from "./SocialMedia";
import {useIsMobile} from "~/hooks/useIsMobile";
import {isClientSide} from "~/utils/isClientSide";

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
  const [activeItemId, setActiveItemId] = useState<number | null>(null);
  const {scrollY} = useScroll();

  function displayNavigationItems() {
    if (!activeItemId && navigationItems[0]) {
      setActiveItemId(navigationItems[0].id);
    }

    return navigationItems.map((item) => (
      <NavigationItem
        key={item.id}
        isActive={item.id === activeItemId}
        setActiveItemId={setActiveItemId}
        scrollY={scrollY}
        {...item} />
    ));
  }

  return (
    <Sidebar>
      <div className="
        px-4 md:px-6
        w-full h-16 md:h-[4.5rem]
        mx-auto
        bg-white
        sticky z-40
        top-0 left-0 right-0">
        <nav className="section-container flex items-center justify-between gap-4 h-full">
          <SidebarTrigger />

          <ul className="section-container hidden md:flex flex-row flex-1 gap-8 items-center">
            {displayNavigationItems()}
          </ul>

          <SocialMedia />
        </nav>
      </div>

      <SidebarContent className="md:hidden">
        <ul className="section-container flex flex-col flex-1 gap-3">
          {displayNavigationItems()}
        </ul>

        <SocialMedia className="h-11 mb-4" />
      </SidebarContent>
    </Sidebar>
  );
};

type NavigationItemDef = {
  id: number;
  text: string;
  href: string;
}

type NavigationItemProps = NavigationItemDef & {
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
  isActive,
  setActiveItemId,
  scrollY
}: NavigationItemProps) => {
  const isMobile = useIsMobile();
  const {toggleExpanded} = useContext(SidebarContext);

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
    toggleExpanded();

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
        className={`
          font-medium leading-8 text-sm
          py-1.5 block
          ${isActive ? "text-primary" : "text-slate-700"}
          transition-colors
        `}>
        {text}
      </Link>

      {isActive ? <motion.div
        key="item-underline"
        layoutId="underline"
        className={`
          hidden md:block
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

export {Navigation};