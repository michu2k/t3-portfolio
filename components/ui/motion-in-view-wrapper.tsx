"use client";

import * as React from "react";
import { domAnimation, LazyMotion, m } from "framer-motion";

import { inViewAnimationProps } from "~/utils/animations";

const MotionInViewWrapper = ({ children, transition, ...props }: React.ComponentProps<typeof m.div>) => {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        {...inViewAnimationProps}
        transition={{
          ...inViewAnimationProps.transition,
          ...transition
        }}
        {...props}>
        {children}
      </m.div>
    </LazyMotion>
  );
};

export { MotionInViewWrapper };
