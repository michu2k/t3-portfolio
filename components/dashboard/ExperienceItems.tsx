import React from "react";
import {format} from "date-fns";
import Link from "next/link";
import {Plus, Pencil} from "lucide-react";
import {Button} from "~/components/ui/Button";
import {experienceItems} from "~/components/landing-page/Experience"; // TEMP
import {Heading} from "~/components/ui/Heading";

const ExperienceItems = () => {

  function displayItems() {
    return experienceItems.map((item) => (
      <ExperienceItem key={item.id} {...item} />
    ));
  }

  return (
    <>
      <Heading as="h3" size="md">Experience items</Heading>

      <div className="mt-6 flex flex-col items-start">
        {displayItems()}

        <Link href="/dashboard/experience/new">
          <Button className="mt-8">
            <Plus size={16} className="mr-1" /> Add new item
          </Button>
        </Link>
      </div>
    </>
  );
};

type ExperienceItemProps = {
  id: number;
  from: string | null;
  to: string | null;
  companyName: string;
  position: string;
  responsibilities?: Array<string>;
}

const ExperienceItem = ({id, from, to, companyName, position, responsibilities}: ExperienceItemProps) => {
  return (
    <article className="w-full py-2 flex items-center border-b-[1px] last-of-type:border-0 border-solid border-slate-200">
      <div className="flex-1 mr-4">
        <p className="font-semibold text-sm text-slate-700 leading-8">{position}</p>
        <p className="font-medium text-xs leading-6">{companyName}</p>

        <span className="text-xs text-slate-700 leading-6">
          {from ? format(new Date(from), "MMM yyyy") : "-"} {" - "}
          {to ? format(new Date(to), "MMM yyyy") : "Now"}
        </span>

        <ul className="hidden">
          {responsibilities?.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="
                before:w-1
                before:h-1
                before:rounded-full
                before:bg-slate-500
                before:mt-3.5
                before:block" />
              <p className="text-sm leading-8">{item}</p>
            </li>
          ))}
        </ul>
      </div>

      <Link href={`/dashboard/experience/${id}`}>
        <Button variant="ghost" size="icon">
          <Pencil size={16} />
        </Button>
      </Link>
    </article>
  );
};

export {ExperienceItems};