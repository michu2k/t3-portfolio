import React, { Suspense } from "react";
import type { Metadata } from "next";

import { ProjectItemForm, ProjectItemFormSkeleton } from "~/components/dashboard/forms/project-item-form";
import { PageContent } from "~/components/dashboard/layouts/page-content";
import { PageHeader } from "~/components/dashboard/layouts/page-header";
import type { BreadcrumbItem } from "~/components/ui/breadcrumb";
import { ensureAuthenticated } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { dashboardPaths } from "~/utils/dashboard.config";

export const metadata: Metadata = {
  title: "Dashboard: Projects"
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
  const description = isNew ? "Create a new project item." : "Edit an existing project item.";

  const breadcrumbs: Array<BreadcrumbItem> = [{ label: "Projects", href: dashboardPaths.projects }, { label: heading }];

  return (
    <HydrateClient>
      <PageHeader heading={heading} description={description} breadcrumbs={breadcrumbs} />
      <PageContent>
        <Suspense fallback={<ProjectItemFormSkeleton />}>
          <ProjectItemFormWrapper id={id} />
        </Suspense>
      </PageContent>
    </HydrateClient>
  );
}

const ProjectItemFormWrapper = async ({ id }: { id: string }) => {
  const isNew = id === "new";
  const project = isNew ? null : await api.project.getItem({ id });

  return <ProjectItemForm project={project} />;
};
