import {useEffect, useState} from "react";
import {useWindowSize} from "./use-window-size";
import theme from "tailwindcss/defaultTheme";

const useIsMobile = () => {
  const windowSize = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);
  const maxMobileWidth = parseInt(theme.screens.md);

  useEffect(() => {
    setIsMobile(windowSize.width < maxMobileWidth);
  }, [windowSize.width, maxMobileWidth]);

  return isMobile;
};

export {useIsMobile};
