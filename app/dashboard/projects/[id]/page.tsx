import React from "react";
import {api} from "~/trpc/server";
import {PageContent, PageHeader} from "~/components/dashboard/DashboardPage";
import {ProjectItemForm} from "~/components/dashboard/ProjectItemForm";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({params: {id}}: PageProps) {
  const isNew = id === "new";
  const heading = isNew ? "Create" : "Edit";
  const description = isNew ? "Create a new project item." : "Edit an existing project item.";

  const data = await api.project.getItem.query({id});

  return (
    <>
      <PageHeader heading={heading} description={description} />
      <PageContent>
        <ProjectItemForm data={data} />
      </PageContent>
    </>
  );
}
