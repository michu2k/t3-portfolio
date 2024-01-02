import React from "react";
import type {Metadata} from "next";
import {DashboardHeader} from "~/components/dashboard/layouts/dashboard-header";
import {DashboardContent} from "~/components/dashboard/layouts/dashboard-content";
import {ProjectList} from "~/components/dashboard/lists/project-list";

export const metadata: Metadata = {
  title: "Dashboard: Projects"
};

export default function Page() {
  return (
    <>
      <DashboardHeader heading="Projects" description="Project section settings" />
      <DashboardContent>
        <ProjectList />
      </DashboardContent>
    </>
  );
}
