import React from "react";
import {api} from "~/trpc/server";
import {PageContent, PageHeader} from "~/components/dashboard/DashboardPage";
import {HeaderForm} from "~/components/dashboard/HeaderForm";

export default async function Page() {
  const snippets = await api.snippet.getSnippets.query({type: "HEADER", keys: ["heading", "description", "image"]});

  return (
    <>
      <PageHeader heading="Header" description="Header section settings" />
      <PageContent>
        <HeaderForm data={snippets} />
      </PageContent>
    </>
  );
}
