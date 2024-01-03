import React from "react";
import type {Metadata} from "next";
import {AboutForm} from "~/components/dashboard/forms/about-form";
import {PageHeader} from "~/components/dashboard/layouts/page-header";
import {PageContent} from "~/components/dashboard/layouts/page-content";

export const metadata: Metadata = {
  title: "Dashboard: About Me"
};

export default function Page() {
  return (
    <>
      <PageHeader heading="About" description="About section settings" />
      <PageContent>
        <AboutForm />
      </PageContent>
    </>
  );
}
