import React from "react";
import {SnippetType} from "@prisma/client";
import type {Metadata} from "next";

import {HeaderForm} from "~/components/dashboard/forms/header-form";
import {PageContent} from "~/components/dashboard/layouts/page-content";
import {PageHeader} from "~/components/dashboard/layouts/page-header";
import {ensureAuthenticated} from "~/server/auth";
import {getSnippetData} from "~/server/getSnippetData";

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
