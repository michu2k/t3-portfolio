import React from "react";
import type {Metadata} from "next";
import {AboutForm} from "~/components/dashboard/forms/about-form";
import {DashboardHeader} from "~/components/dashboard/layouts/dashboard-header";
import {DashboardContent} from "~/components/dashboard/layouts/dashboard-content";

export const metadata: Metadata = {
  title: "Dashboard: About Me"
};

export default function Page() {
  return (
    <>
      <DashboardHeader heading="About" description="About section settings" />
      <DashboardContent>
        <AboutForm />
      </DashboardContent>
    </>
  );
}
