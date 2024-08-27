import React from "react";

import {AboutFormSkeleton} from "~/components/dashboard/forms/about-form";
import {PageContent} from "~/components/dashboard/layouts/page-content";
import {PageHeader} from "~/components/dashboard/layouts/page-header";

export default function Loading() {
  return (
    <>
      <PageHeader heading="About" description="About section settings" />
      <PageContent>
        <AboutFormSkeleton />
      </PageContent>
    </>
  );
}
