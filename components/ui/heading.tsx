import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/utils/cn";

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

type HeadingProps = React.ComponentProps<"h1" | "h2" | "h3"> & {
  as: "h1" | "h2" | "h3";
} & VariantProps<typeof headingVariants>;

export const Heading = ({ as: Component, size, className, ref, children, ...props }: HeadingProps) => {
  return (
    <Component ref={ref} className={cn(headingVariants({ size }), className)} {...props}>
      {children}
    </Component>
  );
};
