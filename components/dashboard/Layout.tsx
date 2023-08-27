import type {PropsWithChildren} from "react";
import React from "react";
import {motion, useTransform, useScroll} from "framer-motion";
import {useSession} from "next-auth/react";
import {Heading} from "~/components/ui/Heading";
import {Navigation} from "~/components/dashboard/Navigation";
import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/Avatar";
import {Sidebar, SidebarContent, SidebarTrigger} from "~/components/ui/Sidebar";
import {getUserInitials} from "~/utils/getUserInitials";

type LayoutProps = PropsWithChildren<{
  heading: string;
  description: string;
}>

const Layout = ({heading, description, children}: LayoutProps) => {
  const {data: sessionData} = useSession();
  const {scrollY} = useScroll();
  const headingOpacity = useTransform(scrollY, [24, 48], [0, 1]);

  const {name, image, email} = sessionData?.user || {};

  return (
    <main className="mx-auto min-h-full md:flex">
      <Sidebar>
        <div className="flex md:hidden items-center justify-center px-4 h-14 sticky top-0 bg-white z-30">
          <SidebarTrigger className="absolute left-4 top-4" />
          <motion.div style={{opacity: headingOpacity}}>
            <Heading as="h2" size="md" className="mb-0">{heading}</Heading>
          </motion.div>
        </div>

        <SidebarContent>
          <div className="flex items-center gap-2 mb-6 px-2 min-w-0">
            <Avatar>
              {image && <AvatarImage src={image} alt={name || ""} />}
              <AvatarFallback>{getUserInitials(name)}</AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-700 overflow-hidden whitespace-nowrap text-ellipsis">
                {name}
              </p>
              <p className="text-xs text-slate-500 overflow-hidden whitespace-nowrap text-ellipsis">
                {email}
              </p>
            </div>
          </div>

          <Navigation />
        </SidebarContent>
      </Sidebar>

      <section className="flex-1 px-4 pt-2 pb-10 md:p-10">
        <header className="lg:max-w-2xl border-b-[1px] border-slate-200">
          <Heading as="h1" size="lg">{heading}</Heading>
          <p className="text-sm leading-6 mb-6 text-slate-500">
            {description}
          </p>
        </header>

        <div className="mt-6 flex flex-col lg:flex-row lg:gap-12">
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </section>
    </main>
  );
};

export {Layout};