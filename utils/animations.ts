import type {MotionProps} from "framer-motion";

export const DEFAULT_ANIMATION_DURATION = 0.6;
export const DEFAULT_ANIMATION_DELAY = 0.3;

export const inViewAnimationProps: MotionProps = {
  initial: {opacity: 0},
  whileInView: {opacity: 1},
  transition: {
    duration: DEFAULT_ANIMATION_DURATION,
    delay: DEFAULT_ANIMATION_DELAY
  },
  viewport: {once: true}
};
