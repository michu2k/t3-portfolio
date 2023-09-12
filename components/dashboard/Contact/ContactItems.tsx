import React, {useState} from "react";
import type {ContactMethod} from "@prisma/client";
import Link from "next/link";
import {PlusIcon, PencilIcon, TrashIcon} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/components/ui/Dialog";
import {Button, buttonVariants} from "~/components/ui/Button";
import {Heading} from "~/components/ui/Heading";
import {api} from "~/utils/api";

const ContactItems = () => {
  const [selectedContactMethod, setSelectedContactMethod] = useState<ContactMethod | null>(null);

  const {data: contactMethods = []} = api.contact.getContactMethods.useQuery();
  const deleteContactMethod = api.contact.deleteContactMethod.useMutation();
  const utils = api.useContext();

  async function handleDeleteContactMethod() {
    if (selectedContactMethod?.id) {
      await deleteContactMethod.mutateAsync({id: selectedContactMethod.id}, {
        async onSuccess() {
          await utils.contact.getContactMethods.invalidate();
          setSelectedContactMethod(null);
        }
      });
    }
  }

  function displayItems() {
    return contactMethods.map((item) => (
      <ContactMethodItem key={item.id} onDelete={() => setSelectedContactMethod(item)} {...item} />
    ));
  }

  return (
    <Dialog>
      <Heading as="h3" size="md">Contact methods</Heading>

      <p className="text-xs text-slate-500 leading-5 mb-4">
        List of items that will be displayed in the contact section.
      </p>

      <div className="flex flex-col items-start">
        {displayItems()}

        <Link href="/dashboard/contact/new">
          <Button className="mt-8">
            <PlusIcon size={16} className="mr-1" /> Add new item
          </Button>
        </Link>
      </div>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete contact method</DialogTitle>
        </DialogHeader>

        <DialogDescription>Are you sure you want to delete this item?</DialogDescription>
        <DialogDescription>
          Selected <strong>{(selectedContactMethod?.type || "Method").toLowerCase()}</strong> will be permanently deleted.
        </DialogDescription>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">
              Cancel
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button variant="destructive" onClick={() => void handleDeleteContactMethod()}>
              <TrashIcon size={16} className="mr-2" />
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

type ContactMethodItemProps = ContactMethod & {
  onDelete: (e: React.MouseEvent) => void;
}

const ContactMethodItem = ({id, name, description, onDelete}: ContactMethodItemProps) => {
  return (
    <article className="w-full py-2 flex items-center border-b-[1px] last-of-type:border-0 border-solid border-slate-200">
      <div className="flex-1 mr-4">
        <p className="font-semibold text-sm text-slate-700 leading-8">{name}</p>
        <p className="font-medium text-xs leading-6">{description}</p>
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