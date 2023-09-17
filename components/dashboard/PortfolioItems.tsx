import Link from "next/link";
import Image from "next/image";
import React from "react";
import {PlusIcon, PencilIcon} from "lucide-react";
import {Button} from "~/components/ui/Button";
import {recentWorkItems} from "~/components/landing-page/RecentWork";

const PortfolioItems = () => {
  function displayItems() {
    return recentWorkItems.map((item) => <PortfolioItem key={item.id} {...item} />);
  }

  return (
    <>
      <div className="flex flex-col items-start">
        {displayItems()}

        <Link href="/dashboard/portfolio/new">
          <Button className="mt-8">
            <PlusIcon size={16} className="mr-1" />
            Add new item
          </Button>
        </Link>
      </div>
    </>
  );
};

type PortfolioItemImage = {
  thumbnail: string;
  full: string;
};

type PortfolioItemProps = {
  id: number;
  name: string;
  description: string;
  tags: Array<string>;
  image: PortfolioItemImage;
};

const PortfolioItem = ({id, name, description, image}: PortfolioItemProps) => {
  return (
    <article className="flex w-full items-center border-b-[1px] border-solid border-slate-200 py-2 last-of-type:border-0">
      <div className="relative mr-4 h-16 w-16 shrink-0 rounded bg-slate-100">
        <Image src={image.thumbnail} fill className="rounded" style={{objectFit: "cover"}} alt="" />
      </div>

      <div className="mr-4 flex flex-1 flex-col items-start">
        <p className="mr-2 text-sm font-semibold leading-6 text-slate-700">{name}</p>
        <p className="text-xs leading-6">{description}</p>
      </div>

      <Link href={`/dashboard/portfolio/${id}`}>
        <Button variant="ghost" size="icon">
          <PencilIcon size={16} />
          <span className="sr-only">Edit</span>
        </Button>
      </Link>
    </article>
  );
};

export {PortfolioItems};
