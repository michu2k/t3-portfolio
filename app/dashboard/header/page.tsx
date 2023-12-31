import React from "react";
import {api} from "~/trpc/server";
import {DashboardHeader} from "~/components/layouts/dashboard-header";
import {DashboardContent} from "~/components/layouts/dashboard-content";
import {HeaderForm} from "~/components/forms/header-form";

export default async function Page() {
  const snippets = await api.snippet.getSnippets.query({type: "HEADER", keys: ["heading", "description", "image"]});

  return (
    <>
      <DashboardHeader heading="Header" description="Header section settings" />
      <DashboardContent>
        <HeaderForm data={snippets} />
      </DashboardContent>
    </>
  );
}
