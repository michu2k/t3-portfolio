import {useIsMobile} from "./use-is-mobile";

// For better UX, offset the scroll position by a few pixels
const OFFSET_TOP_MOBILE = 24;
const OFFSET_TOP_DESKTOP = 48;

const useSmoothScroll = (hash: string) => {
  const isMobile = useIsMobile();

  function scrollToTarget(e: React.MouseEvent) {
    const target = hash ? document.querySelector<HTMLElement>(hash) : null;

    if (target) {
      e.preventDefault();

      const viewOffsetTop = isMobile ? OFFSET_TOP_MOBILE : OFFSET_TOP_DESKTOP;

      window.scrollTo({
        top: target.offsetTop - viewOffsetTop,
        behavior: "smooth"
      });
    }
  }

  return scrollToTarget;
};

export {useSmoothScroll};
