import React from "react";

import {PageContent} from "~/components/dashboard/layouts/page-content";
import {PageHeader} from "~/components/dashboard/layouts/page-header";
import {ExperienceListSkeleton} from "~/components/dashboard/lists/experience-list";

export default function Loading() {
  return (
    <>
      <PageHeader heading="Experience" description="Experience section settings" />
      <PageContent>
        <ExperienceListSkeleton />
      </PageContent>
    </>
  );
}
