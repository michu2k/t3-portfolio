import type {Metadata} from "next";
import {Inter, Poppins} from "next/font/google";
import {cookies} from "next/headers";
import {TRPCReactProvider} from "~/trpc/react";
import {NextAuthProvider} from "./next-auth-provider";
import {ReduxStoreProvider} from "./redux-store-provider";

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
  title: "T3 Portfolio",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <TRPCReactProvider cookies={cookies().toString()}>
          <NextAuthProvider>
            <ReduxStoreProvider>{children}</ReduxStoreProvider>
          </NextAuthProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
