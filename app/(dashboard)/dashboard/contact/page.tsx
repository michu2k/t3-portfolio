import React from "react";
import type {Metadata} from "next";
import {DashboardHeader} from "~/components/dashboard/layouts/dashboard-header";
import {DashboardContent} from "~/components/dashboard/layouts/dashboard-content";
import {ContactForm} from "~/components/dashboard/forms/contact-form";
import {ContactList} from "~/components/dashboard/lists/contact-list";
import {Separator} from "~/components/ui/separator";

export const metadata: Metadata = {
  title: "Dashboard: Contact"
};

export default function Page() {
  return (
    <>
      <DashboardHeader heading="Contact" description="Contact section settings" />
      <DashboardContent>
        <ContactForm />
        <Separator className="my-8 h-px" />
        <ContactList />
      </DashboardContent>
    </>
  );
}
