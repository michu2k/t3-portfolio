import {type NextPage} from "next";
import Head from "next/head";
import {signIn, signOut, useSession} from "next-auth/react";

import {api} from "~/utils/api";
import {Header} from "~/components/Header";
import {AboutMe} from "~/components/AboutMe";
import {RecentWork} from "~/components/RecentWork";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({text: "from tRPC"});

  return (
    <>
      <Head>
        <title>T3 Portfolio</title>
      </Head>

      <main className="container mx-auto p-4 max-w-xl md:max-w-5xl min-h-full">
        <Header />
        <hr className="h-px my-4 dark:bg-slate-700" />
        <AboutMe />
        <hr className="h-px my-4 dark:bg-slate-700" />
        <RecentWork />
        <hr className="h-px my-4 dark:bg-slate-700" />

        {hello.data ? hello.data.greeting : "Loading tRPC query..."}
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
