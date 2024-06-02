"use client";

import type {PropsWithChildren} from "react";
import React from "react";
import type {HTMLMotionProps} from "framer-motion";
import {motion} from "framer-motion";

import {inViewAnimationProps} from "~/utils/animations";

type MotionInViewWrapperProps = PropsWithChildren<HTMLMotionProps<"div">>;

const MotionInViewWrapper = ({children, transition, ...props}: MotionInViewWrapperProps) => {
  return (
    <motion.div
      {...inViewAnimationProps}
      transition={{
        ...inViewAnimationProps.transition,
        ...transition
      }}
      {...props}>
      {children}
    </motion.div>
  );
};

export {MotionInViewWrapper};
