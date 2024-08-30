import React from "react";

import {ContactFormSkeleton} from "~/components/dashboard/forms/contact-form";
import {PageContent} from "~/components/dashboard/layouts/page-content";
import {PageHeader} from "~/components/dashboard/layouts/page-header";
import {ContactListSkeleton} from "~/components/dashboard/lists/contact-list";
import {Separator} from "~/components/ui/separator";

export default function Loading() {
  return (
    <>
      <PageHeader heading="Contact" description="Contact section settings" />
      <PageContent>
        <ContactFormSkeleton />
        <Separator className="my-8" />
        <ContactListSkeleton />
      </PageContent>
    </>
  );
}
