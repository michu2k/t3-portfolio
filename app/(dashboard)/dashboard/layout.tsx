import React from "react";
import type {Metadata} from "next";

import {SidebarNavigation} from "~/components/dashboard/layouts/sidebar-navigation";
import {Toaster} from "~/components/ui/toast";

import "~/styles/globals.css";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Simple, user-friendly interface for portfolio management"
};

export default async function DashboardLayout({children}: {children: React.ReactNode}) {
  return (
    <main className="min-h-full md:flex">
      <SidebarNavigation />
      <div className="min-w-0 flex-1">{children}</div>
      <Toaster />
    </main>
  );
}
