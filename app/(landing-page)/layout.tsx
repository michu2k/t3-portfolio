import React from "react";
import type {Metadata} from "next";

import "~/styles/globals.css";

export const metadata: Metadata = {
  title: "T3 Portfolio",
  description: "Portofolio website created using the T3 stack"
};

export default function LandingPageLayout({children}: {children: React.ReactNode}) {
  return <main className="mx-auto min-h-full bg-background">{children}</main>;
}
