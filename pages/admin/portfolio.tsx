import {type NextPage} from "next";
import Head from "next/head";

import {Portfolio} from "~/components/admin/Portfolio";
import {Layout} from "~/components/admin/Layout";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>T3 Portfolio: Portfolio</title>
      </Head>

      <Layout heading="Portfolio" description="Portfolio section settings">
        <Portfolio />
      </Layout>
    </>
  );
};

export default Page;
