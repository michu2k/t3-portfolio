import {type NextPage} from "next";
import Head from "next/head";

import {Layout} from "~/components/admin/Layout";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>T3 Portfolio: Dashboard</title>
      </Head>

      <Layout heading="Dashboard" description="Lorem ipsum dolor sit, amet consectetur adipisicing elit">
        General
      </Layout>
    </>
  );
};

export default Page;
