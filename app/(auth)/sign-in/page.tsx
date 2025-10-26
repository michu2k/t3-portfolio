import * as React from "react";
import Link from "next/link";
import { getProviders } from "next-auth/react";

import { Button } from "~/components/ui/button";
import { Heading } from "~/components/ui/heading";
import { ensureUnAuthenticated } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";

import { SignInProviders } from "./sign-in-providers";

export default async function Page() {
  await ensureUnAuthenticated();

  const providers = await getProviders();

  return (
    <HydrateClient>
      <header className="flex w-full flex-col items-center gap-4">
        <Heading as="h1" size="2xl">
          Sign In
        </Heading>
        <p className="text-center text-sm">Sign In to the dashboard</p>
      </header>

      <div className="flex w-full flex-col justify-center gap-4 pt-8 pb-12">
        <SignInProviders providers={providers} />

        <div className="relative mx-10">
          <div className="absolute inset-0 flex items-center">
            <span className="border-muted w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2">Or</span>
          </div>
        </div>

        <Button variant="secondary" asChild>
          <Link href="/">Go back to Home page</Link>
        </Button>
      </div>
    </HydrateClient>
  );
}
