import React from "react";
import {api} from "~/trpc/server";
import {PageContent, PageHeader} from "~/components/dashboard/DashboardPage";
import {ContactItemForm} from "~/components/dashboard/ContactItemForm";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({params: {id}}: PageProps) {
  const isNew = id === "new";
  const heading = isNew ? "Create" : "Edit";
  const description = isNew ? "Create a new contact method." : "Edit an existing contact method.";

  const data = await api.contact.getItem.query({id});

  return (
    <>
      <PageHeader heading={heading} description={description} />
      <PageContent>
        <ContactItemForm data={data} />
      </PageContent>
    </>
  );
}
