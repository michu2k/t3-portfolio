import React, {Suspense} from "react";
import {SnippetType} from "@prisma/client";
import type {Metadata} from "next";

import {ContactForm, ContactFormSkeleton} from "~/components/dashboard/forms/contact-form";
import {PageContent} from "~/components/dashboard/layouts/page-content";
import {PageHeader} from "~/components/dashboard/layouts/page-header";
import {ContactList, ContactListSkeleton} from "~/components/dashboard/lists/contact-list";
import {Separator} from "~/components/ui/separator";
import {ensureAuthenticated} from "~/server/auth";
import {api} from "~/trpc/server";

export const metadata: Metadata = {
  title: "Dashboard: Contact"
};

export default async function Page() {
  await ensureAuthenticated();

  return (
    <>
      <PageHeader heading="Contact" description="Contact section settings" />
      <PageContent>
        <Suspense fallback={<ContactFormSkeleton />}>
          <ContactFormWrapper />
        </Suspense>

        <Separator className="my-8" />

        <Suspense fallback={<ContactListSkeleton />}>
          <ContactListWrapper />
        </Suspense>
      </PageContent>
    </>
  );
}

const ContactFormWrapper = async () => {
  const snippets = await api.snippet.getSnippetsByType({type: SnippetType.CONTACT});

  return <ContactForm snippets={snippets} />;
};

const ContactListWrapper = async () => {
  const contactMethods = await api.contact.getItems();

  return <ContactList contactMethods={contactMethods} />;
};
