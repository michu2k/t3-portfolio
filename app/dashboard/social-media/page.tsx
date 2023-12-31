import React from "react";
import {api} from "~/trpc/server";
import {DashboardHeader} from "~/components/layouts/dashboard-header";
import {DashboardContent} from "~/components/layouts/dashboard-content";
import {SocialMediaList} from "~/components/lists/social-media-list";

export default async function Page() {
  const data = await api.socialMedia.getItems.query();

  return (
    <>
      <DashboardHeader heading="Social media" description="Social media settings" />
      <DashboardContent>
        <SocialMediaList socialMediaLinks={data} />
      </DashboardContent>
    </>
  );
}
