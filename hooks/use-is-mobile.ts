import {useEffect, useState} from "react";
import theme from "tailwindcss/defaultTheme";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const maxMobileWidth = parseInt(theme.screens.md);
    const mediaQuery = window.matchMedia(`(min-width: ${maxMobileWidth}px)`);

    setIsMobile(!mediaQuery.matches);

    function handleMediaQueryChange(e: MediaQueryListEvent) {
      setIsMobile(!e.matches);
    }

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  return isMobile;
};

export {useIsMobile};
