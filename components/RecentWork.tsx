import React from "react";
import {PageSection} from "./generics/PageSection";

const RecentWork = () => {
  return (
    <PageSection heading="Recent Work" className="py-12 bg-slate-50">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <RecentWorkItem />
        <RecentWorkItem />
        <RecentWorkItem />
      </div>
    </PageSection>
  );
};

const RecentWorkItem = () => {
  return (
    <div className="w-auto rounded-lg shrink-0 flex flex-col bg-white">
      <div className="w-auto h-56 rounded-lg bg-slate-300 shrink-0">
        {/* <Image /> */}
      </div>

      <div className="flex flex-col items-start p-4">
        <p className="font-semibold text-xl mb-1 inline-flex rounded-sm">Lorem</p>
        <p className="text-sm inline-flex rounded-sm leading-6 text-slate-700">
          Consistency across products with a design system. Improved developer experience and more efficient engineering.
        </p>
      </div>
    </div>
  );
};

export {RecentWork};