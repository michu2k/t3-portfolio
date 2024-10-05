import React from "react";

import {cn} from "~/utils/cn";

type SeparatorProps = {
  orientation?: "horizontal" | "vertical";
  className?: string;
};

const Separator = ({orientation = "horizontal", className}: SeparatorProps) => {
  return (
    <hr
      className={cn(
        "shrink-0 border-0 bg-muted",
        orientation === "horizontal" ? "mx-auto h-0.5 w-full" : "h-full w-px",
        className
      )}
    />
  );
};

export {Separator};
