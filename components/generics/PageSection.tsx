import type {PropsWithChildren} from "react";
import cn from "classnames";
import {memo} from "react";
import React from "react";

type PageSectionProps = PropsWithChildren<{
  heading: string;
  className?: string;
}>

const PageSection = memo(({heading, className, children}: PageSectionProps) => {

  const sectionClassName = cn("py-10 px-4 md:px-8", className);

  return (
    <section className={sectionClassName}>
      <div className="max-w-xl md:max-w-4xl mx-auto">
        <h2 className="font-bold text-2xl mb-6">{heading}</h2>
        {children}
      </div>
    </section>
  );
});

PageSection.displayName = "PageSection";

export {PageSection};