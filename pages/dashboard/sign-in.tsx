import type {GetServerSidePropsContext, InferGetServerSidePropsType, NextPage} from "next";
import Head from "next/head";
import {getProviders, signIn} from "next-auth/react";
import Link from "next/link";
import {getServerAuthSession} from "~/server/auth";
import {Button, buttonVariants} from "~/components/ui/Button";
import {Heading} from "~/components/ui/Heading";
import {cn} from "~/utils/className";
import pkg from "~/package.json";
import {inter, poppins} from "../_app";

const Page: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({providers}) => {
  function displaySignInProviders() {
    return Object.values(providers).map((provider) => (
      <Button key={provider.name} variant="primary" onClick={() => signIn(provider.id)}>
        Sign in with {provider.name}
      </Button>
    ));
  }

  return (
    <>
      <Head>
        <title>T3 Portfolio: Sign In</title>
      </Head>

      <main
        className={`${inter.variable} ${poppins.variable} mx-auto flex min-h-full items-center justify-center px-4`}>
        <section className="w-full max-w-[20rem]">
          <header className="flex flex-col items-center gap-4">
            <Heading as="h1" size="xl">
              Sign In
            </Heading>
            <p className="text-center text-sm">Sign In to the dashboard</p>
          </header>

          <div className="flex flex-col justify-center gap-4 pb-12 pt-8">
            {displaySignInProviders()}

            <div className="relative mx-10">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>

              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2">Or</span>
              </div>
            </div>

            <Link href="/" className={cn(buttonVariants({variant: "secondary"}))}>
              Go back to Home page
            </Link>
          </div>

          <footer className="flex flex-col items-center">
            <span className="text-xs text-slate-400">Dashboard v{pkg.version}</span>
          </footer>
        </section>
      </main>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);

  if (session) {
    return {redirect: {destination: "/dashboard"}};
  }

  const providers = await getProviders();

  return {
    props: {providers: providers ?? []}
  };
}

export default Page;
