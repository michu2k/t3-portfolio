import type {PropsWithChildren} from "react";
import React, {useContext, useState} from "react";
import type {AnimationProps} from "framer-motion";
import {AnimatePresence, motion} from "framer-motion";
import {cn} from "~/utils/className";
import * as Portal from "@radix-ui/react-portal";

type SidebarContextValue = {
  isExpanded: boolean;
  toggleExpanded: () => void;
}

const SidebarContext = React.createContext<SidebarContextValue>(
  {} as SidebarContextValue
);

const Sidebar = ({children}: PropsWithChildren) => {
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleExpanded() {
    setIsExpanded(!isExpanded);
  }

  return (
    <SidebarContext.Provider value={{isExpanded, toggleExpanded}}>
      {children}
    </SidebarContext.Provider>
  );
};

type SidebarOverlayProps = {
  className?: string;
}

const SidebarOverlay = React.forwardRef<
HTMLDivElement,
SidebarOverlayProps
>(({className}, ref) => {
  const {toggleExpanded} = useContext(SidebarContext);

  const overlayAnimation: AnimationProps = {
    transition: {duration: 0.2, ease: "easeInOut"},
    initial: {opacity: 0},
    animate: {opacity: 1},
    exit: {opacity: 0}
  };

  return (
    <Portal.Root asChild>
      <motion.div
        key="sidebar-overlay"
        ref={ref}
        onClick={toggleExpanded}
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm",
          className
        )}
        {...overlayAnimation} />
    </Portal.Root>
  );
});

SidebarOverlay.displayName = "SidebarOverlay";

type SidebarContentProps = PropsWithChildren<{
  className?: string;
}>

const SidebarContent = React.forwardRef<
HTMLElement,
SidebarContentProps
>(({children, className}, ref) => {
  const {isExpanded} = useContext(SidebarContext);

  const contentAnimation: AnimationProps = {
    transition: {duration: 0.25, ease: "easeInOut"},
    initial: {x: "-100%"},
    animate: {x: 0},
    exit: {x: "-100%"}
  };

  return (
    <AnimatePresence>
      {isExpanded && <>
        <motion.aside
          key="sidebar-content"
          ref={ref}
          className={cn(
            `flex flex-col
          h-full py-10 px-4 bg-white
          border-r-[1px] border-slate-200
          fixed md:sticky z-50 top-0 md:h-screen w-64`,
            className
          )}
          {...contentAnimation}>
          {children}
        </motion.aside>

        <SidebarOverlay />
      </>}
    </AnimatePresence>
  );
});

SidebarContent.displayName = "SidebarContent";

type SidebarTriggerProps = {
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

const SidebarTrigger = React.forwardRef<
HTMLButtonElement,
SidebarTriggerProps
>(({className, onClick = () => null}, ref) => {
  const {isExpanded, toggleExpanded} = useContext(SidebarContext);

  const dynamicLineStyles = `
    w-8 h-0.5
    bg-slate-900
    absolute top-0 left-0 bottom-0
    m-auto
    transition-transform
    will-change-transform
    ${isExpanded ? "opacity-0" : "trans"}
  `;

  const staticLineStyles = `
    w-6 h-0.5
    bg-slate-900
    flex
    transition-opacity
    ${isExpanded ? "opacity-0" : "opacity-100"}
  `;

  function handleBtnClick(e: React.MouseEvent) {
    toggleExpanded();
    onClick(e);
  }

  return (
    <button
      ref={ref}
      onClick={handleBtnClick}
      className={cn("w-8 h-8 flex justify-center flex-col shrink-0 md:hidden relative", className)}>
      <span className={cn(dynamicLineStyles, isExpanded && "-rotate-45")} />
      <span className={cn(dynamicLineStyles, isExpanded && "rotate-45")} />
      <span className={cn(staticLineStyles, "mb-2")} />
      <span className={cn(staticLineStyles, "mt-2")} />
      <span className="sr-only">Toggle sidebar</span>
    </button>
  );
});

SidebarTrigger.displayName = "SidebarTrigger";

export {
  Sidebar,
  SidebarContent,
  SidebarTrigger
};