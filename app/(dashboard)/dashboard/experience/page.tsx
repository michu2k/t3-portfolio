import React from "react";
import type {Metadata} from "next";

import {PageContent} from "~/components/dashboard/layouts/page-content";
import {PageHeader} from "~/components/dashboard/layouts/page-header";
import {ExperienceList} from "~/components/dashboard/lists/experience-list";
import {ensureAuthenticated} from "~/server/auth";
import {api} from "~/trpc/server";

export const metadata: Metadata = {
  title: "Dashboard: Experience"
};

export default async function Page() {
  await ensureAuthenticated();

  const experience = await api.experience.getItems();

  return (
    <>
      <PageHeader heading="Experience" description="Experience section settings" />
      <PageContent>
        <ExperienceList experience={experience} />
      </PageContent>
    </>
  );
}
