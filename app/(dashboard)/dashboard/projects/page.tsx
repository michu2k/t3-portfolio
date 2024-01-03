import React from "react";
import type {Metadata} from "next";
import {PageHeader} from "~/components/dashboard/layouts/page-header";
import {PageContent} from "~/components/dashboard/layouts/page-content";
import {ProjectList} from "~/components/dashboard/lists/project-list";

export const metadata: Metadata = {
  title: "Dashboard: Projects"
};

export default function Page() {
  return (
    <>
      <PageHeader heading="Projects" description="Project section settings" />
      <PageContent>
        <ProjectList />
      </PageContent>
    </>
  );
}
