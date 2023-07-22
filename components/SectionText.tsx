import type {PropsWithChildren} from "react";
import {memo} from "react";
import React from "react";

type SectionTextProps = PropsWithChildren

const SectionText = memo(({children}: SectionTextProps) => {
  return (
    <p className="text-md leading-7 mb-10 max-w-xl">
      {children}
    </p>
  );
});

SectionText.displayName = "SectionText";

export {SectionText};