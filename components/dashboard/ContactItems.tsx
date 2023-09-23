import React, {useState} from "react";
import type {ContactMethod} from "@prisma/client";
import Link from "next/link";
import {PlusIcon, PencilIcon, TrashIcon} from "lucide-react";
import {Dialog, DialogTrigger} from "~/components/ui/Dialog";
import {Button, buttonVariants} from "~/components/ui/Button";
import {DeleteEntityDialog} from "~/components/dialogs/DeleteEntityDialog";
import {Heading} from "~/components/ui/Heading";
import {api} from "~/utils/api";
import {cn} from "~/utils/className";

const ContactItems = () => {
  const {data: contactMethods = []} = api.contact.getItems.useQuery();
  const deleteContactMethod = api.contact.deleteItem.useMutation();
  const [selectedContactMethod, setSelectedContactMethod] = useState<ContactMethod | null>(null);
  const utils = api.useContext();

  async function handleDeleteContactMethod() {
    if (selectedContactMethod?.id) {
      await deleteContactMethod.mutateAsync(
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
      <SingleContactMethod key={item.id} onDelete={() => setSelectedContactMethod(item)} {...item} />
    ));
  }

  return (
    <Dialog>
      <Heading as="h2" size="sm">
        Contact methods
      </Heading>

      <div className="flex flex-col items-start">
        {displayItems()}

        <Link href="/dashboard/contact/new" className={cn(buttonVariants({variant: "primary"}), "mt-6")}>
          <PlusIcon size={16} className="mr-1" />
          Add new item
        </Link>
      </div>

      <DeleteEntityDialog
        title="Delete contact method"
        entityName={(selectedContactMethod?.type || "Method").toLowerCase()}
        onClickDeleteBtn={() => void handleDeleteContactMethod()}
      />
    </Dialog>
  );
};

type SingleContactMethodProps = ContactMethod & {
  onDelete: (e: React.MouseEvent) => void;
};

const SingleContactMethod = ({id, name, description, onDelete}: SingleContactMethodProps) => {
  return (
    <article className="flex w-full items-center gap-1 border-b-[1px] border-solid border-slate-200 py-2 last-of-type:border-0">
      <div className="mr-4 flex-1">
        <p className="text-sm font-semibold leading-8">{name}</p>
        <p className="text-xs font-medium leading-6 text-slate-500">{description}</p>
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

export {ContactItems};
