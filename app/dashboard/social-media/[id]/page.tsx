import React from "react";
import {api} from "~/trpc/server";
import {PageContent, PageHeader} from "~/components/dashboard/DashboardPage";
import {SocialMediaItemForm} from "~/components/dashboard/SocialMediaItemForm";

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
      <PageHeader heading={heading} description={description} />
      <PageContent>
        <SocialMediaItemForm data={data} />
      </PageContent>
    </>
  );
}
