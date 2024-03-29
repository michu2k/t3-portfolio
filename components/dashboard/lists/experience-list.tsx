"use client";

import React, {useState} from "react";
import {format} from "date-fns";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {PlusIcon, PencilIcon, TrashIcon} from "lucide-react";
import type {ExperienceItem} from "@prisma/client";
import {api} from "~/trpc/react";
import {useToast} from "~/hooks/use-toast";
import {Dialog, DialogTrigger} from "~/components/ui/dialog";
import {Button} from "~/components/ui/button";
import {DeleteEntityDialog} from "~/components/dashboard/dialogs/delete-entity-dialog";
import {EmptySection} from "~/components/ui/empty-section";
import {Heading} from "~/components/ui/heading";
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
            <PlusIcon size={16} className="mr-1" />
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
    <article className="flex w-full items-center gap-1 border-b-[1px] border-solid border-muted py-3 last-of-type:border-0">
      <div className="mr-4 flex-1">
        <p className="font-poppins text-sm font-semibold leading-8">{position}</p>
        <p className="text-xs leading-6 text-muted-foreground">{company}</p>
        <span className="text-xs leading-6 text-muted-foreground">
          {format(startDate, "MMM yyyy")} {" - "}
          {endDate ? format(endDate, "MMM yyyy") : "Present"}
        </span>
      </div>

      <Button variant="ghost" size="icon" asChild>
        <Link href={`/dashboard/experience/${id}`}>
          <PencilIcon size={16} />
          <span className="sr-only">Edit</span>
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

export {ExperienceList};
