"use client";

import type {PropsWithChildren} from "react";
import React from "react";
import type {HTMLMotionProps} from "framer-motion";
import {domAnimation, LazyMotion, m} from "framer-motion";

import {inViewAnimationProps} from "~/utils/animations";

type MotionInViewWrapperProps = PropsWithChildren<HTMLMotionProps<"div">>;

const MotionInViewWrapper = ({children, transition, ...props}: MotionInViewWrapperProps) => {
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

export {MotionInViewWrapper};
