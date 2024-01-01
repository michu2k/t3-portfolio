"use client";

import React, {useState} from "react";
import Link from "next/link";
import {motion, useMotionValueEvent, useScroll} from "framer-motion";
import {Sidebar, SidebarContent, SidebarTrigger, useSidebarContext} from "~/components/ui/sidebar";
import {useSmoothScroll} from "~/hooks/use-smooth-scroll";
import {isClientSide} from "~/utils/is-client-side";

const navigationItems: Array<NavigationItemDef> = [
  {
    id: "about",
    text: "About",
    href: "/#about"
  },
  {
    id: "recent-work",
    text: "Recent work",
    href: "/#recent-work"
  },
  {
    id: "experience",
    text: "Experience",
    href: "/#experience"
  },
  {
    id: "keep-in-touch",
    text: "Contact",
    href: "/#keep-in-touch"
  }
];

type TargetElement = {
  id: string;
  target: HTMLElement;
};

type NavigationProps = {
  children: React.ReactNode;
};

const Navigation = ({children}: NavigationProps) => {
  const [activeTargetId, setActiveTargetId] = useState<string | null>(null);
  const {scrollY} = useScroll();

  function getTargetList() {
    return navigationItems.reduce<Array<TargetElement>>((acc, {id}: NavigationItemDef) => {
      const target = isClientSide() ? document.getElementById(id) : null;
      return target ? [...acc, {id, target}] : acc;
    }, []);
  }

  useMotionValueEvent(scrollY, "change", (latestPos) => {
    const halfWindowHeight = window.innerHeight / 2;

    const targetList = getTargetList();
    const highlightedElements = targetList.filter(({target}) => target.offsetTop - halfWindowHeight <= latestPos);
    const lastHighlightedElement = highlightedElements[highlightedElements.length - 1];

    setActiveTargetId(lastHighlightedElement ? lastHighlightedElement.id : null);
  });

  function displayNavigationItems() {
    return navigationItems.map((item: NavigationItemDef) => (
      <NavigationItem key={item.id} isActive={item.id === activeTargetId} {...item} />
    ));
  }

  return (
    <Sidebar>
      <div className="sticky left-0 right-0 top-0 z-40 mx-auto h-16 w-full bg-white px-4 md:h-[4.5rem] md:px-6">
        <nav className="section-container flex h-full items-center justify-between gap-4">
          <SidebarTrigger />
          <ul className="section-container hidden flex-1 items-center gap-8 md:flex">{displayNavigationItems()}</ul>
          {children}
        </nav>
      </div>

      <SidebarContent className="md:hidden">
        <ul className="section-container flex flex-1 flex-col gap-3">{displayNavigationItems()}</ul>
        <div className="pb-4">{children}</div>
      </SidebarContent>
    </Sidebar>
  );
};

type NavigationItemDef = {
  id: string;
  text: string;
  href: string;
};

type NavigationItemProps = NavigationItemDef & {
  isActive: boolean;
};

const NavigationItem = ({href, text, isActive}: NavigationItemProps) => {
  const {hideSidebar} = useSidebarContext();
  const {scrollToTarget, target} = useSmoothScroll(href.replace("/", ""));

  function handleNavigationItemClick(e: React.MouseEvent) {
    if (target) {
      e.preventDefault();
      hideSidebar();
      scrollToTarget();
    }
  }

  return (
    <li className="relative">
      <Link
        href={href}
        onClick={handleNavigationItemClick}
        className={`block rounded-md py-1.5 font-poppins text-sm font-medium leading-8
          ${isActive ? "text-primary" : "text-slate-700"}
          transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400
          focus-visible:ring-offset-2`}>
        {text}
      </Link>

      {isActive ? (
        <motion.div
          layoutId="underline"
          style={{originY: "0px"}}
          className="absolute bottom-0 left-0 right-0 mx-auto hidden h-0.5 w-4 rounded-full bg-primary md:block"
        />
      ) : null}
    </li>
  );
};

export {Navigation};
