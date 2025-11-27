import React, { Suspense } from "react";
import type { Metadata } from "next";

import { ContactItemForm, ContactItemFormSkeleton } from "~/components/dashboard/forms/contact-item-form";
import { PageContent } from "~/components/dashboard/layouts/page-content";
import { PageHeader } from "~/components/dashboard/layouts/page-header";
import type { BreadcrumbItem } from "~/components/ui/breadcrumb";
import { ensureAuthenticated } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { dashboardPaths } from "~/utils/dashboard.config";

export const metadata: Metadata = {
  title: "Dashboard: Contact"
};

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  await ensureAuthenticated();

  const isNew = id === "new";
  const heading = isNew ? "Create" : "Edit";
  const description = isNew ? "Create a new contact method." : "Edit an existing contact method.";

  const breadcrumbs: Array<BreadcrumbItem> = [{ label: "Contact", href: dashboardPaths.contact }, { label: heading }];

  return (
    <HydrateClient>
      <PageHeader heading={heading} description={description} breadcrumbs={breadcrumbs} />
      <PageContent>
        <Suspense fallback={<ContactItemFormSkeleton />}>
          <ContactItemFormWrapper id={id} />
        </Suspense>
      </PageContent>
    </HydrateClient>
  );
}

const ContactItemFormWrapper = async ({ id }: { id: string }) => {
  const isNew = id === "new";
  const contact = isNew ? null : await api.contact.getItem({ id });

  return <ContactItemForm contact={contact} />;
};
