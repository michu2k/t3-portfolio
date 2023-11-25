import React from "react";
import Image from "next/image";
import {ArrowUpRightIcon} from "lucide-react";
import Link from "next/link";
import type {ProjectItem} from "~/server/api/routers/project";
import {PageSection} from "~/components/ui/PageSection";
import {buttonVariants} from "~/components/ui/Button";
import {api} from "~/utils/api";
import {cn} from "~/utils/className";

const RecentWork = () => {
  const {data: projectItems = []} = api.project.getItems.useQuery();

  function displayRecentWorkItems() {
    return projectItems.map((item) => <ProjectCard key={item.id} {...item} />);
  }

  return (
    <PageSection id="recent-work" heading="My Recent Work" subheading="02. Projects">
      <div className="grid gap-8 md:gap-x-10 lg:grid-cols-3">{displayRecentWorkItems()}</div>
    </PageSection>
  );
};

const ProjectCard = ({id, name, shortDescription, description, coverImage}: ProjectItem) => {
  const projectUrl = `/projects/${id}`;

  return (
    <article className="group flex w-auto max-w-2xl shrink-0 break-inside-avoid-column flex-col gap-4">
      <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-lg bg-slate-100 md:h-44 md:w-full">
        <Image src={coverImage.url} fill style={{objectFit: "cover"}} alt="" />
      </div>

      <div className="flex flex-col items-start gap-4">
        <p className="font-poppins text-lg font-semibold text-slate-700">{name}</p>

        <p className="line-clamp-4 overflow-hidden text-ellipsis text-sm leading-7">
          {shortDescription || description}
        </p>

        <Link
          href={projectUrl}
          className={cn(
            buttonVariants({variant: "outline", size: "sm"}),
            "h-8 gap-2 rounded-full px-4 group-hover:text-primary"
          )}>
          <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
          <span className="font-poppins text-sm font-medium">Preview</span>
        </Link>
      </div>
    </article>
  );
};

export {RecentWork};
