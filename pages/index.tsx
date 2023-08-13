import {type NextPage} from "next";
import Head from "next/head";

import {Separator} from "~/components/ui/Separator";
import {Navigation} from "~/components/landing-page/Navigation";
import {Header} from "~/components/landing-page/Header";
import {AboutMe} from "~/components/landing-page/AboutMe";
import {RecentWork} from "~/components/landing-page/RecentWork";
import {Experience} from "~/components/landing-page/Experience";
import {KeepInTouch} from "~/components/landing-page/KeepInTouch";
import {Footer} from "~/components/landing-page/Footer";

const Page: NextPage = () => {
  // const hello = api.example.hello.useQuery({text: "from tRPC"});

  return (
    <>
      <Head>
        <title>T3 Portfolio</title>
      </Head>

      <main className="mx-auto min-h-full">
        <Navigation />
        <Header />
        <Separator />
        <AboutMe />
        <Separator />
        <RecentWork />
        <Separator />
        <Experience />
        <Separator />
        <KeepInTouch />
        <Footer />
        {/*   {hello.data ? hello.data.greeting : "Loading tRPC query..."} */}
      </main>
    </>
  );
};

export default Page;