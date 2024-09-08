import React, {Suspense} from "react";
import {SnippetType} from "@prisma/client";
import type {Metadata} from "next";

import {AboutForm, AboutFormSkeleton} from "~/components/dashboard/forms/about-form";
import {PageContent} from "~/components/dashboard/layouts/page-content";
import {PageHeader} from "~/components/dashboard/layouts/page-header";
import {ensureAuthenticated} from "~/server/auth";
import {api} from "~/trpc/server";
import {extractSnippetValues} from "~/utils/extractSnippetValues";
import type {AboutMeSnippetsFormValues} from "~/utils/validations/about-me";

export const metadata: Metadata = {
  title: "Dashboard: About Me"
};

export default async function Page() {
  await ensureAuthenticated();

  return (
    <>
      <PageHeader heading="About" description="About section settings" />
      <PageContent>
        <Suspense fallback={<AboutFormSkeleton />}>
          <AboutFormWrapper />
        </Suspense>
      </PageContent>
    </>
  );
}

const AboutFormWrapper = async () => {
  const snippets = await api.snippet.getSnippetsByType({type: SnippetType.ABOUT_ME});

  const {image} = extractSnippetValues<keyof AboutMeSnippetsFormValues>(snippets);
  const currentImage = await api.image.getImage({key: image});

  return <AboutForm snippets={snippets} currentImage={currentImage} />;
};
