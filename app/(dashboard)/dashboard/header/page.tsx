import React from "react";
import type {Metadata} from "next";
import {PageHeader} from "~/components/dashboard/layouts/page-header";
import {PageContent} from "~/components/dashboard/layouts/page-content";
import {HeaderForm} from "~/components/dashboard/forms/header-form";

export const metadata: Metadata = {
  title: "Dashboard: Header"
};

export default function Page() {
  return (
    <>
      <PageHeader heading="Header" description="Header section settings" />
      <PageContent>
        <HeaderForm />
      </PageContent>
    </>
  );
}
