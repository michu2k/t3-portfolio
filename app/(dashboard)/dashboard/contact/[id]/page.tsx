import React, {Suspense} from "react";
import type {Metadata} from "next";

import {ContactItemForm, ContactItemFormSkeleton} from "~/components/dashboard/forms/contact-item-form";
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

  return (
    <>
      <PageHeader heading={heading} description={description} />
      <PageContent>
        <Suspense fallback={<ContactItemFormSkeleton />}>
          <ContactItemFormWrapper id={id} />
        </Suspense>
      </PageContent>
    </>
  );
}

const ContactItemFormWrapper = async ({id}: {id: string}) => {
  const isNew = id === "new";
  const contact = isNew ? null : await api.contact.getItem({id});

  return <ContactItemForm contact={contact} />;
};
