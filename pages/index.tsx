import {type NextPage} from "next";
import Head from "next/head";
import {signIn, signOut, useSession} from "next-auth/react";

import {api} from "~/utils/api";
import {Line} from "~/components/generics/Line";
import {Navigation} from "~/components/landing-page/Navigation";
import {Header} from "~/components/landing-page/Header";
import {AboutMe} from "~/components/landing-page/AboutMe";
import {RecentWork} from "~/components/landing-page/RecentWork";
import {Experience} from "~/components/landing-page/Experience";
import {KeepInTouch} from "~/components/landing-page/KeepInTouch";
import {Footer} from "~/components/landing-page/Footer";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({text: "from tRPC"});

  return (
    <>
      <Head>
        <title>T3 Portfolio</title>
      </Head>

      <main className="mx-auto min-h-full">
        <Navigation />
        <Header />
        <Line />
        <AboutMe />
        <Line />
        <RecentWork />
        <Line />
        <Experience />
        <Line />
        <KeepInTouch />
        <Footer />
        {/*   {hello.data ? hello.data.greeting : "Loading tRPC query..."} */}
        <AuthShowcase />
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const {data: sessionData} = useSession();

  const {data: secretMessage} = api.example.getSecretMessage.useQuery(
    undefined, // no input
    {enabled: sessionData?.user !== undefined}
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
