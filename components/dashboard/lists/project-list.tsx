"use client";

import React, {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {PlusIcon, PencilIcon, TrashIcon, EyeIcon} from "lucide-react";
import type {ProjectItem} from "~/server/api/routers/project";
import {api} from "~/trpc/react";
import {Button, buttonVariants} from "~/components/ui/button";
import {Heading} from "~/components/ui/heading";
import {EmptySection} from "~/components/ui/empty-section";
import {Dialog, DialogTrigger} from "~/components/ui/dialog";
import {DeleteEntityDialog} from "~/components/dashboard/dialogs/delete-entity-dialog";
import {cn} from "~/utils/className";

const ProjectList = () => {
  const {data: projects = [], isLoading} = api.project.getItems.useQuery();
  const deleteItemMutation = api.project.deleteItem.useMutation();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const utils = api.useUtils();

  async function handleDeleteItem() {
    if (selectedProject?.id) {
      await deleteItemMutation.mutateAsync(
        {id: selectedProject.id},
        {
          async onSuccess() {
            await utils.project.getItems.invalidate();
            setSelectedProject(null);
          }
        }
      );
    }
  }

  function displayItems() {
    return projects.map((item) => <ProjectCard key={item.id} onDelete={() => setSelectedProject(item)} {...item} />);
  }

  return (
    <Dialog>
      <Heading as="h2" size="sm">
        Project items
      </Heading>

      <div className="flex flex-col items-start">
        {isLoading ? null : projects.length ? displayItems() : <EmptySection heading="No project items found" />}

        <Link href="/dashboard/projects/new" className={cn(buttonVariants({variant: "primary"}), "mt-6")}>
          <PlusIcon size={16} className="mr-1" />
          Add new item
        </Link>
      </div>

      <DeleteEntityDialog
        title="Delete project"
        entityName={(selectedProject?.name || "Project").toLowerCase()}
        onClickDeleteBtn={() => handleDeleteItem()}
      />
    </Dialog>
  );
};

type ProjectCardProps = ProjectItem & {
  onDelete: (e: React.MouseEvent) => void;
};

const ProjectCard = ({id, name, shortDescription, description, coverImage, onDelete}: ProjectCardProps) => {
  const MAX_TEXT_LENGTH = 100;
  const descriptionLength = shortDescription?.length || description?.length;
  const itemDescription = (shortDescription || description).slice(0, MAX_TEXT_LENGTH);

  return (
    <article className="flex w-full items-center gap-1 border-b-[1px] border-solid border-slate-200 py-3 last-of-type:border-0">
      <div className="relative mr-2 h-16 w-24 shrink-0 overflow-hidden rounded-md bg-slate-50">
        {coverImage.url ? <Image src={coverImage.url} fill style={{objectFit: "cover"}} alt="" /> : null}
      </div>

      <div className="flex flex-1 flex-col items-start">
        <p className="mr-2 font-poppins text-sm font-semibold leading-6">{name}</p>
        <p className="hidden text-xs leading-6 sm:block">
          {itemDescription}
          {descriptionLength > MAX_TEXT_LENGTH && "..."}
        </p>
      </div>

      <Link href={`/dashboard/projects/${id}`} className={buttonVariants({variant: "ghost", size: "icon"})}>
        <PencilIcon size={16} />
        <span className="sr-only">Edit</span>
      </Link>

      <Link href={`/projects/${id}`} className={buttonVariants({variant: "ghost", size: "icon"})} target="_blank">
        <EyeIcon size={16} />
        <span className="sr-only">Show preview</span>
      </Link>

      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" onClick={onDelete}>
          <TrashIcon size={16} />
          <span className="sr-only">Delete</span>
        </Button>
      </DialogTrigger>
    </article>
  );
};

export {ProjectList};
