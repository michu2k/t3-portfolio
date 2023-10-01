import React from "react";
import Link from "next/link";
import Image from "next/image";
import {PageSection} from "~/components/ui/PageSection";
import ArrowUpRightSvg from "~/public/svgs/arrow-up-right.svg";

const recentWorkItems: Array<RecentWorkItemProps> = [
  {
    id: 1,
    name: "Lorem",
    description:
      "Consistency across products with a design system. Improved developer experience and more efficient engineering.",
    tags: ["React", "Tailwind", "Typescript"],
    image: {
      thumbnail: "https://picsum.photos/id/14/600/400",
      full: "https://picsum.photos/id/14/2500/1667"
    }
  },
  {
    id: 2,
    name: "Lorem Ipsum",
    description: "Refresh the website and administration panel using the Tailwind framework.",
    tags: ["Next.js", "Tailwind", "Typescript"],
    image: {
      thumbnail: "https://picsum.photos/id/27/600/400",
      full: "https://picsum.photos/id/27//3264/1830"
    }
  },
  {
    id: 3,
    name: "Dolor Sit Amet",
    description: "Consistency across products with a design system.",
    tags: ["Next.js", "Styled components", "Typescript"],
    image: {
      thumbnail: "https://picsum.photos/id/58/600/400",
      full: "https://picsum.photos/id/58/1280/853"
    }
  },
  {
    id: 4,
    name: "Lorem Ipsum",
    description: "Refresh the website and administration panel using the Tailwind framework.",
    tags: ["Wordpress", "Javascript", "Bulma", "SCSS"],
    image: {
      thumbnail: "https://picsum.photos/id/68/600/400",
      full: "https://picsum.photos/id/68/4608/3072"
    }
  },
  {
    id: 5,
    name: "Dolor Sit Amet",
    description: "Consistency across products with a design system.",
    tags: ["React", "Tailwind", "Typescript"],
    image: {
      thumbnail: "https://picsum.photos/id/250/600/400",
      full: "https://picsum.photos/id/250/4928/3264"
    }
  },
  {
    id: 6,
    name: "Dolor Sit Amet & Hello World",
    description: "Consistency across products with a design system.",
    tags: ["React", "Typescript"],
    image: {
      thumbnail: "https://picsum.photos/id/244/600/400",
      full: "https://picsum.photos/id/244/4288/2848"
    }
  }
];

const RecentWork = () => {
  function displayRecentWorkItems() {
    return recentWorkItems.map((item) => <RecentWorkItem key={item.id} {...item} />);
  }

  return (
    <PageSection id="recent-work" heading="Recent Work Showcases" subheading="Projects">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{displayRecentWorkItems()}</div>
    </PageSection>
  );
};

type RecentWorkItemImage = {
  thumbnail: string;
  full: string;
};

type RecentWorkItemProps = {
  id: number;
  name: string;
  description: string;
  tags: Array<string>;
  image: RecentWorkItemImage;
};

const RecentWorkItem = ({id, name, description, image}: RecentWorkItemProps) => {
  const itemPageUrl = `/projects/${id}`;

  return (
    <article className="group w-auto shrink-0 break-inside-avoid-column">
      <div className="relative h-64 w-auto shrink-0 rounded bg-slate-100">
        <Image src={image.thumbnail} fill className="rounded" style={{objectFit: "cover"}} alt="" />
      </div>

      <div className="flex flex-col items-start py-4">
        <Link href={itemPageUrl} className="mb-4 flex w-full items-center justify-between">
          <p className="mr-2 text-lg font-semibold text-slate-700 transition-colors group-hover:text-primary">{name}</p>

          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-solid border-slate-300 bg-white transition-colors group-hover:border-primary">
            <ArrowUpRightSvg className="h-4 w-4 fill-slate-700" aria-hidden="true" />
          </span>
        </Link>

        <p className="text-sm leading-6">{description}</p>
      </div>
    </article>
  );
};

export {RecentWork, recentWorkItems};
