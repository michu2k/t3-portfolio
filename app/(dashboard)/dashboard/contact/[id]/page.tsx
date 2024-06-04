import React from "react";
import type {Metadata} from "next";

import {ContactItemForm} from "~/components/dashboard/forms/contact-item-form";
import {PageContent} from "~/components/dashboard/layouts/page-content";
import {PageHeader} from "~/components/dashboard/layouts/page-header";
import {ensureAuthenticated} from "~/server/auth";
import {api} from "~/trpc/server";

export const metadata: Metadata = {
  title: "Dashboard: Contact"
};

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({params: {id}}: PageProps) {
  await ensureAuthenticated();

  const isNew = id === "new";
  const heading = isNew ? "Create" : "Edit";
  const description = isNew ? "Create a new contact method." : "Edit an existing contact method.";

  const contact = await api.contact.getItem({id});

  return (
    <>
      <PageHeader heading={heading} description={description} />
      <PageContent>
        <ContactItemForm contact={contact} />
      </PageContent>
    </>
  );
}
