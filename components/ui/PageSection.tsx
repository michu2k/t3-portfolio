import React from "react";
import type {PropsWithChildren} from "react";
import {cn} from "~/utils/className";
import {Heading} from "./Heading";

type PageSectionProps = PropsWithChildren<{
  id: string;
  heading: string;
  subheading: string;
  className?: string;
}>;

const PageSection = ({id, heading, subheading, className, children}: PageSectionProps) => {
  return (
    <section id={id} className={cn("px-4 py-16 md:px-6 md:py-24", className)}>
      <div className="section-container">
        <p className="text-md mb-2 font-poppins font-semibold text-primary">{subheading}</p>
        <Heading as="h2" size="xl">
          {heading}
        </Heading>
        <hr className="mb-12 h-0.5 w-8 rounded-md border-0 bg-primary" />
        {children}
      </div>
    </section>
  );
};

export {PageSection};
