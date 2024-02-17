import type {PropsWithChildren} from "react";
import React from "react";
import {XIcon} from "lucide-react";
import type {AnimationProps} from "framer-motion";
import {AnimatePresence, motion} from "framer-motion";
import * as Portal from "@radix-ui/react-portal";
import {Button} from "~/components/ui/button";
import {useIsMobile} from "~/hooks/use-is-mobile";
import {cn} from "~/utils/className";
import {SidebarContextProvider, useSidebarContext} from "./sidebar-context";

const Sidebar = ({children}: {children: React.ReactNode}) => {
  return <SidebarContextProvider>{children}</SidebarContextProvider>;
};

type SidebarOverlayProps = {
  className?: string;
};

const SidebarOverlay = React.forwardRef<HTMLDivElement, SidebarOverlayProps>(({className}, ref) => {
  const {toggleSidebar} = useSidebarContext();

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
        onClick={toggleSidebar}
        className={cn("fixed inset-0 z-40 bg-background/80 backdrop-blur-sm", className)}
        {...overlayAnimation}
      />
    </Portal.Root>
  );
});

SidebarOverlay.displayName = "SidebarOverlay";

type SidebarContentProps = PropsWithChildren<{
  className?: string;
}>;

const SidebarContent = React.forwardRef<HTMLElement, SidebarContentProps>(({children, className}, ref) => {
  const {isExpanded, toggleSidebar} = useSidebarContext();
  const isMobile = useIsMobile();

  const contentAnimation: AnimationProps = {
    transition: {duration: 0.25, ease: "easeInOut"},
    initial: {x: "-100%"},
    animate: {x: 0},
    exit: {opacity: 0}
  };

  const sidebarClassName = cn(
    "flex flex-col h-full py-10 px-4 bg-background border-r-[1px] border-muted w-full max-w-[18rem] md:w-72 md:h-screen z-50 top-0 fixed md:sticky",
    className
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {isExpanded && (
          <>
            <motion.aside key="sidebar-content" ref={ref} className={sidebarClassName} {...contentAnimation}>
              <Button variant="ghost" className="absolute right-4 top-4 h-8 w-8 p-0" onClick={toggleSidebar}>
                <XIcon size={22} />
                <span className="sr-only">Close</span>
              </Button>

              {children}
            </motion.aside>

            <SidebarOverlay />
          </>
        )}
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
};

const SidebarTrigger = React.forwardRef<HTMLButtonElement, SidebarTriggerProps>(
  ({className, onClick = () => null}, ref) => {
    const {toggleSidebar} = useSidebarContext();

    const innerLineStyles = "w-8 h-0.5 bg-secondary absolute top-0 left-0 bottom-0 m-auto";
    const outerLineStyles = "w-6 h-0.5 bg-secondary flex";

    function handleBtnClick(e: React.MouseEvent) {
      toggleSidebar();
      onClick(e);
    }

    return (
      <button
        ref={ref}
        onClick={handleBtnClick}
        className={cn("relative flex h-8 w-8 shrink-0 flex-col justify-center md:hidden", className)}>
        <span className={cn(outerLineStyles, "mb-2")} />
        <span className={innerLineStyles} />
        <span className={cn(outerLineStyles, "mt-2")} />
        <span className="sr-only">Toggle sidebar</span>
      </button>
    );
  }
);

SidebarTrigger.displayName = "SidebarTrigger";

export {Sidebar, SidebarContent, SidebarTrigger};
