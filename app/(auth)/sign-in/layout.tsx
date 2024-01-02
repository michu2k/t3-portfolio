import React from "react";
import type {Metadata} from "next";
import {redirect} from "next/navigation";
import {getServerAuthSession} from "~/server/auth";

export const metadata: Metadata = {
  title: "Dashboard: Sign in",
  description: "Simple, user-friendly interface for portfolio management"
};

export default async function SignInLayout({children}: {children: React.ReactNode}) {
  const session = await getServerAuthSession();

  if (session?.user) {
    redirect("/dashboard");
  }

  return <main className="mx-auto flex min-h-full items-center justify-center px-4">{children}</main>;
}
