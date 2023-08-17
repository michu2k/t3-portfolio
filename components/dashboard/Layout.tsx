import type {PropsWithChildren} from "react";
import React from "react";
import {useSession} from "next-auth/react";
import {Heading} from "~/components/ui/Heading";
import {SidebarMenu} from "~/components/dashboard/SidebarMenu";
import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/Avatar";
import {getUserInitials} from "~/utils/getUserInitials";

type LayoutProps = PropsWithChildren<{
  heading: string;
  description: string;
}>

const Layout = ({heading, description, children}: LayoutProps) => {
  const {data: sessionData} = useSession();
  const {name, image, email} = sessionData?.user || {};

  return (
    <main className="mx-auto min-h-full md:flex">
      <aside className="flex flex-col h-full p-4 md:py-10 border-r-[1px] md:border-slate-200 md:sticky md:top-0 md:h-screen md:w-64">
        <div className="flex items-center gap-2 mb-6 md:mx-4 min-w-0">
          <Avatar>
            {image && <AvatarImage src={image} alt={name || ""} />}
            <AvatarFallback>{getUserInitials(name)}</AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-700 overflow-hidden whitespace-nowrap text-ellipsis">{name}</p>
            <p className="text-xs text-slate-500 overflow-hidden whitespace-nowrap text-ellipsis">{email}</p>
          </div>
        </div>

        <SidebarMenu />
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