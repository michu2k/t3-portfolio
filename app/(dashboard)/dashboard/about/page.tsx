import React from "react";
import {SnippetType} from "@prisma/client";
import type {Metadata} from "next";

import {AboutForm} from "~/components/dashboard/forms/about-form";
import {PageContent} from "~/components/dashboard/layouts/page-content";
import {PageHeader} from "~/components/dashboard/layouts/page-header";
import {ensureAuthenticated} from "~/server/auth";
import {getSnippetsByType} from "~/server/getSnippetsByType";
import {api} from "~/trpc/server";
import {extractSnippetValues} from "~/utils/extractSnippetValues";
import type {AboutMeSnippetsFormValues} from "~/utils/validations/about-me";

export const metadata: Metadata = {
  title: "Dashboard: About Me"
};

export default async function Page() {
  await ensureAuthenticated();

  const snippets = await getSnippetsByType(SnippetType.ABOUT_ME);

  const {image} = extractSnippetValues<keyof AboutMeSnippetsFormValues>(snippets);
  const currentImage = await api.image.getImage({key: image});

  return (
    <>
      <PageHeader heading="About" description="About section settings" />
      <PageContent>
        <AboutForm snippets={snippets} currentImage={currentImage} />
      </PageContent>
    </>
  );
}
