import React from "react";

type DashboardContentProps = {
  children: React.ReactNode;
};

const DashboardContent = ({children}: DashboardContentProps) => {
  return (
    <section className="flex flex-col px-4 pb-10 pt-6 md:px-10 lg:flex-row lg:gap-12">
      <div className="flex-1 lg:max-w-2xl">{children}</div>
    </section>
  );
};

export {DashboardContent};
