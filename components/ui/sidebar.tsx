import type { PropsWithChildren } from "react";
import React, { useContext, useEffect, useState } from "react";
import * as Portal from "@radix-ui/react-portal";
import type { MotionNodeAnimationOptions } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import { XIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "~/components/ui/button";
import { cn } from "~/utils/cn";

type SidebarContextProps = {
  isExpanded: boolean;
  isExpandable: boolean;
  toggleSidebar: () => void;
  hideSidebar: () => void;
};

export const SidebarContext = React.createContext({} as SidebarContextProps);

type SidebarProps = PropsWithChildren<{
  isExpandable?: boolean;
}>;

export const Sidebar = ({ children, isExpandable = true }: SidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  function toggleSidebar() {
    setIsExpanded(!isExpanded);
  }

  function hideSidebar() {
    setIsExpanded(false);
  }

  useEffect(() => {
    hideSidebar();
  }, [pathname]);

  return (
    <SidebarContext.Provider value={{ isExpanded, isExpandable, toggleSidebar, hideSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const SidebarOverlay = ({ className, ...props }: React.ComponentProps<typeof motion.div>) => {
  const { toggleSidebar } = useContext(SidebarContext);

  const overlayAnimation: MotionNodeAnimationOptions = {
    transition: { duration: 0.2, ease: "easeInOut" },
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <Portal.Root asChild>
      <motion.div
        key="sidebar-overlay"
        onClick={toggleSidebar}
        className={cn("bg-background/80 fixed inset-0 z-40 backdrop-blur-sm", className)}
        {...overlayAnimation}
        {...props}
      />
    </Portal.Root>
  );
};

type SidebarContentProps = PropsWithChildren<{
  ref?: React.Ref<HTMLElement>;
  className?: string;
}>;

export const SidebarContent = ({ className, children, ...props }: SidebarContentProps) => {
  const { isExpanded, isExpandable, toggleSidebar } = useContext(SidebarContext);

  const contentAnimation: MotionNodeAnimationOptions = {
    transition: { duration: 0.25, ease: "easeInOut" },
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { opacity: 0 }
  };

  const sidebarClassName = cn(
    "flex shrink-0 gap-6 md:gap-8 flex-col h-full py-10 px-4 bg-background border-r-[1px] border-muted w-full max-w-[18rem] md:w-72 md:h-screen z-50 top-0 fixed",
    className
  );

  if (isExpandable) {
    return (
      <AnimatePresence>
        {isExpanded && (
          <>
            <motion.aside key="sidebar-content" className={sidebarClassName} {...contentAnimation} {...props}>
              <Button variant="ghost" className="absolute top-4 right-4 size-8 p-0" onClick={toggleSidebar}>
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

  // If a sidebar is not expandable (i.e. it's defined as static), it will be visible only on the desktop
  return (
    <aside className={cn(sidebarClassName, "hidden md:sticky md:flex")} {...props}>
      {children}
    </aside>
  );
};

export const SidebarTrigger = ({ className, onClick, ...props }: React.ComponentProps<"button">) => {
  const { toggleSidebar } = useContext(SidebarContext);

  function handleBtnClick(e: React.MouseEvent<HTMLButtonElement>) {
    toggleSidebar();
    onClick?.(e);
  }

  return (
    <button
      onClick={handleBtnClick}
      className={cn("relative z-40 flex size-8 shrink-0 flex-col justify-center gap-4", className)}
      {...props}>
      <span className="bg-foreground flex h-0.5 w-6" />
      <span className="bg-foreground absolute top-0 bottom-0 left-0 m-auto h-0.5 w-8" />
      <span className="bg-foreground flex h-0.5 w-6" />
      <span className="sr-only">Toggle sidebar</span>
    </button>
  );
};
