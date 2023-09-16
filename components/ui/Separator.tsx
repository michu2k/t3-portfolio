import React from "react";
import {cn} from "~/utils/className";

type SeparatorProps = {
  className?: string;
};

const Separator = ({className}: SeparatorProps) => {
  return <hr className={cn("section-container h-px border-0 bg-slate-300", className)} />;
};

export {Separator};
