import React from "react";

import {PageContent} from "~/components/dashboard/layouts/page-content";
import {PageHeader} from "~/components/dashboard/layouts/page-header";
import {SocialMediaListSkeleton} from "~/components/dashboard/lists/social-media-list";

export default function Loading() {
  return (
    <>
      <PageHeader heading="Social media" description="Social media settings" />
      <PageContent>
        <SocialMediaListSkeleton />
      </PageContent>
    </>
  );
}
