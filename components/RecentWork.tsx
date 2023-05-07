import React from "react";
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
    <PageSection upperHeading="Portfolio" heading="My recent work" className="bg-slate-50">
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
  return (
    <div className="w-auto rounded-lg shrink-0 flex flex-col">
      <div className="w-auto h-56 rounded-lg bg-slate-300 shrink-0">
        {/* <Image /> */}
      </div>

      <div className="flex flex-col items-start py-4">
        <p className="font-semibold text-xl mb-4 inline-flex rounded-sm">{name}</p>
        <p className="text-sm inline-flex rounded-sm leading-6 text-slate-700">
          {description}
        </p>
      </div>
    </div>
  );
};

export {RecentWork};