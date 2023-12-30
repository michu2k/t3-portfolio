import React from "react";
import Image from "next/image";
import Link from "next/link";
import type {ProjectItem} from "~/server/api/routers/project";
import {PageSection} from "~/components/ui/PageSection";
import {api} from "~/trpc/react";

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
    <article className="group w-auto shrink-0">
      <Link href={projectUrl} className="flex flex-col gap-6 lg:flex-row">
        <div className="relative h-52 w-full shrink-0 overflow-hidden rounded-lg lg:w-60">
          <Image
            src={coverImage.url}
            fill
            style={{objectFit: "cover"}}
            className="rounded-lg transition-transform group-hover:scale-110"
            alt={`${name} preview`}
          />
        </div>

        <div className="flex h-full w-full flex-1 flex-col gap-4">
          <p className="font-poppins text-xl font-semibold text-slate-700 transition-colors group-hover:text-primary">
            {name}
          </p>

          <p className="line-clamp-4 overflow-hidden text-ellipsis text-sm leading-7">
            {shortDescription || description}
          </p>

          {/*  <Link href={projectUrl} className={cn(buttonVariants({variant: "secondary", size: "md"}), "w-32 gap-6")}>
          Preview
          <MoveRightIcon size={20} />
        </Link> */}
        </div>
      </Link>
    </article>
  );
};

export {RecentWork};
