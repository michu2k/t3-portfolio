import {redirect} from "next/navigation";
import React from "react";
import type {PropsWithChildren} from "react";
import {DashboardSidebar} from "~/components/dashboard/DashboardSidebar";
import {getServerAuthSession} from "~/server/auth";

export default async function DashboardLayout({children}: PropsWithChildren) {
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
