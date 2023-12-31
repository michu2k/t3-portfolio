import React from "react";
import {cn} from "~/utils/className";

type SeparatorProps = {
  className?: string;
};

const Separator = ({className}: SeparatorProps) => {
  return <hr className={cn("section-container h-0.5 border-0 bg-slate-200", className)} />;
};

export {Separator};
