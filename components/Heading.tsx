import type {PropsWithChildren} from "react";
import React from "react";
import {cva, type VariantProps} from "class-variance-authority";

const headingClassName = cva("button", {
  variants: {
    size: {
      md: ["font-medium", "text-md", "mb-2"],
      lg: ["font-semibold", "text-2xl", "mb-2"],
      xl: ["font-bold", "text-3xl", "mb-4"]
    }
  }
});

type HeadingProps = PropsWithChildren<{
  as: "h1" | "h2" | "h3";
} & VariantProps<typeof headingClassName>>

const Heading = ({as: Component, size, children}: HeadingProps) => {
  return (
    <Component className={`${headingClassName({size})} text-slate-900`}>
      {children}
    </Component>
  );
};

export {Heading};