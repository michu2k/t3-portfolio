import React from "react";
import type {Metadata} from "next";
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

export default function Page({params: {id}}: PageProps) {
  const isNew = id === "new";
  const heading = isNew ? "Create" : "Edit";
  const description = isNew ? "Create a new social media link." : "Edit an existing link.";

  return (
    <>
      <PageHeader heading={heading} description={description} />
      <PageContent>
        <SocialMediaItemForm id={id} />
      </PageContent>
    </>
  );
}
