import React from "react";
import type {Metadata} from "next";
import {DashboardHeader} from "~/components/dashboard/layouts/dashboard-header";
import {DashboardContent} from "~/components/dashboard/layouts/dashboard-content";
import {ExperienceItemForm} from "~/components/dashboard/forms/experience-item-form";

export const metadata: Metadata = {
  title: "Dashboard: Experience"
};

type PageProps = {
  params: {
    id: string;
  };
};

export default function Page({params: {id}}: PageProps) {
  const isNew = id === "new";
  const heading = isNew ? "Create" : "Edit";
  const description = isNew ? "Create a new experience item." : "Edit an existing experience item.";

  return (
    <>
      <DashboardHeader heading={heading} description={description} />
      <DashboardContent>
        <ExperienceItemForm id={id} />
      </DashboardContent>
    </>
  );
}
