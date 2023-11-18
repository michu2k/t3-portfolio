import React from "react";
import Link from "next/link";
import Image from "next/image";
import type {ProjectItem} from "~/server/api/routers/project";
import {PageSection} from "~/components/ui/PageSection";
import ArrowUpRightSvg from "~/public/svgs/arrow-up-right.svg";
import {api} from "~/utils/api";

const RecentWork = () => {
  const {data: projectItems = []} = api.project.getItems.useQuery();

  function displayRecentWorkItems() {
    return projectItems.map((item) => <ProjectCard key={item.id} {...item} />);
  }

  return (
    <PageSection id="recent-work" heading="Recent Work Showcases" subheading="Projects">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{displayRecentWorkItems()}</div>
    </PageSection>
  );
};

const ProjectCard = ({id, name, shortDescription, description, coverImage}: ProjectItem) => {
  const itemPageUrl = `/projects/${id}`;

  return (
    <article className="group w-auto shrink-0 break-inside-avoid-column">
      <div className="relative h-64 w-auto shrink-0 rounded bg-slate-100">
        <Image src={coverImage.url} fill className="rounded" style={{objectFit: "cover"}} alt="" />
      </div>

      <div className="flex flex-col items-start py-4">
        <Link href={itemPageUrl} className="mb-4 flex w-full items-center justify-between">
          <p className="mr-2 text-lg font-semibold text-slate-700 transition-colors group-hover:text-primary">{name}</p>

          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-solid border-slate-300 bg-white transition-colors group-hover:border-primary">
            <ArrowUpRightSvg className="h-4 w-4 fill-slate-700" aria-hidden="true" />
          </span>
        </Link>

        <p className="line-clamp-3 overflow-hidden text-ellipsis text-sm leading-6">
          {shortDescription || description}
        </p>
      </div>
    </article>
  );
};

export {RecentWork};
