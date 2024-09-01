import React, {Suspense} from "react";
import type {Metadata} from "next";

import {ProjectItemForm, ProjectItemFormSkeleton} from "~/components/dashboard/forms/project-item-form";
import {PageContent} from "~/components/dashboard/layouts/page-content";
import {PageHeader} from "~/components/dashboard/layouts/page-header";
import {ensureAuthenticated} from "~/server/auth";
import {api} from "~/trpc/server";

export const metadata: Metadata = {
  title: "Dashboard: Projects"
};

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({params: {id}}: PageProps) {
  await ensureAuthenticated();

  const isNew = id === "new";
  const heading = isNew ? "Create" : "Edit";
  const description = isNew ? "Create a new project item." : "Edit an existing project item.";

  return (
    <>
      <PageHeader heading={heading} description={description} />
      <PageContent>
        <Suspense fallback={<ProjectItemFormSkeleton />}>
          <ProjectItemFormWrapper id={id} />
        </Suspense>
      </PageContent>
    </>
  );
}

const ProjectItemFormWrapper = async ({id}: {id: string}) => {
  const isNew = id === "new";
  const project = isNew ? null : await api.project.getItem({id});

  return <ProjectItemForm project={project} />;
};
