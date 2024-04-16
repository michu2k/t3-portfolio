import React from "react";
import Image from "next/image";
import Link from "next/link";
import type {ProjectItem} from "~/server/api/routers/project";
import {api} from "~/trpc/server";
import {PageSection} from "./page-section";

const Projects = async () => {
  const projectItems = await api.project.getItems.query();

  function displayProjectsItems() {
    return projectItems.map((item) => <ProjectCard key={item.id} {...item} />);
  }

  return (
    <PageSection id="projects" heading="Featured projects" subheading="Projects">
      <div className="grid gap-14 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-4 md:gap-x-14">{displayProjectsItems()}</div>
    </PageSection>
  );
};

const ProjectCard = ({id, name, shortDescription, description, coverImage}: ProjectItem) => {
  const projectUrl = `/projects/${id}`;

  return (
    <article className="group w-auto shrink-0 sm:even:mt-20">
      <Link href={projectUrl} className="flex flex-col gap-6">
        <div className="relative h-48 w-full shrink-0 overflow-hidden lg:h-80">
          <Image
            src={coverImage.url}
            fill
            style={{objectFit: "cover"}}
            className="bg-accent transition-transform group-hover:scale-110"
            sizes="(min-width: 640px) 50vw, 100vw"
            alt={`${name} preview`}
          />
        </div>

        <div className="flex h-full w-full flex-1 flex-col gap-2">
          <p className="font-poppins text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
            {name}
          </p>

          <p className="line-clamp-4 overflow-hidden text-ellipsis text-sm leading-7 text-muted-foreground">
            {shortDescription || description}
          </p>
        </div>
      </Link>
    </article>
  );
};

export {Projects};
