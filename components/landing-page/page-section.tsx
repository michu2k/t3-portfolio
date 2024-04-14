import React from "react";
import type {PropsWithChildren} from "react";
import {Heading} from "~/components/ui/heading";
import {cn} from "~/utils/className";

type PageSectionProps = PropsWithChildren<{
  id: string;
  heading: string;
  subheading: string;
  className?: string;
}>;

const PageSection = ({id, heading, subheading, className, children}: PageSectionProps) => {
  return (
    <section id={id} className={cn("px-4 py-20 md:px-6 md:py-28", className)}>
      <div className="section-container">
        <div className="flex flex-col gap-2 pb-14">
          <p className="text-md font-poppins font-semibold text-primary">{subheading}</p>
          <Heading as="h2" size="2xl">
            {heading}
          </Heading>
        </div>

        {children}
      </div>
    </section>
  );
};

export {PageSection};
