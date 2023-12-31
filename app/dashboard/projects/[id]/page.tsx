import React from "react";
import {api} from "~/trpc/server";
import {DashboardHeader} from "~/components/layouts/dashboard-header";
import {DashboardContent} from "~/components/layouts/dashboard-content";
import {ProjectItemForm} from "~/components/forms/project-item-form";

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
      <DashboardHeader heading={heading} description={description} />
      <DashboardContent>
        <ProjectItemForm data={data} />
      </DashboardContent>
    </>
  );
}
