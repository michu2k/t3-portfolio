import React, { Suspense } from "react";
import type { Metadata } from "next";

import { AboutForm, AboutFormSkeleton } from "~/components/dashboard/forms/about-form";
import { PageContent } from "~/components/dashboard/layouts/page-content";
import { PageHeader } from "~/components/dashboard/layouts/page-header";
import { SnippetType } from "~/prisma/generated/client";
import { ensureAuthenticated } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { extractSnippetValues } from "~/utils/extract-snippet-values";

export const metadata: Metadata = {
  title: "Dashboard: About Me"
};

export default async function Page() {
  await ensureAuthenticated();

  return (
    <HydrateClient>
      <PageHeader heading="About" description="About section settings" />
      <PageContent>
        <Suspense fallback={<AboutFormSkeleton />}>
          <AboutFormWrapper />
        </Suspense>
      </PageContent>
    </HydrateClient>
  );
}

const AboutFormWrapper = async () => {
  const snippets = await api.snippet.getSnippetsByType({ type: SnippetType.ABOUT_ME });

  const { image } = extractSnippetValues<typeof SnippetType.ABOUT_ME>(snippets);
  const currentImage = await api.image.getImage({ key: image });

  return <AboutForm snippets={snippets} currentImage={currentImage} />;
};
