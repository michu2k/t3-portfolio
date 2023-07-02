import React, {memo} from "react";
import type {PropsWithChildren} from "react";
import cn from "classnames";

type PageSectionProps = PropsWithChildren<{
  heading: string;
  className?: string;
}>

const PageSection = memo(({heading, className, children}: PageSectionProps) => {

  const sectionClassName = cn("py-16 px-4 md:py-20 md:px-6 rounded", className);

  return (
    <section className={sectionClassName}>
      <div className="max-w-xl md:max-w-5xl mx-auto">
        <h2 className="font-bold text-3xl mb-4">{heading}</h2>
        <hr className="h-1 w-10 mb-10 bg-primary border-0 rounded-md" />
        {children}
      </div>
    </section>
  );
});

PageSection.displayName = "PageSection";

export {PageSection};