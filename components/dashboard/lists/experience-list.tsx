"use client";

import React, {useState} from "react";
import type {ExperienceItem} from "@prisma/client";
import {format} from "date-fns";
import Link from "next/link";
import {PlusIcon, PencilIcon, TrashIcon} from "lucide-react";
import {api} from "~/trpc/react";
import {useToast} from "~/hooks/use-toast";
import {Dialog, DialogTrigger} from "~/components/ui/dialog";
import {Button, buttonVariants} from "~/components/ui/button";
import {DeleteEntityDialog} from "~/components/dashboard/dialogs/delete-entity-dialog";
import {EmptySection} from "~/components/ui/empty-section";
import {Heading} from "~/components/ui/heading";
import {cn} from "~/utils/className";
import {sortExperienceByEndDate} from "~/utils/sort-experience-by-end-date";

const ExperienceList = () => {
  const {data: experience = [], isLoading} = api.experience.getItems.useQuery();
  const deleteItemMutation = api.experience.deleteItem.useMutation();
  const {toast} = useToast();
  const utils = api.useUtils();

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

          await utils.experience.getItems.invalidate();
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
    const sortedItems = sortExperienceByEndDate(experience);

    return sortedItems.map((item) => (
      <ExperienceCard key={item.id} onClickDeleteBtn={() => setSelectedItemId(item.id)} {...item} />
    ));
  }

  return (
    <Dialog onOpenChange={handleDialogOpenChange}>
      <Heading as="h2" size="sm">
        Experience items
      </Heading>

      <div className="flex flex-col items-start">
        {isLoading ? null : experience.length ? displayItems() : <EmptySection heading="No experience items found" />}

        <Link href="/dashboard/experience/new" className={cn(buttonVariants({variant: "primary"}), "mt-6")}>
          <PlusIcon size={16} className="mr-1" />
          Add new item
        </Link>
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
    <article className="flex w-full items-center gap-1 border-b-[1px] border-solid border-slate-200 py-3 last-of-type:border-0">
      <div className="mr-4 flex-1">
        <p className="font-poppins text-sm font-semibold leading-8">{position}</p>
        <p className="text-xs leading-6">{company}</p>
        <span className="text-xs leading-6">
          {format(startDate, "MMM yyyy")} {" - "}
          {endDate ? format(endDate, "MMM yyyy") : "Present"}
        </span>
      </div>

      <Link href={`/dashboard/experience/${id}`} className={buttonVariants({variant: "ghost", size: "icon"})}>
        <PencilIcon size={16} />
        <span className="sr-only">Edit</span>
      </Link>

      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" onClick={onClickDeleteBtn}>
          <TrashIcon size={16} />
          <span className="sr-only">Delete</span>
        </Button>
      </DialogTrigger>
    </article>
  );
};

export {ExperienceList};
