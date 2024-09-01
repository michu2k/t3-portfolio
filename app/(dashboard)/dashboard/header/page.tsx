import React, {Suspense} from "react";
import {SnippetType} from "@prisma/client";
import type {Metadata} from "next";

import {HeaderForm, HeaderFormSkeleton} from "~/components/dashboard/forms/header-form";
import {PageContent} from "~/components/dashboard/layouts/page-content";
import {PageHeader} from "~/components/dashboard/layouts/page-header";
import {ensureAuthenticated} from "~/server/auth";
import {getSnippetsByType} from "~/server/getSnippetsByType";

export const metadata: Metadata = {
  title: "Dashboard: Header"
};

export default async function Page() {
  await ensureAuthenticated();

  return (
    <>
      <PageHeader heading="Header" description="Header section settings" />
      <PageContent>
        <Suspense fallback={<HeaderFormSkeleton />}>
          <HeaderFormWrapper />
        </Suspense>
      </PageContent>
    </>
  );
}

const HeaderFormWrapper = async () => {
  const snippets = await getSnippetsByType(SnippetType.HEADER);

  return <HeaderForm snippets={snippets} />;
};
