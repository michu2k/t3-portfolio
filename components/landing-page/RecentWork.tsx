import React from "react";
import Image from "next/image";
import Link from "next/link";
import type {ProjectItem} from "~/server/api/routers/project";
import {PageSection} from "~/components/ui/PageSection";
import {api} from "~/utils/api";

const RecentWork = () => {
  const {data: projectItems = []} = api.project.getItems.useQuery();

  function displayRecentWorkItems() {
    return projectItems.map((item) => <ProjectCard key={item.id} {...item} />);
  }

  return (
    <PageSection id="recent-work" heading="My Recent Work" subheading="02. Projects">
      <div className="grid gap-14 sm:grid-cols-2">{displayRecentWorkItems()}</div>
    </PageSection>
  );
};

const ProjectCard = ({id, name, shortDescription, description, coverImage}: ProjectItem) => {
  const projectUrl = `/projects/${id}`;

  return (
    <article className="group flex w-auto shrink-0 break-inside-avoid-column flex-col gap-6 lg:flex-row">
      <Link href={projectUrl}>
        <div className="relative h-52 w-full shrink-0 overflow-hidden rounded-lg lg:w-60">
          <Image
            src={coverImage.url}
            fill
            style={{objectFit: "cover"}}
            className="rounded-lg transition-transform group-hover:scale-110"
            alt={`${name} preview`}
          />
        </div>
      </Link>

      <div className="flex h-full w-full flex-1 flex-col gap-4">
        <Link href={projectUrl}>
          <p className="font-poppins text-xl font-semibold text-slate-700 transition-colors group-hover:text-primary">
            {name}
          </p>
        </Link>

        <p className="line-clamp-4 overflow-hidden text-ellipsis text-sm leading-7">
          {shortDescription || description}
        </p>

        {/*  <Link href={projectUrl} className={cn(buttonVariants({variant: "secondary", size: "md"}), "w-32 gap-6")}>
          Preview
          <MoveRightIcon size={20} />
        </Link> */}
      </div>
    </article>
  );
};

export {RecentWork};
