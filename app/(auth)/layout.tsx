import React from "react";
import type {Metadata} from "next";
import {redirect} from "next/navigation";
import {getServerAuthSession} from "~/server/auth";
import pkg from "~/package.json";

import "~/styles/dashboard-globals.css";

export const metadata: Metadata = {
  title: "Dashboard: Authentication",
  description: "Simple, user-friendly interface for portfolio management"
};

export default async function SignInLayout({children}: {children: React.ReactNode}) {
  const session = await getServerAuthSession();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-full">
      <div className="mx-auto flex w-full max-w-80 flex-col items-center justify-center px-4">
        {children}

        <footer className="flex flex-col items-center">
          <span className="text-xs text-muted-foreground opacity-50">Dashboard v{pkg.version}</span>
        </footer>
      </div>
    </main>
  );
}
