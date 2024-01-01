"use client";

import React from "react";
import {SessionProvider} from "next-auth/react";

type NextAuthProviderProps = {
  children: React.ReactNode;
};

function NextAuthProvider({children}: NextAuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

export {NextAuthProvider};
