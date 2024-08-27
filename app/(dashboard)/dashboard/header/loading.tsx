import React from "react";

import {HeaderFormSkeleton} from "~/components/dashboard/forms/header-form";
import {PageContent} from "~/components/dashboard/layouts/page-content";
import {PageHeader} from "~/components/dashboard/layouts/page-header";

export default function Loading() {
  return (
    <>
      <PageHeader heading="Header" description="Header section settings" />
      <PageContent>
        <HeaderFormSkeleton />
      </PageContent>
    </>
  );
}
