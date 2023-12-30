import React from "react";
import {api} from "~/trpc/server";
import {PageContent, PageHeader} from "~/components/dashboard/DashboardPage";
import {SocialMediaItems} from "~/components/dashboard/SocialMediaItems";

export default async function Page() {
  const data = await api.socialMedia.getItems.query();

  return (
    <>
      <PageHeader heading="Social media" description="Social media settings" />
      <PageContent>
        <SocialMediaItems socialMediaItems={data} />
      </PageContent>
    </>
  );
}
