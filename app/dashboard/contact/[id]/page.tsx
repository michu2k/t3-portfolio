import React from "react";
import {api} from "~/trpc/server";
import {DashboardHeader} from "~/components/layouts/dashboard-header";
import {DashboardContent} from "~/components/layouts/dashboard-content";
import {ContactItemForm} from "~/components/forms/contact-item-form";

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
      <DashboardHeader heading={heading} description={description} />
      <DashboardContent>
        <ContactItemForm data={data} />
      </DashboardContent>
    </>
  );
}
