import React from "react";
import {api} from "~/trpc/server";
import {AboutForm} from "~/components/forms/about-form";
import {DashboardHeader} from "~/components/layouts/dashboard-header";
import {DashboardContent} from "~/components/layouts/dashboard-content";

export default async function Page() {
  const snippets = await api.snippet.getSnippets.query({type: "ABOUT_ME", keys: ["description", "image"]});

  return (
    <>
      <DashboardHeader heading="About" description="About section settings" />
      <DashboardContent>
        <AboutForm data={snippets} />
      </DashboardContent>
    </>
  );
}
