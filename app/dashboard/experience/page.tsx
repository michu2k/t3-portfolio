import React from "react";
import {api} from "~/trpc/server";
import {DashboardHeader} from "~/components/layouts/dashboard-header";
import {DashboardContent} from "~/components/layouts/dashboard-content";
import {ExperienceList} from "~/components/lists/experience-list";

export default async function Page() {
  const data = await api.experience.getItems.query();

  return (
    <>
      <DashboardHeader heading="Experience" description="Experience section settings" />
      <DashboardContent>
        <ExperienceList experience={data} />
      </DashboardContent>
    </>
  );
}
