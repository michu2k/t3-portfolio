import type {PropsWithChildren} from "react";
import React from "react";
import {Separator} from "~/components/Separator";
import {Sidebar} from "./Sidebar";
import {Heading} from "~/components/Heading";

type LayoutProps = PropsWithChildren<{
  heading: string;
  description: string;
}>

const Layout = ({heading, description, children}: LayoutProps) => {
  return (
    <main className="mx-auto min-h-full md:flex bg-white">
      <aside className="md:w-64 p-4 md:py-10 bg-white">
        <Sidebar />
      </aside>

      <section className="flex-1 p-4 md:p-10">
        <header>
          <Heading as="h2" size="lg">{heading}</Heading>
          <p className="text-sm leading-6 mb-6 max-w-2xl">
            {description}
          </p>
        </header>

        <Separator isFullWidth />

        <div className="mt-6 flex flex-col lg:flex-row lg:gap-12">
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </section>
    </main>
  );
};

export {Layout};