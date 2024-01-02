import React from "react";
import type {Metadata} from "next";
import {DashboardHeader} from "~/components/dashboard/layouts/dashboard-header";
import {DashboardContent} from "~/components/dashboard/layouts/dashboard-content";
import {SocialMediaItemForm} from "~/components/dashboard/forms/social-media-item-form";

export const metadata: Metadata = {
  title: "Dashboard: Social media"
};

type PageProps = {
  params: {
    id: string;
  };
};

export default function Page({params: {id}}: PageProps) {
  const isNew = id === "new";
  const heading = isNew ? "Create" : "Edit";
  const description = isNew ? "Create a new social media link." : "Edit an existing link.";

  return (
    <>
      <DashboardHeader heading={heading} description={description} />
      <DashboardContent>
        <SocialMediaItemForm id={id} />
      </DashboardContent>
    </>
  );
}
