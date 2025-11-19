"use client";

import React, { useState } from "react";
import { EllipsisIcon, ExternalLinkIcon, PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { DeleteEntityDialog } from "~/components/dashboard/dialogs/delete-entity-dialog";
import { Button } from "~/components/ui/button";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu";
import { EmptySection } from "~/components/ui/empty-section";
import { Heading } from "~/components/ui/heading";
import { ImageThumbnail } from "~/components/ui/image-thumbnail";
import { Skeleton } from "~/components/ui/skeleton";
import { toast } from "~/components/ui/toaster";
import type { ProjectItemWithImages } from "~/server/api/routers/project";
import { api } from "~/trpc/react";
import { dashboardPaths } from "~/utils/dashboard.config";

type ProjectListProps = {
  projects: Array<ProjectItemWithImages>;
};

export const ProjectList = ({ projects }: ProjectListProps) => {
  const deleteItemMutation = api.project.deleteItem.useMutation();
  const router = useRouter();

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedItemName, setSelectedItemName] = useState<string>("project");

  async function handleDeleteItem() {
    if (!selectedItemId) return;

    await deleteItemMutation.mutateAsync(
      { id: selectedItemId },
      {
        async onSuccess() {
          toast({
            title: "Success",
            description: "Project item deleted successfully",
            variant: "success"
          });

          router.refresh();
        }
      }
    );
  }

  function handleDialogOpenChange(open: boolean) {
    if (open) return;

    setSelectedItemId(null);
  }

  function displayItems() {
    if (!projects.length) {
      return <EmptySection heading="No project items found" />;
    }

    return projects.map((item) => (
      <ProjectCard
        key={item.id}
        onClickDeleteBtn={() => {
          setSelectedItemId(item.id);
          setSelectedItemName(item.name);
        }}
        {...item}
      />
    ));
  }

  return (
    <Dialog onOpenChange={handleDialogOpenChange}>
      <Heading as="h2" size="sm">
        Project items
      </Heading>

      <div className="flex flex-col items-start">
        {displayItems()}

        <Button className="mt-6" asChild>
          <Link href={`${dashboardPaths.projects}/new`}>
            <PlusIcon size={16} className="mr-1" />
            Add new item
          </Link>
        </Button>
      </div>

      <DeleteEntityDialog title="Delete project" entityName={selectedItemName} onClickDeleteBtn={handleDeleteItem} />
    </Dialog>
  );
};

type ProjectCardProps = ProjectItemWithImages & {
  onClickDeleteBtn: (e: React.MouseEvent) => void;
};

const ProjectCard = ({ id, name, shortDescription, description, coverImage, onClickDeleteBtn }: ProjectCardProps) => {
  const MAX_TEXT_LENGTH = 100;
  const descriptionLength = shortDescription?.length || description?.length;
  const itemDescription = (shortDescription || description).slice(0, MAX_TEXT_LENGTH);

  return (
    <article className="border-muted flex min-h-[5.25rem] w-full items-center gap-3 border-b-[1px] border-solid py-2 last-of-type:border-0">
      <ImageThumbnail file={coverImage} size="sm" />

      <div className="flex flex-1 flex-col items-start">
        <p className="font-poppins mr-2 text-sm leading-6 font-semibold">{name}</p>
        <p className="text-muted-foreground text-xs leading-6">
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

          <Link href={`${dashboardPaths.projects}/${id}`}>
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

export const ProjectListSkeleton = () => {
  return (
    <>
      <Heading as="h2" size="sm">
        Project items
      </Heading>

      <div className="flex flex-col items-start">
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
      </div>
    </>
  );
};

const ProjectCardSkeleton = () => {
  return (
    <div className="border-muted flex min-h-[5.25rem] w-full items-center gap-3 border-b-[1px] border-solid py-2 last-of-type:border-0">
      <Skeleton className="h-16 w-20 md:w-24" />

      <div className="flex flex-1 flex-col items-start">
        <div className="flex h-6 items-center">
          <Skeleton className="h-4 w-36" />
        </div>

        <div className="flex h-6 w-full items-center">
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
    </div>
  );
};
