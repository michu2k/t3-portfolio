import type {PropsWithChildren} from "react";
import type {Metadata} from "next";
import {Inter, Poppins} from "next/font/google";
import {cookies} from "next/headers";
import {TRPCReactProvider} from "~/trpc/react";
import {NextAuthProvider} from "./NextAuthProvider";

import "~/styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["500", "600", "700"],
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Simple, user-friendly interface for portfolio management",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({children}: PropsWithChildren) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <TRPCReactProvider cookies={cookies().toString()}>
          <NextAuthProvider>{children}</NextAuthProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
