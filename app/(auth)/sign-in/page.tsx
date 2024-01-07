import React from "react";
import Link from "next/link";
import {getProviders} from "next-auth/react";
import {buttonVariants} from "~/components/ui/button";
import {Heading} from "~/components/ui/heading";
import {SignInProviders} from "~/components/auth/sign-in-providers";
import {cn} from "~/utils/className";

export default async function Page() {
  const providers = await getProviders();

  return (
    <>
      <header className="flex w-full flex-col items-center gap-4">
        <Heading as="h1" size="xl">
          Sign In
        </Heading>
        <p className="text-center text-sm">Sign In to the dashboard</p>
      </header>

      <div className="flex w-full flex-col justify-center gap-4 pb-12 pt-8">
        <SignInProviders providers={providers} />

        <div className="relative mx-10">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2">Or</span>
          </div>
        </div>

        <Link href="/" className={cn(buttonVariants({variant: "secondary"}))}>
          Go back to Home page
        </Link>
      </div>
    </>
  );
}
