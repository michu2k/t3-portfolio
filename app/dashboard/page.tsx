import React from "react";
import {DashboardHeader} from "~/components/layouts/dashboard-header";
import {DashboardContent} from "~/components/layouts/dashboard-content";
import {GeneralForm} from "~/components/forms/general-form";

export default function Page() {
  return (
    <>
      <DashboardHeader heading="General" description="General page settings" />
      <DashboardContent>
        <GeneralForm />
      </DashboardContent>
    </>
  );
}
