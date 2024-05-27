import React from "react";
import type {Metadata} from "next";
import {ensureAuthenticated} from "~/server/auth";
import {PageHeader} from "~/components/dashboard/layouts/page-header";
import {PageContent} from "~/components/dashboard/layouts/page-content";
import {HeaderForm} from "~/components/dashboard/forms/header-form";
import {getSnippetData} from "~/server/getSnippetData";
import {SnippetType} from "@prisma/client";

export const metadata: Metadata = {
  title: "Dashboard: Header"
};

export default async function Page() {
  await ensureAuthenticated();

  const snippets = await getSnippetData(SnippetType.HEADER);

  return (
    <>
      <PageHeader heading="Header" description="Header section settings" />
      <PageContent>
        <HeaderForm snippets={snippets} />
      </PageContent>
    </>
  );
}
