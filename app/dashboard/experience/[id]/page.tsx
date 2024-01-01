import React from "react";
import type {Metadata} from "next";
import {api} from "~/trpc/server";
import {DashboardHeader} from "~/components/layouts/dashboard-header";
import {DashboardContent} from "~/components/layouts/dashboard-content";
import {ExperienceItemForm} from "~/components/forms/experience-item-form";

export const metadata: Metadata = {
  title: "Dashboard: Experience"
};

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({params: {id}}: PageProps) {
  const isNew = id === "new";
  const heading = isNew ? "Create" : "Edit";
  const description = isNew ? "Create a new experience item." : "Edit an existing experience item.";

  const data = await api.experience.getItem.query({id});

  return (
    <>
      <DashboardHeader heading={heading} description={description} />
      <DashboardContent>
        <ExperienceItemForm data={data} />
      </DashboardContent>
    </>
  );
}
