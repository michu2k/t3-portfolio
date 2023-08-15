import type {PropsWithChildren} from "react";
import React from "react";
import {useSession} from "next-auth/react";
import {Heading} from "~/components/ui/Heading";
import {Sidebar} from "~/components/dashboard/Sidebar";

type LayoutProps = PropsWithChildren<{
  heading: string;
  description: string;
}>

const Layout = ({heading, description, children}: LayoutProps) => {
  const {data: sessionData} = useSession();

  console.log({sessionData});

  return (
    <main className="mx-auto min-h-full md:flex">
      <aside className="p-4 md:py-10 border-r-[1px] md:border-slate-200 md:sticky md:top-0 md:h-screen md:w-64">
        <Sidebar />
      </aside>

      <section className="flex-1 p-4 md:p-10">
        <header className="lg:max-w-2xl border-b-[1px] border-slate-200">
          <Heading as="h2" size="lg">{heading}</Heading>
          <p className="text-sm leading-6 mb-6 text-slate-500">{description}</p>
        </header>

        <div className="mt-6 flex flex-col lg:flex-row lg:gap-12">
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </section>
    </main>
  );
};

export {Layout};