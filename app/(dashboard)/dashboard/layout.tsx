import React from "react";
import type {Metadata} from "next";
import {redirect} from "next/navigation";
import {getServerAuthSession} from "~/server/auth";
import {SidebarNavigation} from "~/components/dashboard/layouts/sidebar-navigation";
import {Toaster} from "~/components/ui/toast";

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
    <main className="mx-auto min-h-full bg-white md:flex">
      <SidebarNavigation />
      <div className="flex-1">{children}</div>
      <Toaster />
    </main>
  );
}
