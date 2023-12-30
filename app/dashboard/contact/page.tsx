import React from "react";
import {api} from "~/trpc/server";
import {PageContent, PageHeader} from "~/components/dashboard/DashboardPage";
import {ContactForm} from "~/components/dashboard/ContactForm";
import {ContactItems} from "~/components/dashboard/ContactItems";
import {Separator} from "~/components/ui/Separator";

export default async function Page() {
  const snippets = await api.snippet.getSnippets.query({type: "CONTACT", keys: ["description"]});
  const contactMethods = await api.contact.getItems.query();

  return (
    <>
      <PageHeader heading="Contact" description="Contact section settings" />
      <PageContent>
        <ContactForm data={snippets} />
        <Separator className="my-8 h-px" />
        <ContactItems contactMethods={contactMethods} />
      </PageContent>
    </>
  );
}
