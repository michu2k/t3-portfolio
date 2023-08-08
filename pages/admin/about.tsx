import {type NextPage} from "next";
import Head from "next/head";

import {About} from "~/components/admin/About";
import {Layout} from "~/components/admin/Layout";

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
