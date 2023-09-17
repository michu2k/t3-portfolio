import React from "react";
import {format} from "date-fns";
import Link from "next/link";
import {PlusIcon, PencilIcon} from "lucide-react";
import {Button} from "~/components/ui/Button";
import {experienceItems} from "~/components/landing-page/Experience"; // TEMP

const ExperienceItems = () => {
  function displayItems() {
    return experienceItems.map((item) => <ExperienceItem key={item.id} {...item} />);
  }

  return (
    <div className="flex flex-col items-start">
      {displayItems()}

      <Link href="/dashboard/experience/new">
        <Button className="mt-8">
          <PlusIcon size={16} className="mr-1" />
          Add new item
        </Button>
      </Link>
    </div>
  );
};

type ExperienceItemProps = {
  id: number;
  from: string | null;
  to: string | null;
  companyName: string;
  position: string;
  responsibilities?: Array<string>;
};

const ExperienceItem = ({id, from, to, companyName, position, responsibilities}: ExperienceItemProps) => {
  return (
    <article className="flex w-full items-center border-b-[1px] border-solid border-slate-200 py-2 last-of-type:border-0">
      <div className="mr-4 flex-1">
        <p className="text-sm font-semibold leading-8 text-slate-700">{position}</p>
        <p className="text-xs font-medium leading-6">{companyName}</p>

        <span className="text-xs leading-6 text-slate-700">
          {from ? format(new Date(from), "MMM yyyy") : "-"} {" - "}
          {to ? format(new Date(to), "MMM yyyy") : "Now"}
        </span>

        <ul className="hidden">
          {responsibilities?.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="before:mt-3.5 before:block before:h-1 before:w-1 before:rounded-full before:bg-slate-500" />
              <p className="text-sm leading-8">{item}</p>
            </li>
          ))}
        </ul>
      </div>

      <Link href={`/dashboard/experience/${id}`}>
        <Button variant="ghost" size="icon">
          <PencilIcon size={16} />
          <span className="sr-only">Edit</span>
        </Button>
      </Link>
    </article>
  );
};

export {ExperienceItems};
