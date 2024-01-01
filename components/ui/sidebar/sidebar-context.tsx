import React, {useContext, useState} from "react";

type SidebarContextProps = {
  isExpanded: boolean;
  toggleSidebar: () => void;
  hideSidebar: () => void;
};

const SidebarContext = React.createContext({} as SidebarContextProps);

type SidebarContextProviderProps = {
  children: React.ReactNode;
};

const SidebarContextProvider = ({children}: SidebarContextProviderProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleSidebar() {
    setIsExpanded(!isExpanded);
  }

  function hideSidebar() {
    setIsExpanded(false);
  }

  const value = {isExpanded, toggleSidebar, hideSidebar};

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};

const useSidebarContext = () => useContext(SidebarContext);

export {SidebarContextProvider, useSidebarContext};
