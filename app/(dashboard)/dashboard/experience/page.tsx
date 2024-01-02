import React from "react";
import type {Metadata} from "next";
import {DashboardHeader} from "~/components/dashboard/layouts/dashboard-header";
import {DashboardContent} from "~/components/dashboard/layouts/dashboard-content";
import {ExperienceList} from "~/components/dashboard/lists/experience-list";

export const metadata: Metadata = {
  title: "Dashboard: Experience"
};

export default function Page() {
  return (
    <>
      <DashboardHeader heading="Experience" description="Experience section settings" />
      <DashboardContent>
        <ExperienceList />
      </DashboardContent>
    </>
  );
}
