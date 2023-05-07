import type {PropsWithChildren} from "react";
import cn from "classnames";
import {memo} from "react";
import React from "react";

type PageSectionProps = PropsWithChildren<{
  heading: string;
  upperHeading?: string;
  className?: string;
}>

const PageSection = memo(({heading, upperHeading, className, children}: PageSectionProps) => {

  const sectionClassName = cn("py-10 px-4 md:py-14 md:px-8", className);

  return (
    <section className={sectionClassName}>
      <div className="max-w-xl md:max-w-4xl mx-auto">
        {upperHeading && <p className="text-slate-500 text-sm mb-1">{upperHeading}</p>}
        <h2 className="font-bold text-2xl mb-3">{heading}</h2>
        <hr className="h-1 w-10 mb-8 bg-primary border-0 rounded-md" />
        {children}
      </div>
    </section>
  );
});

PageSection.displayName = "PageSection";

export {PageSection};