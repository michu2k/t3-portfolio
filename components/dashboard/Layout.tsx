import type {PropsWithChildren} from "react";
import React from "react";
import {motion, useTransform, useScroll} from "framer-motion";
import {useSession} from "next-auth/react";
import {Heading} from "~/components/ui/Heading";
import {Navigation} from "~/components/dashboard/Navigation";
import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/Avatar";
import {Sidebar, SidebarContent, SidebarTrigger} from "~/components/ui/Sidebar";
import {getUserInitials} from "~/utils/getUserInitials";
import {inter, poppins} from "~/pages/_app";

type LayoutProps = PropsWithChildren<{
  heading: string;
  description: string;
}>;

const Layout = ({heading, description, children}: LayoutProps) => {
  const {data: sessionData} = useSession();
  const {scrollY} = useScroll();
  const headingOpacity = useTransform(scrollY, [24, 48], [0, 1]);

  const {name, image, email} = sessionData?.user || {};

  return (
    <main className={`${inter.variable} ${poppins.variable} mx-auto min-h-full md:flex`}>
      <Sidebar>
        <div className="sticky top-0 z-30 flex h-14 items-center justify-center bg-white px-4 md:hidden">
          <SidebarTrigger className="absolute left-4 top-4" />
          <motion.div style={{opacity: headingOpacity}}>
            <Heading as="h1" size="md" className="mb-0">
              {heading}
            </Heading>
          </motion.div>
        </div>

        <SidebarContent>
          <div className="mb-6 flex min-w-0 items-center gap-2 px-2">
            <Avatar>
              {image && <AvatarImage src={image} alt="" />}
              <AvatarFallback>{getUserInitials(name)}</AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <p className="overflow-hidden text-ellipsis whitespace-nowrap font-poppins text-sm font-medium text-slate-700">
                {name}
              </p>
              <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-slate-500">{email}</p>
            </div>
          </div>

          <Navigation />
        </SidebarContent>
      </Sidebar>

      <section className="flex-1 px-4 pb-10 pt-2 md:p-10">
        <header className="border-b-[1px] border-slate-200 lg:max-w-2xl">
          <Heading as="h1" size="lg">
            {heading}
          </Heading>
          <p className="mb-6 text-sm leading-6 text-slate-500">{description}</p>
        </header>

        <div className="mt-6 flex flex-col lg:flex-row lg:gap-12">
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </section>
    </main>
  );
};

export {Layout};
