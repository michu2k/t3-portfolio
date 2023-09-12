import type {PropsWithChildren} from "react";
import React, {useContext, useState} from "react";
import {XIcon} from "lucide-react";
import type {AnimationProps} from "framer-motion";
import {AnimatePresence, motion} from "framer-motion";
import * as Portal from "@radix-ui/react-portal";
import {Button} from "~/components/ui/Button";
import {useIsMobile} from "~/hooks/useIsMobile";
import {cn} from "~/utils/className";

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
  const {isExpanded, toggleExpanded} = useContext(SidebarContext);
  const isMobile = useIsMobile();

  const contentAnimation: AnimationProps = {
    transition: {duration: 0.25, ease: "easeInOut"},
    initial: {x: "-100%"},
    animate: {x: 0},
    exit: {opacity: 0}
  };

  const sidebarClassName = cn(
    `flex flex-col
    h-full py-10 px-4 bg-white
    border-r-[1px] border-slate-200
    w-full max-w-[18rem] md:w-72 md:h-screen
    z-50 top-0
    fixed md:sticky`,
    className
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {isExpanded && <>
          <motion.aside
            key="sidebar-content"
            ref={ref}
            className={sidebarClassName}
            {...contentAnimation}>
            <Button
              variant="ghost"
              className="absolute right-4 top-4 w-8 h-8 p-0"
              onClick={toggleExpanded}>
              <XIcon size={22} />
            </Button>

            {children}
          </motion.aside>

          <SidebarOverlay />
        </>}
      </AnimatePresence>
    );
  }

  return (
    <aside ref={ref} className={sidebarClassName}>
      {children}
    </aside>
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
  const {toggleExpanded} = useContext(SidebarContext);

  const innerLineStyles = `
    w-8 h-0.5
    bg-slate-900
    absolute top-0 left-0 bottom-0
    m-auto
  `;

  const outerLineStyles = `
    w-6 h-0.5
    bg-slate-900
    flex
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
      <span className={cn(outerLineStyles, "mb-2")} />
      <span className={innerLineStyles} />
      <span className={cn(outerLineStyles, "mt-2")} />
      <span className="sr-only">Toggle sidebar</span>
    </button>
  );
});

SidebarTrigger.displayName = "SidebarTrigger";

export {
  SidebarContext,
  Sidebar,
  SidebarContent,
  SidebarTrigger
};