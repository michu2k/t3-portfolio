import React from "react";
import {Heading} from "~/components/ui/heading";

type PageHeaderProps = {
  heading: string;
  description: string;
};

const PageHeader = ({heading, description}: PageHeaderProps) => {
  return (
    <>
      <div className="sticky top-0 z-30 flex h-14 items-center justify-center bg-background px-4 md:relative md:hidden">
        <span className="text-md font-poppins font-semibold">{heading}</span>
      </div>

      <header className="px-4 pt-2 md:px-10 md:pt-10">
        <div className="border-b border-muted lg:max-w-2xl">
          <Heading as="h1" size="lg">
            {heading}
          </Heading>
          <p className="pb-6 text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
      </header>
    </>
  );
};

export {PageHeader};
