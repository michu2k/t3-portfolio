import React from "react";
import {api} from "~/trpc/server";
import {AboutForm} from "~/components/dashboard/AboutForm";
import {PageContent, PageHeader} from "~/components/dashboard/DashboardPage";

export default async function Page() {
  const snippets = await api.snippet.getSnippets.query({type: "ABOUT_ME", keys: ["description", "image"]});

  return (
    <>
      <PageHeader heading="About" description="About section settings" />
      <PageContent>
        <AboutForm data={snippets} />
      </PageContent>
    </>
  );
}
