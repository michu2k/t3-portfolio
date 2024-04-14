import React from "react";
import type {Metadata} from "next";
import {PageHeader} from "~/components/dashboard/layouts/page-header";
import {PageContent} from "~/components/dashboard/layouts/page-content";
import {HeaderForm} from "~/components/dashboard/forms/header-form";
import {api} from "~/trpc/server";

export const metadata: Metadata = {
  title: "Dashboard: Header"
};

export default async function Page() {
  const snippetsData = await api.snippet.getSnippets.query({type: "HEADER", keys: ["heading", "description", "image"]});

  return (
    <>
      <PageHeader heading="Header" description="Header section settings" />
      <PageContent>
        <HeaderForm snippets={snippetsData} />
      </PageContent>
    </>
  );
}
