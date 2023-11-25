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
  const isMobile = useIsMobile();

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
        {...item}
      />
    ));
  }

  return (
    <Sidebar>
      <div className="sticky left-0 right-0 top-0 z-40 mx-auto h-16 w-full bg-white px-4 md:h-[4.5rem] md:px-6">
        <nav className="section-container flex h-full items-center justify-between gap-4">
          <SidebarTrigger />

          {!isMobile && (
            <ul className="section-container flex flex-1 items-center gap-8">{displayNavigationItems()}</ul>
          )}

          <SocialMedia />
        </nav>
      </div>

      {isMobile && (
        <SidebarContent>
          <ul className="section-container flex flex-1 flex-col gap-3">{displayNavigationItems()}</ul>

          <SocialMedia className="mb-4 h-11" />
        </SidebarContent>
      )}
    </Sidebar>
  );
};

type NavigationItemDef = {
  id: number;
  text: string;
  href: string;
};

type NavigationItemProps = NavigationItemDef & {
  isActive: boolean;
  setActiveItemId: React.Dispatch<React.SetStateAction<number | null>>;
  scrollY: MotionValue<number>;
};

// For better UX, offset the scroll position by a few pixels
const OFFSET_TOP_MOBILE = 24;
const OFFSET_TOP_DESKTOP = 48;

const NavigationItem = ({id, href, text, isActive, setActiveItemId, scrollY}: NavigationItemProps) => {
  const isMobile = useIsMobile();
  const {toggleExpanded} = useContext(SidebarContext);

  const sectionEl = isClientSide() ? document.getElementById(href.replace("#", "")) : null;
  const viewOffsetTop = isMobile ? OFFSET_TOP_MOBILE : OFFSET_TOP_DESKTOP;

  useMotionValueEvent(scrollY, "change", (latestPos) => {
    const sectionOffsetTop = Math.max(sectionEl?.offsetTop || 0, 0);
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
        className={`block rounded-md py-1.5 font-poppins text-sm font-medium leading-8
          ${isActive ? "text-primary" : "text-slate-700"}
          transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400
          focus-visible:ring-offset-2`}>
        {text}
      </Link>

      {isActive ? (
        <motion.div
          key="item-underline"
          layoutId="underline"
          className="absolute bottom-0 left-0 mb-1 hidden h-0.5 w-6 rounded-full bg-primary md:right-0 md:mx-auto md:mb-0 md:block md:w-4"
        />
      ) : null}
    </li>
  );
};

export {Navigation};
