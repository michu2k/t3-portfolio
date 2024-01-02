import React from "react";
import type {Metadata} from "next";
import {DashboardHeader} from "~/components/dashboard/layouts/dashboard-header";
import {DashboardContent} from "~/components/dashboard/layouts/dashboard-content";
import {ProjectItemForm} from "~/components/dashboard/forms/project-item-form";

export const metadata: Metadata = {
  title: "Dashboard: Projects"
};

type PageProps = {
  params: {
    id: string;
  };
};

export default function Page({params: {id}}: PageProps) {
  const isNew = id === "new";
  const heading = isNew ? "Create" : "Edit";
  const description = isNew ? "Create a new project item." : "Edit an existing project item.";

  return (
    <>
      <DashboardHeader heading={heading} description={description} />
      <DashboardContent>
        <ProjectItemForm id={id} />
      </DashboardContent>
    </>
  );
}
