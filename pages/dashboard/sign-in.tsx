import type {GetServerSidePropsContext, InferGetServerSidePropsType, NextPage} from "next";
import Head from "next/head";
import {getProviders, signIn} from "next-auth/react";
import Link from "next/link";
import {getServerAuthSession} from "~/server/auth";
import {Card, CardContent, CardDescription, CardFooter, CardHeader} from "~/components/ui/Card";
import {Button, buttonVariants} from "~/components/ui/Button";
import {Heading} from "~/components/ui/Heading";
import {cn} from "~/utils/className";
import {version} from "~/package.json";

const Page: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({providers}) => {

  function displaySignInProviders() {
    return Object.values(providers).map((provider) => (
      <Button key={provider.name} variant="primary" onClick={() => void signIn(provider.id)}>
        Sign in with {provider.name}
      </Button>
    ));
  }

  return (
    <>
      <Head>
        <title>T3 Portfolio: Sign In</title>
      </Head>

      <main className="mx-auto min-h-full px-4 flex items-center justify-center">
        <Card className="w-full max-w-[20rem]">
          <CardHeader className="space-y-1">
            <Heading as="h1" size="lg">Sign In</Heading>
            <CardDescription>
              Sign In to the dashboard.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col justify-center gap-4 pt-4 pb-10">
            {displaySignInProviders()}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>

              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500">
                  Or
                </span>
              </div>
            </div>

            <Link href="/" className={cn(buttonVariants({variant: "secondary"}))}>
              Go back to Home page
            </Link>
          </CardContent>

          <CardFooter>
            <span className="text-xs text-slate-500">Portfolio Dashboard v{version}</span>
          </CardFooter>
        </Card>
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