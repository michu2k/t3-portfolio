import React from "react";
import type {Metadata} from "next";
import {DashboardHeader} from "~/components/dashboard/layouts/dashboard-header";
import {DashboardContent} from "~/components/dashboard/layouts/dashboard-content";
import {SocialMediaList} from "~/components/dashboard/lists/social-media-list";

export const metadata: Metadata = {
  title: "Dashboard: Social media"
};

export default function Page() {
  return (
    <>
      <DashboardHeader heading="Social media" description="Social media settings" />
      <DashboardContent>
        <SocialMediaList />
      </DashboardContent>
    </>
  );
}
