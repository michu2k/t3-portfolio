import React from "react";
import type {Metadata} from "next";
import {PageHeader} from "~/components/dashboard/layouts/page-header";
import {PageContent} from "~/components/dashboard/layouts/page-content";
import {SocialMediaList} from "~/components/dashboard/lists/social-media-list";

export const metadata: Metadata = {
  title: "Dashboard: Social media"
};

export default function Page() {
  return (
    <>
      <PageHeader heading="Social media" description="Social media settings" />
      <PageContent>
        <SocialMediaList />
      </PageContent>
    </>
  );
}
