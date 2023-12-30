import {redirect} from "next/navigation";
import React from "react";
import type {PropsWithChildren} from "react";
import {getServerAuthSession} from "~/server/auth";

export default async function SignInLayout({children}: PropsWithChildren) {
  const session = await getServerAuthSession();

  if (session?.user) {
    redirect("/dashboard");
  }

  return <main className="mx-auto flex min-h-full items-center justify-center px-4">{children}</main>;
}
