import {useIsMobile} from "./use-is-mobile";
import {isClientSide} from "~/utils/is-client-side";

// For better UX, offset the scroll position by a few pixels
const OFFSET_TOP_MOBILE = 24;
const OFFSET_TOP_DESKTOP = 48;

const useSmoothScroll = (hash: string) => {
  const isMobile = useIsMobile();
  const target = isClientSide() ? document.querySelector<HTMLElement>(hash) : null;

  function scrollToTarget() {
    if (!target) return;

    const viewOffsetTop = isMobile ? OFFSET_TOP_MOBILE : OFFSET_TOP_DESKTOP;

    window.scrollTo({
      top: target.offsetTop - viewOffsetTop,
      behavior: "smooth"
    });
  }

  return {scrollToTarget, target};
};

export {useSmoothScroll};
