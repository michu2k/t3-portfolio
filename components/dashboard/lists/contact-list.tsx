"use client";

import React, {useState} from "react";
import type {ContactMethod} from "@prisma/client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {PlusIcon, PencilIcon, TrashIcon, EllipsisIcon} from "lucide-react";
import {api} from "~/trpc/react";
import {useToast} from "~/hooks/use-toast";
import {Dialog, DialogTrigger} from "~/components/ui/dialog";
import {Button} from "~/components/ui/button";
import {EmptySection} from "~/components/ui/empty-section";
import {DeleteEntityDialog} from "~/components/dashboard/dialogs/delete-entity-dialog";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "~/components/ui/dropdown-menu";
import {Heading} from "~/components/ui/heading";
import {revalidatePath} from "~/utils/revalidate-path";

type ContactListProps = {
  contactMethods: Array<ContactMethod>;
};

const ContactList = ({contactMethods}: ContactListProps) => {
  const deleteItemMutation = api.contact.deleteItem.useMutation();
  const pathname = usePathname();
  const {toast} = useToast();

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const selectedItem = contactMethods.find((item) => item.id === selectedItemId);

  async function handleDeleteItem() {
    if (!selectedItemId) return;

    await deleteItemMutation.mutateAsync(
      {id: selectedItemId},
      {
        async onSuccess() {
          toast({
            title: "Success",
            description: "Contact method deleted successfully",
            variant: "success"
          });
        }
      }
    );

    revalidatePath(pathname);
  }

  function displayItems() {
    return contactMethods.map((item) => (
      <ContactMethodCard key={item.id} onClickDeleteBtn={() => setSelectedItemId(item.id)} {...item} />
    ));
  }

  return (
    <Dialog onOpenChange={(open) => (open ? undefined : setSelectedItemId(null))}>
      <Heading as="h2" size="sm">
        Contact methods
      </Heading>

      <div className="flex flex-col items-start">
        {contactMethods.length ? displayItems() : <EmptySection heading="No contact methods found" />}

        <Button className="mt-6" asChild>
          <Link href="/dashboard/contact/new">
            <PlusIcon size={16} />
            Add new item
          </Link>
        </Button>
      </div>

      <DeleteEntityDialog
        title="Delete contact method"
        entityName={(selectedItem?.type || "Method").toLowerCase()}
        onClickDeleteBtn={() => handleDeleteItem()}
      />
    </Dialog>
  );
};

type ContactMethodCardProps = ContactMethod & {
  onClickDeleteBtn: (e: React.MouseEvent) => void;
};

const ContactMethodCard = ({id, name, description, onClickDeleteBtn}: ContactMethodCardProps) => {
  return (
    <article className="flex w-full items-center gap-1 border-b-[1px] border-solid border-muted py-3 last-of-type:border-0">
      <div className="mr-4 flex-1">
        <p className="font-poppins text-sm font-semibold leading-8">{name}</p>
        <p className="text-xs leading-6 text-muted-foreground">{description}</p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <EllipsisIcon size={16} />
            <span className="sr-only">Options</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <Link href={`/dashboard/contact/${id}`}>
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

export {ContactList};
