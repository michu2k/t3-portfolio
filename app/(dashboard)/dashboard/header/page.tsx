import React from "react";
import type {Metadata} from "next";
import {DashboardHeader} from "~/components/dashboard/layouts/dashboard-header";
import {DashboardContent} from "~/components/dashboard/layouts/dashboard-content";
import {HeaderForm} from "~/components/dashboard/forms/header-form";

export const metadata: Metadata = {
  title: "Dashboard: Header"
};

export default function Page() {
  return (
    <>
      <DashboardHeader heading="Header" description="Header section settings" />
      <DashboardContent>
        <HeaderForm />
      </DashboardContent>
    </>
  );
}
