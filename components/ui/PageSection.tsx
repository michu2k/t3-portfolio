import React from "react";
import type {PropsWithChildren} from "react";
import {Heading} from "./Heading";

type PageSectionProps = PropsWithChildren<{
  id: string;
  heading: string;
  subheading: string;
}>;

const PageSection = ({id, heading, subheading, children}: PageSectionProps) => {
  return (
    <section id={id} className="px-4 py-16 md:px-6 md:py-24">
      <div className="section-container">
        <div className="flex flex-col gap-2 pb-14">
          <p className="text-md font-poppins font-semibold text-primary">{subheading}</p>
          <Heading as="h2" size="xl">
            {heading}
          </Heading>
        </div>

        {children}
      </div>
    </section>
  );
};

export {PageSection};
