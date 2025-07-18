"use client";

import React, { useState } from "react";
import type { ExperienceItem } from "@prisma/client";
import { format } from "date-fns";
import { EllipsisIcon, PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
import { Skeleton } from "~/components/ui/skeleton";
import { useToast } from "~/hooks/use-toast";
import { api } from "~/trpc/react";
import { revalidatePath } from "~/utils/revalidate-path";

type ExperienceListProps = {
  experience: Array<ExperienceItem>;
};

const ExperienceList = ({ experience }: ExperienceListProps) => {
  const deleteItemMutation = api.experience.deleteItem.useMutation();
  const pathname = usePathname();
  const { toast } = useToast();

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedItemName, setSelectedItemName] = useState<string>("position");

  async function handleDeleteItem() {
    if (!selectedItemId) return;

    await deleteItemMutation.mutateAsync(
      { id: selectedItemId },
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

  function handleDialogOpenChange(open: boolean) {
    if (open) return;

    setSelectedItemId(null);
  }

  function displayItems() {
    if (!experience.length) {
      return <EmptySection heading="No experience items found" />;
    }

    return experience.map((item) => (
      <ExperienceCard
        key={item.id}
        onClickDeleteBtn={() => {
          setSelectedItemId(item.id);
          setSelectedItemName(`${item.position} @ ${item.company || "-"}`);
        }}
        {...item}
      />
    ));
  }

  return (
    <Dialog onOpenChange={handleDialogOpenChange}>
      <Heading as="h2" size="sm">
        Experience items
      </Heading>

      <div className="flex flex-col items-start">
        {displayItems()}

        <Button className="mt-6" asChild>
          <Link href="/dashboard/experience/new">
            <PlusIcon size={16} />
            Add new item
          </Link>
        </Button>
      </div>

      <DeleteEntityDialog title="Delete experience" entityName={selectedItemName} onClickDeleteBtn={handleDeleteItem} />
    </Dialog>
  );
};

type ExperienceCardProps = ExperienceItem & {
  onClickDeleteBtn: (e: React.MouseEvent) => void;
};

const ExperienceCard = ({ id, company, startDate, endDate, position, onClickDeleteBtn }: ExperienceCardProps) => {
  return (
    <article className="border-muted flex min-h-28 w-full items-center gap-3 border-b-[1px] border-solid py-2 last-of-type:border-0">
      <div className="flex-1">
        <p className="font-poppins text-sm leading-8 font-semibold">{position}</p>
        <p className="text-muted-foreground text-xs leading-6">{company}</p>
        <span className="text-muted-foreground block text-xs leading-6">
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
    <div className="border-muted flex min-h-28 w-full items-center gap-1 border-b-[1px] border-solid py-2 last-of-type:border-0">
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

export { ExperienceList, ExperienceListSkeleton };
