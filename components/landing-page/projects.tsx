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
    <PageSection id="projects" heading="Featured projects" subheading="02. Projects">
      <div className="grid gap-12 sm:grid-cols-2">{displayProjectsItems()}</div>
    </PageSection>
  );
};

const ProjectCard = ({id, name, shortDescription, description, coverImage}: ProjectItem) => {
  const projectUrl = `/projects/${id}`;

  return (
    <article className="group w-auto shrink-0">
      <Link href={projectUrl} className="flex flex-col gap-6 lg:flex-row">
        <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-lg lg:w-56">
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

          <p className="text-muted-foreground text-md line-clamp-4 overflow-hidden text-ellipsis leading-7">
            {shortDescription || description}
          </p>
        </div>
      </Link>
    </article>
  );
};

export {Projects};
