import React from "react";
import type {Metadata} from "next";
import {api} from "~/trpc/server";
import {DashboardHeader} from "~/components/layouts/dashboard-header";
import {DashboardContent} from "~/components/layouts/dashboard-content";
import {ContactForm} from "~/components/forms/contact-form";
import {ContactList} from "~/components/lists/contact-list";
import {Separator} from "~/components/ui/separator";

export const metadata: Metadata = {
  title: "Dashboard: Contact"
};

export default async function Page() {
  const snippets = await api.snippet.getSnippets.query({type: "CONTACT", keys: ["description"]});
  const contactMethods = await api.contact.getItems.query();

  return (
    <>
      <DashboardHeader heading="Contact" description="Contact section settings" />
      <DashboardContent>
        <ContactForm data={snippets} />
        <Separator className="my-8 h-px" />
        <ContactList contactMethods={contactMethods} />
      </DashboardContent>
    </>
  );
}
