import {type NextPage} from "next";
import Head from "next/head";
import {General} from "~/components/dashboard/General";

import {Layout} from "~/components/dashboard/Layout";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>T3 Portfolio: Dashboard</title>
      </Head>

      <Layout heading="General" description="General page settings">
        <General />
      </Layout>
    </>
  );
};

export default Page;
