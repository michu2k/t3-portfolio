import React from "react";
import Link from "next/link";
import {PageSection} from "./generics/PageSection";

const recentWorkItems: Array<RecentWorkItemProps> = [
  {
    id: 1,
    name: "Lorem",
    description: "Consistency across products with a design system. Improved developer experience and more efficient engineering."
  },
  {
    id: 2,
    name: "Lorem Ipsum",
    description: "Refresh the website and administration panel using the Tailwind framework."
  },
  {
    id: 3,
    name: "Dolor Sit Amet",
    description: "Consistency across products with a design system."
  }
];

const RecentWork = () => {

  function displayRecentWorkItems() {
    return recentWorkItems.map((item) => (
      <RecentWorkItem key={item.id} {...item} />
    ));
  }

  return (
    <PageSection upperHeading="Portfolio" heading="My recent work" className="bg-stone-50">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayRecentWorkItems()}
      </div>
    </PageSection>
  );
};

type RecentWorkItemProps = {
  id: number;
  name: string;
  description: string;
}

const RecentWorkItem = ({id, name, description}: RecentWorkItemProps) => {

  const itemPageUrl = `/portfolio/${id}`;

  return (
    <article className="w-auto shrink-0">
      <Link href={itemPageUrl}>
        <div className="w-auto h-56 rounded bg-slate-300 shrink-0">
          {/* <Image /> */}
        </div>

        <div className="flex flex-col items-start py-4">
          <p className="font-semibold text-lg mb-4 inline-flex rounded-sm text-slate-700">
            {name}
          </p>

          <p className="text-sm inline-flex rounded-sm leading-6 text-slate-600">
            {description}
          </p>
        </div>
      </Link>
    </article>
  );
};

export {RecentWork};