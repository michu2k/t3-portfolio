import {type NextPage} from "next";
import Head from "next/head";

import {General} from "~/components/admin/General";
import {Layout} from "~/components/admin/Layout";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>T3 Portfolio: General</title>
      </Head>

      <Layout heading="General" description="General page settings">
        <General />
      </Layout>
    </>
  );
};

export default Page;
