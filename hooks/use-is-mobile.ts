import { useEffect, useState } from "react";

const BREAKPOINT_MD = 768;

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${BREAKPOINT_MD}px)`);

    setIsMobile(!mediaQuery.matches);

    function handleMediaQueryChange(e: MediaQueryListEvent) {
      setIsMobile(!e.matches);
    }

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  return isMobile;
};
