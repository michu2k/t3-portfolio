import React from "react";
import type {Metadata} from "next";
import {DashboardHeader} from "~/components/dashboard/layouts/dashboard-header";
import {DashboardContent} from "~/components/dashboard/layouts/dashboard-content";
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
      <DashboardHeader heading={heading} description={description} />
      <DashboardContent>
        <ContactItemForm id={id} />
      </DashboardContent>
    </>
  );
}
