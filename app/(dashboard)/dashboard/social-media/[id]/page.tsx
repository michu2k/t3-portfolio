import React, { Suspense } from "react";
import type { Metadata } from "next";

import { SocialMediaItemForm, SocialMediaItemFormSkeleton } from "~/components/dashboard/forms/social-media-item-form";
import { PageContent } from "~/components/dashboard/layouts/page-content";
import { PageHeader } from "~/components/dashboard/layouts/page-header";
import { ensureAuthenticated } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export const metadata: Metadata = {
  title: "Dashboard: Social media"
};

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  await ensureAuthenticated();

  const isNew = id === "new";
  const heading = isNew ? "Create" : "Edit";
  const description = isNew ? "Create a new social media link." : "Edit an existing link.";

  return (
    <HydrateClient>
      <PageHeader heading={heading} description={description} />
      <PageContent>
        <Suspense fallback={<SocialMediaItemFormSkeleton />}>
          <SocialMediaItemFormWrapper id={id} />
        </Suspense>
      </PageContent>
    </HydrateClient>
  );
}

const SocialMediaItemFormWrapper = async ({ id }: { id: string }) => {
  const isNew = id === "new";
  const socialMediaLink = isNew ? null : await api.socialMedia.getItem({ id });

  return <SocialMediaItemForm socialMediaLink={socialMediaLink} />;
};
