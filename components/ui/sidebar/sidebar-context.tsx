import type {PropsWithChildren} from "react";
import React, {useContext, useEffect, useState} from "react";
import {usePathname} from "next/navigation";

type SidebarContextProps = {
  isExpanded: boolean;
  isExpandable: boolean;
  toggleSidebar: () => void;
  hideSidebar: () => void;
};

const SidebarContext = React.createContext({} as SidebarContextProps);

type SidebarContextProviderProps = PropsWithChildren<{
  isExpandable?: boolean;
}>;

const SidebarContextProvider = ({children, isExpandable = true}: SidebarContextProviderProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  function toggleSidebar() {
    setIsExpanded(!isExpanded);
  }

  function hideSidebar() {
    setIsExpanded(false);
  }

  const value = {isExpanded, isExpandable, toggleSidebar, hideSidebar};

  useEffect(() => {
    hideSidebar();
  }, [pathname]);

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};

const useSidebarContext = () => useContext(SidebarContext);

export {SidebarContextProvider, useSidebarContext};
