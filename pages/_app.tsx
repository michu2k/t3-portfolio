import {type AppType} from "next/app";
import {type Session} from "next-auth";
import {SessionProvider} from "next-auth/react";
import {Inter, Poppins} from "next/font/google";

import {api} from "~/utils/api";

import "~/styles/globals.css";

export const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["500", "600", "700"]
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400"]
});

const MyApp: AppType<{session: Session | null}> = ({Component, pageProps: {session, ...pageProps}}) => {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>

      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
