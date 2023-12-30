import React from "react";
import {api} from "~/trpc/server";
import {PageContent, PageHeader} from "~/components/dashboard/DashboardPage";
import {ExperienceItemForm} from "~/components/dashboard/ExperienceItemForm";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({params: {id}}: PageProps) {
  const isNew = id === "new";
  const heading = isNew ? "Create" : "Edit";
  const description = isNew ? "Create a new experience item." : "Edit an existing experience item.";

  const data = await api.experience.getItem.query({id});

  return (
    <>
      <PageHeader heading={heading} description={description} />
      <PageContent>
        <ExperienceItemForm data={data} />
      </PageContent>
    </>
  );
}
