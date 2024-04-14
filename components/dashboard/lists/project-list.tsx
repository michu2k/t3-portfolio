"use client";

import React, {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";
import {PlusIcon, PencilIcon, TrashIcon, EllipsisIcon, ExternalLinkIcon} from "lucide-react";
import type {ProjectItem} from "~/server/api/routers/project";
import {api} from "~/trpc/react";
import {useToast} from "~/hooks/use-toast";
import {Button} from "~/components/ui/button";
import {Heading} from "~/components/ui/heading";
import {EmptySection} from "~/components/ui/empty-section";
import {Dialog, DialogTrigger} from "~/components/ui/dialog";
import {DeleteEntityDialog} from "~/components/dashboard/dialogs/delete-entity-dialog";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "~/components/ui/dropdown-menu";
import {revalidatePath} from "~/utils/revalidate-path";

type ProjectListProps = {
  projects: Array<ProjectItem>;
};

const ProjectList = ({projects}: ProjectListProps) => {
  const deleteItemMutation = api.project.deleteItem.useMutation();
  const pathname = usePathname();
  const {toast} = useToast();

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const selectedItem = projects.find((item) => item.id === selectedItemId);

  async function handleDeleteItem() {
    if (!selectedItemId) return;

    await deleteItemMutation.mutateAsync(
      {id: selectedItemId},
      {
        async onSuccess() {
          toast({
            title: "Success",
            description: "Project item deleted successfully",
            variant: "success"
          });
        }
      }
    );

    revalidatePath(pathname);
  }

  function displayItems() {
    return projects.map((item) => (
      <ProjectCard key={item.id} onClickDeleteBtn={() => setSelectedItemId(item.id)} {...item} />
    ));
  }

  return (
    <Dialog onOpenChange={(open) => (open ? undefined : setSelectedItemId(null))}>
      <Heading as="h2" size="sm">
        Project items
      </Heading>

      <div className="flex flex-col items-start">
        {projects.length ? displayItems() : <EmptySection heading="No project items found" />}

        <Button className="mt-6" asChild>
          <Link href="/dashboard/projects/new">
            <PlusIcon size={16} className="mr-1" />
            Add new item
          </Link>
        </Button>
      </div>

      <DeleteEntityDialog
        title="Delete project"
        entityName={(selectedItem?.name || "Project").toLowerCase()}
        onClickDeleteBtn={() => handleDeleteItem()}
      />
    </Dialog>
  );
};

type ProjectCardProps = ProjectItem & {
  onClickDeleteBtn: (e: React.MouseEvent) => void;
};

const ProjectCard = ({id, name, shortDescription, description, coverImage, onClickDeleteBtn}: ProjectCardProps) => {
  const MAX_TEXT_LENGTH = 100;
  const descriptionLength = shortDescription?.length || description?.length;
  const itemDescription = (shortDescription || description).slice(0, MAX_TEXT_LENGTH);

  return (
    <article className="flex w-full items-center gap-1 border-b-[1px] border-solid border-muted py-3 last-of-type:border-0">
      <div className="relative mr-2 h-16 w-20 shrink-0 overflow-hidden rounded-md bg-accent md:w-24">
        {coverImage.url ? (
          <Image src={coverImage.url} fill style={{objectFit: "cover"}} sizes="(min-width: 768px) 25vw, 50vw" alt="" />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col items-start">
        <p className="mr-2 font-poppins text-sm font-semibold leading-6">{name}</p>
        <p className="text-xs leading-6 text-muted-foreground">
          {itemDescription}
          {descriptionLength > MAX_TEXT_LENGTH && "..."}
        </p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <EllipsisIcon size={16} />
            <span className="sr-only">Options</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <Link href={`/projects/${id}`} target="_blank">
            <DropdownMenuItem>
              <ExternalLinkIcon size={16} />
              Preview
            </DropdownMenuItem>
          </Link>

          <Link href={`/dashboard/projects/${id}`}>
            <DropdownMenuItem>
              <PencilIcon size={16} />
              Edit
            </DropdownMenuItem>
          </Link>

          <DialogTrigger asChild>
            <DropdownMenuItem onClick={onClickDeleteBtn}>
              <TrashIcon size={16} />
              Delete
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
    </article>
  );
};

export {ProjectList};
