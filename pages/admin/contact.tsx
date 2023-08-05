import {type NextPage} from "next";
import Head from "next/head";

import {Contact} from "~/components/admin/Contact";
import {Layout} from "~/components/admin/Layout";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>T3 Portfolio: Contact</title>
      </Head>

      <Layout heading="Contact" description="Contact section settings">
        <Contact />
      </Layout>
    </>
  );
};

export default Page;
