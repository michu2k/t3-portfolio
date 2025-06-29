import * as React from "react";

import { Heading } from "~/components/ui/heading";

type PageHeaderProps = {
  heading: string;
  description: string;
};

const PageHeader = ({ heading, description }: PageHeaderProps) => {
  return (
    <div className="relative h-16 md:h-auto">
      <header className="border-muted bg-background fixed top-0 right-0 left-0 z-30 mx-4 flex h-16 flex-col items-center justify-center border-b text-center md:relative md:mx-10 md:block md:h-auto md:py-6 md:text-left lg:max-w-2xl">
        <Heading as="h1" size="xl" className="text-md md:text-xl">
          {heading}
        </Heading>
        <p className="text-muted-foreground text-xs leading-4 md:leading-6">{description}</p>
      </header>
    </div>
  );
};

export { PageHeader };
