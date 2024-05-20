import React from "react";
import type {Metadata} from "next";
import {api} from "~/trpc/server";
import {ensureAuthenticated} from "~/server/auth";
import {PageHeader} from "~/components/dashboard/layouts/page-header";
import {PageContent} from "~/components/dashboard/layouts/page-content";
import {ProjectList} from "~/components/dashboard/lists/project-list";

export const metadata: Metadata = {
  title: "Dashboard: Projects"
};

export default async function Page() {
  await ensureAuthenticated();

  const projects = await api.project.getItems();

  return (
    <>
      <PageHeader heading="Projects" description="Project section settings" />
      <PageContent>
        <ProjectList projects={projects} />
      </PageContent>
    </>
  );
}
