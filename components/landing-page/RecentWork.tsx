import React from "react";
import Image from "next/image";
import Link from "next/link";
import {SearchIcon} from "lucide-react";
import type {ProjectItem} from "~/server/api/routers/project";
import {PageSection} from "~/components/ui/PageSection";
import {Dialog} from "~/components/ui/Dialog";
import {api} from "~/utils/api";

const RecentWork = () => {
  const {data: projectItems = []} = api.project.getItems.useQuery();

  function displayRecentWorkItems() {
    return projectItems.map((item) => <ProjectCard key={item.id} {...item} />);
  }

  return (
    <Dialog>
      <PageSection id="recent-work" heading="My Recent Work" subheading="02. Projects">
        <div className="grid gap-14 md:gap-x-10 lg:grid-cols-2">{displayRecentWorkItems()}</div>
      </PageSection>
    </Dialog>
  );
};

const ProjectCard = ({id, name, shortDescription, description, coverImage}: ProjectItem) => {
  const itemPageUrl = `/projects/${id}`;

  return (
    <article className="group flex w-auto max-w-2xl shrink-0 break-inside-avoid-column flex-col gap-8 md:flex-row">
      <div className="relative h-36 w-56 shrink-0 rounded bg-slate-100 md:h-44 md:w-56">
        <Image src={coverImage.url} fill className="rounded" style={{objectFit: "cover"}} alt="" />
      </div>

      <div className="flex flex-col items-start gap-4">
        <p className="text-md font-semibold text-slate-700">{name}</p>

        <p className="line-clamp-4 overflow-hidden text-ellipsis text-sm leading-7">
          {shortDescription || description}
        </p>

        <Link href={itemPageUrl} className="flex w-full items-center">
          <span className="flex h-8 shrink-0 items-center justify-center gap-2 rounded-full border border-solid px-4 transition-colors group-hover:text-primary">
            <SearchIcon className="h-4 w-4" aria-hidden="true" />
            <span className="text-sm font-medium">Preview</span>
          </span>
        </Link>
      </div>
    </article>
  );
};

export {RecentWork};
