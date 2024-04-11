import React from "react";
import {Heading} from "~/components/ui/heading";

type PageHeaderProps = {
  heading: string;
  description: string;
};

const PageHeader = ({heading, description}: PageHeaderProps) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 flex-col items-center justify-center border-b border-muted bg-background px-4 md:relative md:block md:h-auto md:px-10 md:py-6">
      <div className="text-center md:text-left lg:max-w-2xl">
        <Heading as="h1" size="xl" className="text-md md:text-xl">
          {heading}
        </Heading>
        <p className="text-xs leading-4 text-muted-foreground md:leading-6">{description}</p>
      </div>
    </header>
  );
};

export {PageHeader};
