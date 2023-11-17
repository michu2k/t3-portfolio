import React, {useState} from "react";
import type {ExperienceItem} from "@prisma/client";
import {format} from "date-fns";
import Link from "next/link";
import {PlusIcon, PencilIcon, TrashIcon} from "lucide-react";
import {Dialog, DialogTrigger} from "~/components/ui/Dialog";
import {Button, buttonVariants} from "~/components/ui/Button";
import {DeleteEntityDialog} from "~/components/dialogs/DeleteEntityDialog";
import {EmptySection} from "~/components/ui/EmptySection";
import {Heading} from "~/components/ui/Heading";
import {cn} from "~/utils/className";
import {api} from "~/utils/api";
import {sortExperienceItemsByEndDate} from "~/utils/sortExperienceItemsByEndDate";

const ExperienceItems = () => {
  const {data: experienceItems = [], isLoading} = api.experience.getItems.useQuery();
  const deleteItemMutation = api.experience.deleteItem.useMutation();
  const [selectedExperienceItem, setSelectedExperienceItem] = useState<ExperienceItem | null>(null);
  const utils = api.useContext();

  const {position, company} = selectedExperienceItem || {};

  async function handleDeleteItem() {
    if (selectedExperienceItem?.id) {
      await deleteItemMutation.mutateAsync(
        {id: selectedExperienceItem.id},
        {
          async onSuccess() {
            await utils.experience.getItems.invalidate();
            setSelectedExperienceItem(null);
          }
        }
      );
    }
  }

  function displayItems() {
    const sortedItems = sortExperienceItemsByEndDate(experienceItems);

    return sortedItems.map((item) => (
      <ExperienceCard key={item.id} onDelete={() => setSelectedExperienceItem(item)} {...item} />
    ));
  }

  return (
    <Dialog>
      <Heading as="h2" size="sm">
        Experience items
      </Heading>

      <div className="flex flex-col items-start">
        {isLoading ? null : experienceItems.length ? (
          displayItems()
        ) : (
          <EmptySection heading="No experience items found" />
        )}

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
  onDelete: (e: React.MouseEvent) => void;
};

const ExperienceCard = ({id, company, startDate, endDate, position, onDelete}: ExperienceCardProps) => {
  return (
    <article className="flex w-full items-center gap-1 border-b-[1px] border-solid border-slate-200 py-2 last-of-type:border-0">
      <div className="mr-4 flex-1">
        <p className="text-sm font-semibold leading-8">{position}</p>
        <p className="text-xs font-medium leading-6 text-slate-500">{company}</p>
        <span className="text-xs leading-6">
          {startDate ? format(startDate, "MMM yyyy") : "Now"} {" - "}
          {endDate ? format(endDate, "MMM yyyy") : "Now"}
        </span>
      </div>

      <Link href={`/dashboard/experience/${id}`} className={buttonVariants({variant: "ghost", size: "icon"})}>
        <PencilIcon size={16} />
        <span className="sr-only">Edit</span>
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

export {ExperienceItems};
