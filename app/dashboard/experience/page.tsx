import React from "react";
import {api} from "~/trpc/server";
import {PageContent, PageHeader} from "~/components/dashboard/DashboardPage";
import {ExperienceItems} from "~/components/dashboard/ExperienceItems";

export default async function Page() {
  const data = await api.experience.getItems.query();

  return (
    <>
      <PageHeader heading="Experience" description="Experience section settings" />
      <PageContent>
        <ExperienceItems experienceItems={data} />
      </PageContent>
    </>
  );
}
