"use client";

import React from "react";
import {useSession} from "next-auth/react";
import {SidebarNavigation} from "~/components/layouts/sidebar-navigation";
import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/avatar";
import {Sidebar, SidebarContent, SidebarTrigger} from "~/components/ui/sidebar";
import {getUserInitials} from "~/utils/get-user-initials";

const DashboardSidebar = () => {
  const {data: sessionData} = useSession();
  const {name, image, email} = sessionData?.user || {};

  return (
    <Sidebar>
      <SidebarTrigger className="fixed left-4 top-4 z-40 md:hidden" />

      <SidebarContent className="gap-10">
        <div className="flex min-w-0 items-center gap-2 px-2">
          <Avatar>
            {image && <AvatarImage src={image} alt="" />}
            <AvatarFallback>{getUserInitials(name)}</AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="overflow-hidden text-ellipsis whitespace-nowrap font-poppins text-sm font-medium text-slate-700">
              {name}
            </p>
            <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs">{email}</p>
          </div>
        </div>

        <SidebarNavigation />
      </SidebarContent>
    </Sidebar>
  );
};

export {DashboardSidebar};
