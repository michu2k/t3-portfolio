import * as React from "react";

import { cn } from "~/utils/cn";

type SeparatorProps = React.ComponentProps<"hr"> & {
  orientation?: "horizontal" | "vertical";
};

export const Separator = ({ orientation = "horizontal", className, ...props }: SeparatorProps) => {
  return (
    <hr
      className={cn(
        "bg-muted shrink-0 border-0",
        orientation === "horizontal" ? "mx-auto h-0.5 w-full" : "h-full w-px",
        className
      )}
      {...props}
    />
  );
};
