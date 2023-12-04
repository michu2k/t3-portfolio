import React from "react";
import Image from "next/image";
import Link from "next/link";
import {ArrowUpRightIcon} from "lucide-react";
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
      <div className="flex flex-col gap-14 md:gap-20">{displayRecentWorkItems()}</div>
    </PageSection>
  );
};

const ProjectCard = ({id, name, shortDescription, description, coverImage}: ProjectItem) => {
  const projectUrl = `/projects/${id}`;

  return (
    <article className="group flex w-auto shrink-0 break-inside-avoid-column flex-col gap-12 sm:flex-row md:gap-16">
      <div className="relative h-52 w-full max-w-md shrink-0 rounded-lg bg-slate-100 after:absolute after:left-3 after:top-3 after:-z-10 after:h-full after:w-full after:rounded-lg after:border-2 after:border-secondary sm:w-60 md:h-64 md:w-80 md:after:left-5 md:after:top-5">
        <Image src={coverImage.url} fill style={{objectFit: "cover"}} className="rounded-lg" alt="" />
      </div>

      <div className="flex h-full w-full flex-1 flex-col justify-center gap-4 py-2 md:py-6">
        <p className="font-poppins text-lg font-semibold text-slate-700">{name}</p>

        <p className="line-clamp-4 max-w-lg overflow-hidden text-ellipsis text-sm leading-7">
          {shortDescription || description}
        </p>

        <Link
          href={projectUrl}
          className={cn(buttonVariants({variant: "secondary", size: "md"}), "mt-auto w-32 gap-2 rounded-full px-4")}>
          <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
          <span className="font-poppins text-sm font-medium">Preview</span>
        </Link>
      </div>
    </article>
  );
};

export {RecentWork};
