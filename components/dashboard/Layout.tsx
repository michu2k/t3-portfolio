"use client";

import type {PropsWithChildren} from "react";
import React from "react";
import {Heading} from "~/components/ui/Heading";

type LayoutProps = PropsWithChildren<{
  heading: string;
  description: string;
}>;

// @deprecated
const Layout = ({heading, description, children}: LayoutProps) => {
  return (
    <>
      <header className="border-b border-slate-200 lg:max-w-2xl">
        <Heading as="h1" size="lg">
          {heading}
        </Heading>
        <p className="pb-6 text-sm leading-6">{description}</p>
      </header>

      <div className="flex flex-col pt-6 lg:flex-row lg:gap-12">
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </>
  );
};

export {Layout};
