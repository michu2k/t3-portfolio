import React from "react";
import {api} from "~/trpc/server";
import {PageContent, PageHeader} from "~/components/dashboard/DashboardPage";
import {ProjectItems} from "~/components/dashboard/ProjectItems";

export default async function Page() {
  const data = await api.project.getItems.query();

  return (
    <>
      <PageHeader heading="Projects" description="Project section settings" />
      <PageContent>
        <ProjectItems projectItems={data} />
      </PageContent>
    </>
  );
}
