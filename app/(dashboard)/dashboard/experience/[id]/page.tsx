import React from "react";
import type {Metadata} from "next";
import {PageHeader} from "~/components/dashboard/layouts/page-header";
import {PageContent} from "~/components/dashboard/layouts/page-content";
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
      <PageHeader heading={heading} description={description} />
      <PageContent>
        <ExperienceItemForm id={id} />
      </PageContent>
    </>
  );
}
