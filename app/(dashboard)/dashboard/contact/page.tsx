import React from "react";
import type {Metadata} from "next";
import {api} from "~/trpc/server";
import {PageHeader} from "~/components/dashboard/layouts/page-header";
import {PageContent} from "~/components/dashboard/layouts/page-content";
import {ContactForm} from "~/components/dashboard/forms/contact-form";
import {ContactList} from "~/components/dashboard/lists/contact-list";
import {Separator} from "~/components/ui/separator";

export const metadata: Metadata = {
  title: "Dashboard: Contact"
};

export default async function Page() {
  const snippetsData = await api.snippet.getSnippets({type: "CONTACT", keys: ["description"]});
  const contactMethods = await api.contact.getItems();

  return (
    <>
      <PageHeader heading="Contact" description="Contact section settings" />
      <PageContent>
        <ContactForm snippets={snippetsData} />
        <Separator className="my-8" />
        <ContactList contactMethods={contactMethods} />
      </PageContent>
    </>
  );
}
