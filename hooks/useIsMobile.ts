import {useWindowSize} from "./useWindowSize";
import theme from "tailwindcss/defaultTheme";

const useIsMobile = (): boolean => {
  const windowSize = useWindowSize();
  const maxMobileWidth = parseInt(theme.screens.md);

  return windowSize.width < maxMobileWidth;
};

export {useIsMobile};
