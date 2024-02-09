import React from "react";
import type {Metadata} from "next";
import {redirect} from "next/navigation";
import {getServerAuthSession} from "~/server/auth";
import {SidebarNavigation} from "~/components/dashboard/layouts/sidebar-navigation";
import {Toaster} from "~/components/ui/toast";

import "~/styles/dashboard-globals.css";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Simple, user-friendly interface for portfolio management"
};

export default async function DashboardLayout({children}: {children: React.ReactNode}) {
  const session = await getServerAuthSession();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <main className="min-h-full md:flex">
      <SidebarNavigation />
      <div className="flex-1">{children}</div>
      <Toaster />
    </main>
  );
}
