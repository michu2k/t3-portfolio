import Link from "next/link";
import Image from "next/image";
import React from "react";
import {Plus, Pencil} from "lucide-react";
import {Button} from "~/components/Button";
import {Heading} from "~/components/Heading";
import {recentWorkItems} from "~/components/landing-page/RecentWork";

const List = () => {

  function displayPortfolioItems() {
    return recentWorkItems.map((item) => (
      <PortfolioItem key={item.id} {...item} />
    ));
  }

  return (
    <>
      <Heading as="h3" size="md">Portfolio items</Heading>

      <div className="mt-6 flex flex-col items-start">
        {displayPortfolioItems()}

        <Link href="/admin/portfolio/new">
          <Button className="mt-8">
            <Plus size={16} className="mr-1" /> Add new item
          </Button>
        </Link>
      </div>
    </>
  );
};

type PortfolioItemImage = {
  thumbnail: string;
  full: string;
}

type PortfolioItemProps = {
  id: number;
  name: string;
  description: string;
  tags: Array<string>;
  image: PortfolioItemImage;
}

const PortfolioItem = ({id, name, description, image}: PortfolioItemProps) => {
  return (
    <article className="w-full py-3 flex items-center border-b-[1px] last-of-type:border-0 border-solid border-slate-200">
      <div className="w-16 h-16 rounded bg-slate-100 shrink-0 relative mr-4">
        <Image
          src={image.thumbnail}
          fill
          className="rounded"
          style={{objectFit: "cover"}}
          alt="" />
      </div>

      <div className="flex flex-col items-start flex-1 mr-4">
        <p className="font-semibold text-sm text-slate-700 leading-6 mr-2">
          {name}
        </p>

        <p className="text-xs leading-6">
          {description}
        </p>
      </div>

      <Link href={`/admin/portfolio/${id}`}>
        <Button variant="ghost" size="icon">
          <Pencil size={16} />
        </Button>
      </Link>
    </article>

  );
};

export {List};