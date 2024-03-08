"use client";

import React, {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {PlusIcon, PencilIcon, TrashIcon, EyeIcon} from "lucide-react";
import type {ProjectItem} from "~/server/api/routers/project";
import {api} from "~/trpc/react";
import {useToast} from "~/hooks/use-toast";
import {Button} from "~/components/ui/button";
import {Heading} from "~/components/ui/heading";
import {EmptySection} from "~/components/ui/empty-section";
import {Dialog, DialogTrigger} from "~/components/ui/dialog";
import {DeleteEntityDialog} from "~/components/dashboard/dialogs/delete-entity-dialog";

const ProjectList = () => {
  const {data: projects = [], isLoading} = api.project.getItems.useQuery();
  const deleteItemMutation = api.project.deleteItem.useMutation();
  const {toast} = useToast();
  const utils = api.useUtils();

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

          await utils.project.getItems.invalidate();
        }
      }
    );
  }

  function handleDialogOpenChange(open: boolean) {
    if (!open) {
      setSelectedItemId(null);
    }
  }

  function displayItems() {
    return projects.map((item) => (
      <ProjectCard key={item.id} onClickDeleteBtn={() => setSelectedItemId(item.id)} {...item} />
    ));
  }

  return (
    <Dialog onOpenChange={handleDialogOpenChange}>
      <Heading as="h2" size="sm">
        Project items
      </Heading>

      <div className="flex flex-col items-start">
        {isLoading ? null : projects.length ? displayItems() : <EmptySection heading="No project items found" />}

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
      <div className="relative mr-2 h-16 w-24 shrink-0 overflow-hidden rounded-md bg-accent">
        {coverImage.url ? <Image src={coverImage.url} fill style={{objectFit: "cover"}} alt="" /> : null}
      </div>

      <div className="flex flex-1 flex-col items-start">
        <p className="mr-2 font-poppins text-sm font-semibold leading-6">{name}</p>
        <p className="hidden text-xs leading-6 text-muted-foreground sm:block">
          {itemDescription}
          {descriptionLength > MAX_TEXT_LENGTH && "..."}
        </p>
      </div>

      <Button variant="ghost" size="icon" asChild>
        <Link href={`/dashboard/projects/${id}`}>
          <PencilIcon size={16} />
          <span className="sr-only">Edit</span>
        </Link>
      </Button>

      <Button variant="ghost" size="icon" asChild>
        <Link href={`/projects/${id}`} target="_blank">
          <EyeIcon size={16} />
          <span className="sr-only">Show preview</span>
        </Link>
      </Button>

      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" onClick={onClickDeleteBtn}>
          <TrashIcon size={16} />
          <span className="sr-only">Delete</span>
        </Button>
      </DialogTrigger>
    </article>
  );
};

export {ProjectList};
