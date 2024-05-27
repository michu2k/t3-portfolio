import React from "react";
import type {Metadata} from "next";

import {PageContent} from "~/components/dashboard/layouts/page-content";
import {PageHeader} from "~/components/dashboard/layouts/page-header";
import {SocialMediaList} from "~/components/dashboard/lists/social-media-list";
import {ensureAuthenticated} from "~/server/auth";
import {api} from "~/trpc/server";

export const metadata: Metadata = {
  title: "Dashboard: Social media"
};

export default async function Page() {
  await ensureAuthenticated();

  const socialMediaLinks = await api.socialMedia.getItems();

  return (
    <>
      <PageHeader heading="Social media" description="Social media settings" />
      <PageContent>
        <SocialMediaList socialMediaLinks={socialMediaLinks} />
      </PageContent>
    </>
  );
}
