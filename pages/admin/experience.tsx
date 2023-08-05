import {type NextPage} from "next";
import Head from "next/head";

import {Experience} from "~/components/admin/Experience";
import {Layout} from "~/components/admin/Layout";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>T3 Portfolio: Experience</title>
      </Head>

      <Layout heading="Experience" description="Experience section settings">
        <Experience />
      </Layout>
    </>
  );
};

export default Page;
