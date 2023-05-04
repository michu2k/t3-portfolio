import {type NextPage} from "next";
import Head from "next/head";
import {signIn, signOut, useSession} from "next-auth/react";

import {api} from "~/utils/api";
import {Header} from "~/components/Header";
import {AboutMe} from "~/components/AboutMe";
import {RecentWork} from "~/components/RecentWork";
import {KeepInTouch} from "~/components/KeepInTouch";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({text: "from tRPC"});

  return (
    <>
      <Head>
        <title>T3 Portfolio</title>
      </Head>

      <main className="sm:px-4 md:px-8 mx-auto md:max-w-7xl min-h-full">
        <Header />
        <hr className="max-w-xl md:max-w-4xl mx-auto h-px my-4 dark:bg-slate-700" />
        <AboutMe />
        <RecentWork />
        {/* <hr className="max-w-xl md:max-w-4xl mx-auto h-px my-4 dark:bg-slate-700" /> */}
        <KeepInTouch />
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
