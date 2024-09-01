import React, {Suspense} from "react";
import type {Metadata} from "next";

import {ExperienceItemForm, ExperienceItemFormSkeleton} from "~/components/dashboard/forms/experience-item-form";
import {PageContent} from "~/components/dashboard/layouts/page-content";
import {PageHeader} from "~/components/dashboard/layouts/page-header";
import {ensureAuthenticated} from "~/server/auth";
import {api} from "~/trpc/server";

export const metadata: Metadata = {
  title: "Dashboard: Experience"
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
  const description = isNew ? "Create a new experience item." : "Edit an existing experience item.";

  return (
    <>
      <PageHeader heading={heading} description={description} />
      <PageContent>
        <Suspense fallback={<ExperienceItemFormSkeleton />}>
          <ExperienceItemFormWrapper id={id} />
        </Suspense>
      </PageContent>
    </>
  );
}

const ExperienceItemFormWrapper = async ({id}: {id: string}) => {
  const isNew = id === "new";
  const experienceItem = isNew ? null : await api.experience.getItem({id});

  return <ExperienceItemForm experienceItem={experienceItem} />;
};
