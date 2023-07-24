import React from "react";

type SeparatorProps = {
  isFullWidth?: boolean;
};

const Separator = ({isFullWidth}: SeparatorProps) => {
  const separatorClassName = isFullWidth ? "w-full mx-auto" : "section-container";

  return (
    <hr className={`${separatorClassName} h-px bg-slate-300 border-0`} />
  );
};

export {Separator};