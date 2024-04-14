import React from "react";
import type {Metadata} from "next";
import {api} from "~/trpc/server";
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

export default async function Page({params: {id}}: PageProps) {
  const isNew = id === "new";
  const heading = isNew ? "Create" : "Edit";
  const description = isNew ? "Create a new contact method." : "Edit an existing contact method.";

  const contact = await api.contact.getItem.query({id});

  return (
    <>
      <PageHeader heading={heading} description={description} />
      <PageContent>
        <ContactItemForm contact={contact} />
      </PageContent>
    </>
  );
}
