"use client";

import { useRef } from "react";
import { domAnimation, LazyMotion, m, useInView } from "framer-motion";

const DEFAULT_ANIMATION_DURATION = 0.6;

const DEFAULT_ANIMATION_DELAY = 0.3;

const MotionInViewWrapper = ({
  children,
  transition,
  initial,
  animate,
  ...props
}: React.ComponentProps<typeof m.div>) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const initialState = initial ?? { opacity: 0 };
  const animateState = animate ?? { opacity: 1 };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        ref={ref}
        initial={initialState}
        animate={isInView ? animateState : initialState}
        transition={{
          duration: DEFAULT_ANIMATION_DURATION,
          delay: DEFAULT_ANIMATION_DELAY,
          ...transition
        }}
        {...props}>
        {children}
      </m.div>
    </LazyMotion>
  );
};

export { MotionInViewWrapper };
