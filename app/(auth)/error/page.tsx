"use client";

import React from "react";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {buttonVariants} from "~/components/ui/button";
import {Heading} from "~/components/ui/heading";
import {cn} from "~/utils/className";

// NextAuth errors
const errors = {
  AccessDenied: "You do not have permission to sign in.",
  Verification: "Unable to verify your email address.",
  default: "Unable to sign in. Try again later."
};

export default function Page() {
  const searchParams = useSearchParams();

  const error = searchParams.get("error");
  const errorKeys = Object.keys(errors);

  return (
    <>
      <header className="flex w-full flex-col items-center gap-4">
        <Heading as="h1" size="xl">
          {error && errorKeys.includes(error) ? error : "Error"}
        </Heading>
        <p className="text-center text-sm">{error && (errors[error as keyof typeof errors] ?? errors.default)}</p>
      </header>

      <div className="flex w-full flex-col justify-center gap-4 pb-12 pt-8">
        <Link href="/sign-in" className={cn(buttonVariants({variant: "secondary"}))}>
          Go back to Sign In page
        </Link>
      </div>
    </>
  );
}
