"use client";

import React from "react";
import type {PropsWithChildren} from "react";
import {SessionProvider} from "next-auth/react";

function NextAuthProvider({children}: PropsWithChildren) {
  return <SessionProvider>{children}</SessionProvider>;
}

export {NextAuthProvider};
