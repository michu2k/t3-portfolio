import React from "react";
import {api} from "~/trpc/server";
import {DashboardHeader} from "~/components/layouts/dashboard-header";
import {DashboardContent} from "~/components/layouts/dashboard-content";
import {SocialMediaItemForm} from "~/components/forms/social-media-item-form";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({params: {id}}: PageProps) {
  const isNew = id === "new";
  const heading = isNew ? "Create" : "Edit";
  const description = isNew ? "Create a new social media link." : "Edit an existing link.";

  const data = await api.socialMedia.getItem.query({id});

  return (
    <>
      <DashboardHeader heading={heading} description={description} />
      <DashboardContent>
        <SocialMediaItemForm data={data} />
      </DashboardContent>
    </>
  );
}
