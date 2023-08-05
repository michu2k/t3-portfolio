import React from "react";
import {cn} from "~/utils/className";

type SeparatorProps = {
  isFullWidth?: boolean;
  className?: string;
};

const Separator = ({isFullWidth, className}: SeparatorProps) => {

  const separatorClassName = cn(
    isFullWidth ? "w-full mx-auto" : "section-container",
    "h-px bg-slate-300 border-0",
    className
  );

  return (
    <hr className={separatorClassName} />
  );
};

export {Separator};