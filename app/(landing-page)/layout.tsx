import * as React from "react";
import type { Metadata } from "next";

import "~/styles/globals.css";

export const metadata: Metadata = {
  title: "T3 Portfolio",
  description: "Portfolio website created using the T3 stack"
};

export default function LandingPageLayout({ children }: { children: React.ReactNode }) {
  return <main className="bg-background landing-page-layout mx-auto min-h-full">{children}</main>;
}
