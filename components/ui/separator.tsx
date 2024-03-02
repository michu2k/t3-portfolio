import React from "react";
import {cn} from "~/utils/className";

type SeparatorProps = {
  className?: string;
};

const Separator = ({className}: SeparatorProps) => {
  return <hr className={cn("mx-auto h-0.5 w-full border-0 bg-muted", className)} />;
};

export {Separator};
