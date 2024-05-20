import React from "react";
import type {Metadata} from "next";
import {api} from "~/trpc/server";
import {ensureAuthenticated} from "~/server/auth";
import {AboutForm} from "~/components/dashboard/forms/about-form";
import {PageHeader} from "~/components/dashboard/layouts/page-header";
import {PageContent} from "~/components/dashboard/layouts/page-content";

export const metadata: Metadata = {
  title: "Dashboard: About Me"
};

export default async function Page() {
  await ensureAuthenticated();

  const snippetsData = await api.snippet.getSnippets({type: "ABOUT_ME", keys: ["description", "image"]});

  return (
    <>
      <PageHeader heading="About" description="About section settings" />
      <PageContent>
        <AboutForm snippets={snippetsData} />
      </PageContent>
    </>
  );
}
