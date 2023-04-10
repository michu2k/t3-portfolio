import {type AppType} from "next/app";
import {type Session} from "next-auth";
import {SessionProvider} from "next-auth/react";
import {Inter} from "next/font/google";

import {api} from "~/utils/api";

import "~/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"]
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: {session, ...pageProps}
}) => {
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
