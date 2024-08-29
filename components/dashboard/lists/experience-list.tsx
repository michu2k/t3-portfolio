"use client";

import React, {useState} from "react";
import type {ExperienceItem} from "@prisma/client";
import {format} from "date-fns";
import {EllipsisIcon, PencilIcon, PlusIcon, TrashIcon} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";

import {DeleteEntityDialog} from "~/components/dashboard/dialogs/delete-entity-dialog";
import {Button} from "~/components/ui/button";
import {Dialog, DialogTrigger} from "~/components/ui/dialog";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "~/components/ui/dropdown-menu";
import {EmptySection} from "~/components/ui/empty-section";
import {Heading} from "~/components/ui/heading";
import {Skeleton} from "~/components/ui/skeleton";
import {useToast} from "~/hooks/use-toast";
import {api} from "~/trpc/react";
import {revalidatePath} from "~/utils/revalidate-path";

type ExperienceListProps = {
  experience: Array<ExperienceItem>;
};

const ExperienceList = ({experience}: ExperienceListProps) => {
  const deleteItemMutation = api.experience.deleteItem.useMutation();
  const pathname = usePathname();
  const {toast} = useToast();

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const selectedItem = experience.find((item) => item.id === selectedItemId);
  const {position, company} = selectedItem || {};

  async function handleDeleteItem() {
    if (!selectedItemId) return;

    await deleteItemMutation.mutateAsync(
      {id: selectedItemId},
      {
        async onSuccess() {
          toast({
            title: "Success",
            description: "Experience item deleted successfully",
            variant: "success"
          });
        }
      }
    );

    revalidatePath(pathname);
  }

  function displayItems() {
    return experience.map((item) => (
      <ExperienceCard key={item.id} onClickDeleteBtn={() => setSelectedItemId(item.id)} {...item} />
    ));
  }

  return (
    <Dialog onOpenChange={(open) => (open ? undefined : setSelectedItemId(null))}>
      <Heading as="h2" size="sm">
        Experience items
      </Heading>

      <div className="flex flex-col items-start">
        {experience.length ? displayItems() : <EmptySection heading="No experience items found" />}

        <Button className="mt-6" asChild>
          <Link href="/dashboard/experience/new">
            <PlusIcon size={16} />
            Add new item
          </Link>
        </Button>
      </div>

      <DeleteEntityDialog
        title="Delete experience"
        entityName={position ? `${position} @ ${company || "-"}` : "position"}
        onClickDeleteBtn={() => handleDeleteItem()}
      />
    </Dialog>
  );
};

type ExperienceCardProps = ExperienceItem & {
  onClickDeleteBtn: (e: React.MouseEvent) => void;
};

const ExperienceCard = ({id, company, startDate, endDate, position, onClickDeleteBtn}: ExperienceCardProps) => {
  return (
    <article className="flex min-h-28 w-full items-center gap-3 border-b-[1px] border-solid border-muted py-2 last-of-type:border-0">
      <div className="flex-1">
        <p className="font-poppins text-sm font-semibold leading-8">{position}</p>
        <p className="text-xs leading-6 text-muted-foreground">{company}</p>
        <span className="block text-xs leading-6 text-muted-foreground">
          {format(startDate, "MMM yyyy")} {" - "}
          {endDate ? format(endDate, "MMM yyyy") : "Present"}
        </span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <EllipsisIcon size={16} />
            <span className="sr-only">Options</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <Link href={`/dashboard/experience/${id}`}>
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

const ExperienceListSkeleton = () => {
  return (
    <>
      <Heading as="h2" size="sm">
        Experience items
      </Heading>

      <div className="flex flex-col items-start">
        <ExperienceCardSkeleton />
        <ExperienceCardSkeleton />
        <ExperienceCardSkeleton />
      </div>
    </>
  );
};

const ExperienceCardSkeleton = () => {
  return (
    <div className="flex min-h-28 w-full items-center gap-1 border-b-[1px] border-solid border-muted py-2 last-of-type:border-0">
      <div className="flex-1">
        <div className="flex h-8 items-center">
          <Skeleton className="h-4 w-20" />
        </div>

        <div className="flex h-6 items-center">
          <Skeleton className="h-4 w-40" />
        </div>

        <div className="flex h-6 items-center">
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
    </div>
  );
};

export {ExperienceList, ExperienceListSkeleton};
