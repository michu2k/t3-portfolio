import React from "react";
import {PageContent, PageHeader} from "~/components/dashboard/DashboardPage";
import {GeneralForm} from "~/components/dashboard/GeneralForm";

export default function Page() {
  return (
    <>
      <PageHeader heading="General" description="General page settings" />
      <PageContent>
        <GeneralForm />
      </PageContent>
    </>
  );
}
