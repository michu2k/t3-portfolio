"use client";

import React from "react";
import {signIn} from "next-auth/react";
import type {ClientSafeProvider, LiteralUnion} from "next-auth/react";
import type {BuiltInProviderType} from "next-auth/providers/index";
import {Button} from "~/components/ui/button";

type SignInProvidersProps = {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;
};

const SignInProviders = ({providers}: SignInProvidersProps) => {
  if (!providers) return null;

  return Object.values(providers).map((provider) => (
    <Button key={provider.name} variant="primary" onClick={() => signIn(provider.id)}>
      Sign in with {provider.name}
    </Button>
  ));
};

export {SignInProviders};
