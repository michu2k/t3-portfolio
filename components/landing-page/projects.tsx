import React from "react";
import Image from "next/image";
import Link from "next/link";

import {MotionInViewWrapper} from "~/components/ui/motion-in-view-wrapper";
import type {ProjectItem} from "~/server/api/routers/project";
import {api} from "~/trpc/server";

import {PageSection} from "./page-section";

const Projects = async () => {
  const projectItems = await api.project.getItems();

  function displayProjectsItems() {
    return projectItems.map((item) => <ProjectCard key={item.id} {...item} />);
  }

  return (
    <PageSection id="projects" heading="Featured projects" subheading="Projects">
      <div className="grid gap-12 sm:grid-cols-2 sm:gap-y-4 md:gap-x-14">{displayProjectsItems()}</div>
    </PageSection>
  );
};

const ProjectCard = ({id, name, shortDescription, description, coverImage}: ProjectItem) => {
  const projectUrl = `/projects/${id}`;

  return (
    <article className="group w-auto shrink-0 sm:even:mt-20">
      <Link
        href={projectUrl}
        className="flex gap-4 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-appearance sm:flex-col sm:gap-6">
        <MotionInViewWrapper className="relative h-32 w-32 shrink-0 overflow-hidden rounded-md sm:h-56 sm:w-full lg:h-80">
          <Image
            src={coverImage.url}
            fill
            style={{objectFit: "cover"}}
            className="bg-accent transition-transform group-hover:scale-110"
            sizes="(min-width: 640px) 50vw, 45vw"
            alt={`${name} preview`}
          />
        </MotionInViewWrapper>

        <div className="flex h-full w-full flex-1 flex-col gap-2">
          <p className="font-poppins text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
            {name}
          </p>

          <p className="line-clamp-3 overflow-hidden text-ellipsis text-sm leading-7 text-muted-foreground">
            {shortDescription || description}
          </p>
        </div>
      </Link>
    </article>
  );
};

export {Projects};
