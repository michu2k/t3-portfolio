import React from "react";
import type {Metadata} from "next";
import {PageHeader} from "~/components/dashboard/layouts/page-header";
import {PageContent} from "~/components/dashboard/layouts/page-content";
import {ContactItemForm} from "~/components/dashboard/forms/contact-item-form";

export const metadata: Metadata = {
  title: "Dashboard: Contact"
};

type PageProps = {
  params: {
    id: string;
  };
};

export default function Page({params: {id}}: PageProps) {
  const isNew = id === "new";
  const heading = isNew ? "Create" : "Edit";
  const description = isNew ? "Create a new contact method." : "Edit an existing contact method.";

  return (
    <>
      <PageHeader heading={heading} description={description} />
      <PageContent>
        <ContactItemForm id={id} />
      </PageContent>
    </>
  );
}
