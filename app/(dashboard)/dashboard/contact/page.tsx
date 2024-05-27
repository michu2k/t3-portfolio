import React from "react";
import type {Metadata} from "next";
import {api} from "~/trpc/server";
import {ensureAuthenticated} from "~/server/auth";
import {PageHeader} from "~/components/dashboard/layouts/page-header";
import {PageContent} from "~/components/dashboard/layouts/page-content";
import {ContactForm} from "~/components/dashboard/forms/contact-form";
import {ContactList} from "~/components/dashboard/lists/contact-list";
import {Separator} from "~/components/ui/separator";
import {getSnippetData} from "~/server/getSnippetData";
import {SnippetType} from "@prisma/client";

export const metadata: Metadata = {
  title: "Dashboard: Contact"
};

export default async function Page() {
  await ensureAuthenticated();

  const snippets = await getSnippetData(SnippetType.CONTACT);
  const contactMethods = await api.contact.getItems();

  return (
    <>
      <PageHeader heading="Contact" description="Contact section settings" />
      <PageContent>
        <ContactForm snippets={snippets} />
        <Separator className="my-8" />
        <ContactList contactMethods={contactMethods} />
      </PageContent>
    </>
  );
}
