import React from "react";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "T3 Portfolio",
  description: "Portofolio website created using the T3 stack"
};

type LandingPageLayoutProps = {
  children: React.ReactNode;
};

export default function LandingPageLayout({children}: LandingPageLayoutProps) {
  return <main className="mx-auto min-h-full">{children}</main>;
}
