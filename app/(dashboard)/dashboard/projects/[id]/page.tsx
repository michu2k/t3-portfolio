import React from "react";
import type {Metadata} from "next";
import {api} from "~/trpc/server";
import {PageHeader} from "~/components/dashboard/layouts/page-header";
import {PageContent} from "~/components/dashboard/layouts/page-content";
import {ProjectItemForm} from "~/components/dashboard/forms/project-item-form";

export const metadata: Metadata = {
  title: "Dashboard: Projects"
};

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({params: {id}}: PageProps) {
  const isNew = id === "new";
  const heading = isNew ? "Create" : "Edit";
  const description = isNew ? "Create a new project item." : "Edit an existing project item.";

  const project = await api.project.getItem.query({id});

  return (
    <>
      <PageHeader heading={heading} description={description} />
      <PageContent>
        <ProjectItemForm project={project} />
      </PageContent>
    </>
  );
}
