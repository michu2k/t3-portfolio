import React, { Fragment } from "react";

import {
  Breadcrumb,
  type BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbListItem,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "~/components/ui/breadcrumb";
import { Heading } from "~/components/ui/heading";

type PageHeaderProps = {
  heading: string;
  description: string;
  breadcrumbs?: Array<BreadcrumbItem>;
};

export const PageHeader = ({ heading, description, breadcrumbs = [] }: PageHeaderProps) => {
  function displayBreadcrumbItems() {
    return breadcrumbs?.map(({ label, href }, idx) => (
      <Fragment key={idx}>
        <BreadcrumbListItem>
          {href ? <BreadcrumbLink href={href}>{label}</BreadcrumbLink> : <BreadcrumbPage>{label}</BreadcrumbPage>}
        </BreadcrumbListItem>

        {idx !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
      </Fragment>
    ));
  }

  return (
    <div className="px-4 md:px-10">
      <div className="relative h-16 md:h-auto">
        <header className="border-muted bg-background fixed top-0 right-4 left-4 z-30 flex h-16 flex-col items-center justify-center border-b text-center md:static md:block md:h-auto md:py-6 md:text-left lg:max-w-2xl">
          <Heading as="h1" size="xl" className="text-md md:text-xl">
            {heading}
          </Heading>
          <p className="text-muted-foreground text-xs leading-4 md:leading-6">{description}</p>
        </header>
      </div>

      {breadcrumbs?.length ? (
        <Breadcrumb className="border-muted border-b py-2 lg:max-w-2xl">
          <BreadcrumbList>{displayBreadcrumbItems()}</BreadcrumbList>
        </Breadcrumb>
      ) : null}
    </div>
  );
};
