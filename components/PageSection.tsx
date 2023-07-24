import React from "react";
import type {PropsWithChildren} from "react";
import {cn} from "~/utils/className";

type PageSectionProps = PropsWithChildren<{
  id: string;
  heading: string;
  subheading: string;
  className?: string;
}>

const PageSection = ({id, heading, subheading, className, children}: PageSectionProps) => {

  const sectionClassName = cn("py-16 px-4 md:py-24 md:px-6 rounded", className);

  return (
    <section id={id} className={sectionClassName}>
      <div className="section-container">
        <p className="font-semibold text-md text-primary mb-2">{subheading}</p>
        <h2 className="font-bold text-3xl text-slate-900 mb-4">{heading}</h2>
        <hr className="h-1 w-10 mb-10 bg-primary border-0 rounded-md" />
        {children}
      </div>
    </section>
  );
};

export {PageSection};