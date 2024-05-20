import React from "react";
import type {Metadata} from "next";
import {api} from "~/trpc/server";
import {ensureAuthenticated} from "~/server/auth";
import {PageHeader} from "~/components/dashboard/layouts/page-header";
import {PageContent} from "~/components/dashboard/layouts/page-content";
import {ExperienceList} from "~/components/dashboard/lists/experience-list";

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
