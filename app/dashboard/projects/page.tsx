import React from "react";
import type {Metadata} from "next";
import {api} from "~/trpc/server";
import {DashboardHeader} from "~/components/layouts/dashboard-header";
import {DashboardContent} from "~/components/layouts/dashboard-content";
import {ProjectList} from "~/components/lists/project-list";

export const metadata: Metadata = {
  title: "Dashboard: Projects"
};

export default async function Page() {
  const data = await api.project.getItems.query();

  return (
    <>
      <DashboardHeader heading="Projects" description="Project section settings" />
      <DashboardContent>
        <ProjectList projects={data} />
      </DashboardContent>
    </>
  );
}
