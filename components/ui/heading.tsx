import type {PropsWithChildren} from "react";
import React from "react";
import {cva, type VariantProps} from "class-variance-authority";

import {cn} from "~/utils/className";

const headingVariants = cva("font-poppins", {
  variants: {
    size: {
      "sm": ["font-medium", "text-sm", "pb-2"],
      "md": ["font-medium", "text-md", "pb-2"],
      "lg": ["font-semibold", "text-lg", "pb-2"],
      "xl": ["font-semibold", "text-xl"],
      "2xl": ["font-bold", "text-2xl", "md:text-3xl"]
    }
  }
});

type HeadingProps = PropsWithChildren<
  {
    as: "h1" | "h2" | "h3";
    className?: string;
  } & VariantProps<typeof headingVariants>
>;

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({as: Component, size, className, children}, ref) => {
    return (
      <Component ref={ref} className={cn(headingVariants({size}), className)}>
        {children}
      </Component>
    );
  }
);

Heading.displayName = "Heading";

export {Heading};
