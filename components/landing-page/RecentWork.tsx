import React from "react";
import Link from "next/link";
import Image from "next/image";
import {PageSection} from "~/components/PageSection";
import {SectionText} from "~/components/SectionText";
import ĄrrowUpRightSvg from "~/public/svgs/arrow-up-right.svg";

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
      <SectionText>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      </SectionText>

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
    <article className="group break-inside-avoid-column w-auto shrink-0 ">
      <div className="w-auto h-64 rounded bg-slate-100 shrink-0 relative">
        <Image src={image.thumbnail} fill className="rounded" style={{objectFit: "cover"}} alt="" />
      </div>

      <div className="flex flex-col items-start py-4">
        <Link href={itemPageUrl} className="flex items-center justify-between w-full mb-4">
          <p className="
            font-semibold text-lg text-slate-700
            inline-flex rounded-sm
            mr-2
          group-hover:text-primary
            transition-colors">
            {name}
          </p>

          <span className="
            w-10 h-10 rounded-full
            border-slate-300 border border-solid
            bg-white
            flex items-center justify-center shrink-0
            group-hover:border-primary
            transition-colors">
            <ĄrrowUpRightSvg
              className="w-4 h-4 fill-slate-700"
              aria-hidden="true" />
          </span>
        </Link>

        <p className="text-sm inline-flex rounded-sm leading-6">
          {description}
        </p>
      </div>
    </article>
  );
};

export {RecentWork};