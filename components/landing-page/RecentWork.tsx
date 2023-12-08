import React from "react";
import Image from "next/image";
import Link from "next/link";
import {MoveRightIcon} from "lucide-react";
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
    <article className="group flex w-auto max-w-4xl shrink-0 break-inside-avoid-column flex-col gap-14 sm:flex-row">
      <div className="relative h-52 w-full max-w-md shrink-0 rounded-lg sm:w-64 md:w-72">
        <Image src={coverImage.url} fill style={{objectFit: "cover"}} className="rounded-lg" alt="" />
      </div>

      <div className="flex h-full w-full flex-1 flex-col justify-center gap-4">
        <p className="font-poppins text-xl font-semibold text-slate-700">{name}</p>

        <p className="text-md line-clamp-4 overflow-hidden text-ellipsis leading-8">
          {shortDescription || description}
        </p>

        <Link href={projectUrl} className={cn(buttonVariants({variant: "secondary", size: "md"}), "w-32 gap-6")}>
          Preview
          <MoveRightIcon size={20} />
        </Link>
      </div>
    </article>
  );
};

export {RecentWork};
