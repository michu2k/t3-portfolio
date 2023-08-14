import React from "react";
import {cn} from "~/utils/className";

type SeparatorProps = {
  className?: string;
};

const Separator = ({className}: SeparatorProps) => {
  return <hr className={cn("section-container h-px bg-slate-300 border-0", className)} />;
};

export {Separator};