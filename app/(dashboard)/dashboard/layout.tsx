import type {Metadata} from "next";
import {redirect} from "next/navigation";
import React from "react";
import {DashboardSidebar} from "~/components/dashboard/layouts/dashboard-sidebar";
import {getServerAuthSession} from "~/server/auth";

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
    <main className="mx-auto min-h-full md:flex">
      <DashboardSidebar />
      <div className="flex-1">{children}</div>
    </main>
  );
}
