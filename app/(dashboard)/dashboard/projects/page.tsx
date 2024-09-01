import React, {Suspense} from "react";
import type {Metadata} from "next";

import {PageContent} from "~/components/dashboard/layouts/page-content";
import {PageHeader} from "~/components/dashboard/layouts/page-header";
import {ProjectList, ProjectListSkeleton} from "~/components/dashboard/lists/project-list";
import {ensureAuthenticated} from "~/server/auth";
import {api} from "~/trpc/server";

export const metadata: Metadata = {
  title: "Dashboard: Projects"
};

export default async function Page() {
  await ensureAuthenticated();

  return (
    <>
      <PageHeader heading="Projects" description="Project section settings" />
      <PageContent>
        <Suspense fallback={<ProjectListSkeleton />}>
          <ProjectListWrapper />
        </Suspense>
      </PageContent>
    </>
  );
}

const ProjectListWrapper = async () => {
  const projects = await api.project.getItems();

  return <ProjectList projects={projects} />;
};
