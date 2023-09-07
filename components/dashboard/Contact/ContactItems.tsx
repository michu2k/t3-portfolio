import React from "react";
import type {ContactMethod} from "@prisma/client";
import Link from "next/link";
import {Plus, Pencil} from "lucide-react";
import {Button, buttonVariants} from "~/components/ui/Button";
import {Heading} from "~/components/ui/Heading";
import {api} from "~/utils/api";

const ContactItems = () => {
  const {data: contactMethods = []} = api.contact.getContactMethods.useQuery();

  function displayItems() {
    return contactMethods.map((item) => (
      <ContactMethodItem key={item.id} {...item} />
    ));
  }

  return (
    <>
      <Heading as="h3" size="md">Contact methods</Heading>

      <p className="text-xs text-slate-500 leading-5">
        List of contact methods that will be displayed in the contact section.
      </p>

      <div className="mt-6 flex flex-col items-start">
        {displayItems()}

        <Link href="/dashboard/contact/new">
          <Button className="mt-8">
            <Plus size={16} className="mr-1" /> Add new item
          </Button>
        </Link>
      </div>
    </>
  );
};

const ContactMethodItem = ({id, name, description}: ContactMethod) => {
  return (
    <article className="w-full py-2 flex items-center border-b-[1px] last-of-type:border-0 border-solid border-slate-200">
      <div className="flex-1 mr-4">
        <p className="font-semibold text-sm text-slate-700 leading-8">{name}</p>
        <p className="font-medium text-xs leading-6">{description}</p>
      </div>

      <Link href={`/dashboard/contact/${id}`} className={buttonVariants({variant: "ghost", size: "icon"})}>
        <Pencil size={16} />
        <span className="sr-only">Edit</span>
      </Link>
    </article>
  );
};

export {ContactItems};