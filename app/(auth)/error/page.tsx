"use client";

import React from "react";
import Link from "next/link";
import {Button} from "~/components/ui/button";
import {Heading} from "~/components/ui/heading";

// NextAuth errors
const errors = {
  AccessDenied: "You do not have permission to sign in.",
  Verification: "Unable to verify your email address.",
  default: "Unable to sign in. Try again later."
};

type PageProps = {
  searchParams: {
    error?: string;
  };
};

export default function Page({searchParams}: PageProps) {
  const error = searchParams.error;
  const heading = error && Object.keys(errors).includes(error) ? error : "Error";
  const description = (error && errors[error as keyof typeof errors]) ?? errors.default;

  return (
    <>
      <header className="flex w-full flex-col items-center gap-4">
        <Heading as="h1" size="2xl">
          {heading}
        </Heading>
        <p className="text-center text-sm">{description}</p>
      </header>

      <div className="flex w-full flex-col justify-center gap-4 pb-12 pt-8">
        <Button variant="secondary" asChild>
          <Link href="/sign-in">Go back to Sign In page</Link>
        </Button>
      </div>
    </>
  );
}
