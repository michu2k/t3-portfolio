import React from "react";

const RecentWork = () => {
  return (
    <section className="py-6 mb-6">
      <h2 className="font-semibold text-2xl mb-5">Recent Work</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        <RecentWorkItem />
        <RecentWorkItem />
        <RecentWorkItem />
      </div>
    </section>
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