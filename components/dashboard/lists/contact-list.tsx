"use client";

import React, {useState} from "react";
import type {ContactMethod} from "@prisma/client";
import Link from "next/link";
import {PlusIcon, PencilIcon, TrashIcon} from "lucide-react";
import {api} from "~/trpc/react";
import {Dialog, DialogTrigger} from "~/components/ui/dialog";
import {Button, buttonVariants} from "~/components/ui/button";
import {EmptySection} from "~/components/ui/empty-section";
import {DeleteEntityDialog} from "~/components/dashboard/dialogs/delete-entity-dialog";
import {Heading} from "~/components/ui/heading";
import {cn} from "~/utils/className";

const ContactList = () => {
  const {data: contactMethods = [], isLoading} = api.contact.getItems.useQuery();
  const deleteItemMutation = api.contact.deleteItem.useMutation();
  const [selectedContactMethod, setSelectedContactMethod] = useState<ContactMethod | null>(null);
  const utils = api.useUtils();

  async function handleDeleteItem() {
    if (selectedContactMethod?.id) {
      await deleteItemMutation.mutateAsync(
        {id: selectedContactMethod.id},
        {
          async onSuccess() {
            await utils.contact.getItems.invalidate();
            setSelectedContactMethod(null);
          }
        }
      );
    }
  }

  function displayItems() {
    return contactMethods.map((item) => (
      <ContactMethodCard key={item.id} onDelete={() => setSelectedContactMethod(item)} {...item} />
    ));
  }

  return (
    <Dialog>
      <Heading as="h2" size="sm">
        Contact methods
      </Heading>

      <div className="flex flex-col items-start">
        {isLoading ? null : contactMethods.length ? (
          displayItems()
        ) : (
          <EmptySection heading="No contact methods found" />
        )}

        <Link href="/dashboard/contact/new" className={cn(buttonVariants({variant: "primary"}), "mt-6")}>
          <PlusIcon size={16} className="mr-1" />
          Add new item
        </Link>
      </div>

      <DeleteEntityDialog
        title="Delete contact method"
        entityName={(selectedContactMethod?.type || "Method").toLowerCase()}
        onClickDeleteBtn={() => handleDeleteItem()}
      />
    </Dialog>
  );
};

type ContactMethodCardProps = ContactMethod & {
  onDelete: (e: React.MouseEvent) => void;
};

const ContactMethodCard = ({id, name, description, onDelete}: ContactMethodCardProps) => {
  return (
    <article className="flex w-full items-center gap-1 border-b-[1px] border-solid border-slate-200 py-2 last-of-type:border-0">
      <div className="mr-4 flex-1">
        <p className="font-poppins text-sm font-semibold leading-8 text-slate-600">{name}</p>
        <p className="text-xs leading-6">{description}</p>
      </div>

      <Link href={`/dashboard/contact/${id}`} className={buttonVariants({variant: "ghost", size: "icon"})}>
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

export {ContactList};
