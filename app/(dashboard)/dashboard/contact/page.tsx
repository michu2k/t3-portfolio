import React from "react";
import {SnippetType} from "@prisma/client";
import type {Metadata} from "next";

import {ContactForm} from "~/components/dashboard/forms/contact-form";
import {PageContent} from "~/components/dashboard/layouts/page-content";
import {PageHeader} from "~/components/dashboard/layouts/page-header";
import {ContactList} from "~/components/dashboard/lists/contact-list";
import {Separator} from "~/components/ui/separator";
import {ensureAuthenticated} from "~/server/auth";
import {getSnippetsByType} from "~/server/getSnippetsByType";
import {api} from "~/trpc/server";

export const metadata: Metadata = {
  title: "Dashboard: Contact"
};

export default async function Page() {
  await ensureAuthenticated();

  const snippets = await getSnippetsByType(SnippetType.CONTACT);
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
