import type {PropsWithChildren} from "react";
import {memo} from "react";
import React from "react";

type PageSectionProps = PropsWithChildren<{
  heading: string;
}>

const PageSection = memo(({heading, children}: PageSectionProps) => {
  return (
    <section className="py-6 mb-6">
      <h2 className="font-bold text-2xl mb-6">{heading}</h2>
      {children}
    </section>
  );
});

PageSection.displayName = "PageSection";

export {PageSection};