"use client";

import { useRef } from "react";
import { domAnimation, LazyMotion, m, useInView } from "framer-motion";

const DEFAULT_ANIMATION_DURATION = 0.6;

const DEFAULT_ANIMATION_DELAY = 0.3;

const MotionInViewWrapper = ({ children, transition, ...props }: React.ComponentProps<typeof m.div>) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
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
