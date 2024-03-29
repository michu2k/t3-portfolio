import React from "react";
import type {Metadata} from "next";
import {api} from "~/trpc/server";
import {PageHeader} from "~/components/dashboard/layouts/page-header";
import {PageContent} from "~/components/dashboard/layouts/page-content";
import {SocialMediaItemForm} from "~/components/dashboard/forms/social-media-item-form";

export const metadata: Metadata = {
  title: "Dashboard: Social media"
};

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({params: {id}}: PageProps) {
  const isNew = id === "new";
  const heading = isNew ? "Create" : "Edit";
  const description = isNew ? "Create a new social media link." : "Edit an existing link.";

  const socialMediaLink = await api.socialMedia.getItem.query({id});

  return (
    <>
      <PageHeader heading={heading} description={description} />
      <PageContent>
        <SocialMediaItemForm socialMediaLink={socialMediaLink} />
      </PageContent>
    </>
  );
}
