import type {PropsWithChildren} from "react";
import React from "react";
import {cva, type VariantProps} from "class-variance-authority";

const headingVariants = cva("text-slate-900", {
  variants: {
    size: {
      md: ["font-semibold", "text-md", "mb-2"],
      lg: ["font-semibold", "text-2xl", "mb-2"],
      xl: ["font-bold", "text-3xl", "mb-4"]
    }
  }
});

type HeadingProps = PropsWithChildren<{
  as: "h1" | "h2" | "h3";
} & VariantProps<typeof headingVariants>>

const Heading = ({as: Component, size, children}: HeadingProps) => {
  return (
    <Component className={headingVariants({size})}>
      {children}
    </Component>
  );
};

export {Heading};