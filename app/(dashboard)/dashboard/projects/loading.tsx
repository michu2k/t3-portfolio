import React from "react";

import {PageContent} from "~/components/dashboard/layouts/page-content";
import {PageHeader} from "~/components/dashboard/layouts/page-header";
import {ProjectListSkeleton} from "~/components/dashboard/lists/project-list";

export default function Loading() {
  return (
    <>
      <PageHeader heading="Projects" description="Project section settings" />
      <PageContent>
        <ProjectListSkeleton />
      </PageContent>
    </>
  );
}
