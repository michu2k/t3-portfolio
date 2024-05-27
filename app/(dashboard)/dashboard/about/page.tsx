import React from "react";
import type {Metadata} from "next";
import {ensureAuthenticated} from "~/server/auth";
import {AboutForm} from "~/components/dashboard/forms/about-form";
import {PageHeader} from "~/components/dashboard/layouts/page-header";
import {PageContent} from "~/components/dashboard/layouts/page-content";
import {getSnippetData} from "~/server/getSnippetData";
import {SnippetType} from "@prisma/client";

export const metadata: Metadata = {
  title: "Dashboard: About Me"
};

export default async function Page() {
  await ensureAuthenticated();

  const snippets = await getSnippetData(SnippetType.ABOUT_ME);

  return (
    <>
      <PageHeader heading="About" description="About section settings" />
      <PageContent>
        <AboutForm snippets={snippets} />
      </PageContent>
    </>
  );
}
