"use client";

import type {PropsWithChildren} from "react";
import React, {useContext, useState} from "react";
import {useMotionValueEvent, useScroll} from "framer-motion";
import Link from "next/link";

import {Sidebar, SidebarContent, SidebarContext, SidebarTrigger} from "~/components/ui/sidebar";
import {useSmoothScroll} from "~/hooks/use-smooth-scroll";

const homeNavigationItems: Array<NavigationItemDef> = [
  {
    id: "about",
    text: "About Me",
    href: "/#about"
  },
  {
    id: "projects",
    text: "Projects",
    href: "/#projects"
  },
  {
    id: "experience",
    text: "Experience",
    href: "/#experience"
  },
  {
    id: "contact",
    text: "Contact",
    href: "/#contact"
  }
];

const subpageNavigationItems: Array<NavigationItemDef> = [
  {
    id: "Home",
    text: "Home",
    href: "/"
  },
  {
    id: "projects",
    text: "Projects",
    href: "/#projects"
  }
];

type NavigationProps = PropsWithChildren<{
  navItems: Array<NavigationItemDef>;
  isItemActive?: (item: NavigationItemDef) => boolean;
}>;

const Navigation = ({navItems, isItemActive = () => false, children}: NavigationProps) => {
  function displayNavigationItems() {
    return navItems.map((item: NavigationItemDef) => (
      <NavigationItem key={item.id} isActive={isItemActive(item)} {...item} />
    ));
  }

  return (
    <Sidebar>
      <div className="relative h-16 md:h-[4.5rem]">
        <div className="fixed left-0 right-0 top-0 z-40 mx-auto h-16 w-full bg-background px-4 md:h-[4.5rem] md:px-6">
          <nav className="section-container flex h-full items-center justify-between gap-4">
            <SidebarTrigger className="md:hidden" />
            <ul className="section-container hidden flex-1 items-center gap-8 md:flex">{displayNavigationItems()}</ul>
            {children}
          </nav>
        </div>
      </div>

      <SidebarContent>
        <ul className="section-container flex flex-1 flex-col gap-3">{displayNavigationItems()}</ul>
        <div className="pb-4">{children}</div>
      </SidebarContent>
    </Sidebar>
  );
};

type TargetElement = {
  id: string;
  target: HTMLElement;
};

const HomeNavigation = ({children}: {children: React.ReactNode}) => {
  const [activeTargetId, setActiveTargetId] = useState<string | null>(null);
  const {scrollY} = useScroll();

  function getTargetList() {
    return homeNavigationItems.reduce<Array<TargetElement>>((acc, {id}: NavigationItemDef) => {
      const target = document.getElementById(id);
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

  return (
    <Navigation navItems={homeNavigationItems} isItemActive={({id}) => id === activeTargetId}>
      {children}
    </Navigation>
  );
};

const SubpageNavigation = ({children}: {children: React.ReactNode}) => {
  return <Navigation navItems={subpageNavigationItems}>{children}</Navigation>;
};

type NavigationItemDef = {
  id: string;
  text: string;
  href: string;
};

type NavigationItemProps = NavigationItemDef & {
  isActive?: boolean;
};

const NavigationItem = ({href, text, isActive}: NavigationItemProps) => {
  const {hideSidebar} = useContext(SidebarContext);
  const scrollToTarget = useSmoothScroll(href.replace("/", ""));

  function handleNavigationItemClick(e: React.MouseEvent) {
    hideSidebar();
    scrollToTarget(e);
  }

  return (
    <li className="relative">
      <Link
        href={href}
        onClick={handleNavigationItemClick}
        className={`block rounded-md py-1.5 font-poppins text-sm font-medium leading-8 ${isActive ? "text-accent-foreground" : "text-muted-foreground"} transition-colors hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-appearance`}>
        {text}
      </Link>
    </li>
  );
};

export {HomeNavigation, SubpageNavigation};
