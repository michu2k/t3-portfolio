"use client";

import React, { useState } from "react";
import type { ContactMethod } from "@prisma/client";
import { EllipsisIcon, PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
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
import { Skeleton } from "~/components/ui/skeleton";
import { toast } from "~/components/ui/toaster";
import { api } from "~/trpc/react";
import { dashboardPaths } from "~/utils/dashboard.config";

type ContactListProps = {
  contactMethods: Array<ContactMethod>;
};

export const ContactList = ({ contactMethods }: ContactListProps) => {
  const deleteItemMutation = api.contact.deleteItem.useMutation();
  const router = useRouter();

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedItemName, setSelectedItemName] = useState<string>("contact method");

  async function handleDeleteItem() {
    if (!selectedItemId) return;

    await deleteItemMutation.mutateAsync(
      { id: selectedItemId },
      {
        async onSuccess() {
          toast({
            title: "Success",
            description: "Contact method deleted successfully",
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
    if (!contactMethods.length) {
      return <EmptySection heading="No contact methods found" />;
    }

    return contactMethods.map((item) => (
      <ContactMethodCard
        key={item.id}
        onClickDeleteBtn={() => {
          setSelectedItemId(item.id);
          setSelectedItemName(item.type.toLowerCase());
        }}
        {...item}
      />
    ));
  }

  return (
    <Dialog onOpenChange={handleDialogOpenChange}>
      <Heading as="h2" size="sm">
        Contact methods
      </Heading>

      <div className="flex flex-col items-start">
        {displayItems()}

        <Button className="mt-6" asChild>
          <Link href={`${dashboardPaths.contact}/new`}>
            <PlusIcon size={16} />
            Add new item
          </Link>
        </Button>
      </div>

      <DeleteEntityDialog
        title="Delete contact method"
        entityName={selectedItemName}
        onClickDeleteBtn={handleDeleteItem}
      />
    </Dialog>
  );
};

type ContactMethodCardProps = ContactMethod & {
  onClickDeleteBtn: (e: React.MouseEvent) => void;
};

const ContactMethodCard = ({ id, name, description, onClickDeleteBtn }: ContactMethodCardProps) => {
  return (
    <article className="border-muted flex min-h-20 w-full items-center gap-3 border-b-[1px] border-solid py-2 last-of-type:border-0">
      <div className="flex-1">
        <p className="font-poppins text-sm leading-8 font-semibold">{name}</p>
        <p className="text-muted-foreground text-xs leading-6">{description}</p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <EllipsisIcon size={16} />
            <span className="sr-only">Options</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <Link href={`${dashboardPaths.contact}/${id}`}>
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

export const ContactListSkeleton = () => {
  return (
    <>
      <Heading as="h2" size="sm">
        Contact methods
      </Heading>

      <div className="flex flex-col items-start">
        <ContactMethodCardSkeleton />
        <ContactMethodCardSkeleton />
        <ContactMethodCardSkeleton />
      </div>
    </>
  );
};

const ContactMethodCardSkeleton = () => {
  return (
    <div className="border-muted flex min-h-20 w-full items-center gap-3 border-b-[1px] border-solid py-2 last-of-type:border-0">
      <div className="flex-1">
        <div className="flex h-8 items-center">
          <Skeleton className="h-4 w-36" />
        </div>

        <div className="flex h-6 items-center">
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
    </div>
  );
};
