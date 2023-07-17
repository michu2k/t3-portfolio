import React from "react";
import Link from "next/link";
import {PageSection} from "./generics/PageSection";
import Image from "next/image";

const recentWorkItems: Array<RecentWorkItemProps> = [
  {
    id: 1,
    name: "Lorem",
    description: "Consistency across products with a design system. Improved developer experience and more efficient engineering.",
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
    return recentWorkItems.map((item) => (
      <RecentWorkItem key={item.id} {...item} />
    ));
  }

  return (
    <PageSection id="recent-work" heading="Recent Work Showcases" subheading="Portfolio">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayRecentWorkItems()}
      </div>
    </PageSection>
  );
};

type RecentWorkItemImage = {
  thumbnail: string;
  full: string;
}

type RecentWorkItemProps = {
  id: number;
  name: string;
  description: string;
  tags: Array<string>;
  image: RecentWorkItemImage;
}

const RecentWorkItem = ({id, name, description, image}: RecentWorkItemProps) => {
  const itemPageUrl = `/portfolio/${id}`;

  return (
    <article className="group break-inside-avoid-column w-auto shrink-0">
      <Link href={itemPageUrl}>
        <div className={`w-auto h-64 rounded bg-slate-300 shrink-0 relative`}>
          <Image src={image.thumbnail} fill className="rounded" style={{objectFit: "cover"}} alt="" />
        </div>

        <div className="flex flex-col items-start py-4">
          <p className="
            font-semibold text-lg text-slate-700
            mb-4 inline-flex rounded-sm
          group-hover:text-primary
            transition-colors">
            {name}
          </p>

          <p className="text-sm inline-flex rounded-sm leading-7">
            {description}
          </p>
        </div>
      </Link>
    </article>
  );
};

export {RecentWork};