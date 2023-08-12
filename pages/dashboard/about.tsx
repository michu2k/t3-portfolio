import {type NextPage} from "next";
import Head from "next/head";

import {About} from "~/components/dashboard/About";
import {Layout} from "~/components/dashboard/Layout";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>T3 Portfolio: About</title>
      </Head>

      <Layout heading="About" description="About section settings">
        <About />
      </Layout>
    </>
  );
};

export default Page;
