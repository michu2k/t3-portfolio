import type {PropsWithChildren} from "react";
import React from "react";

type SectionTextProps = PropsWithChildren

const SectionText = ({children}: SectionTextProps) => {
  return (
    <p className="text-md leading-7 mb-10 max-w-xl">
      {children}
    </p>
  );
};

export {SectionText};