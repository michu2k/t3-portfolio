import {type NextPage} from "next";
import Head from "next/head";

import {Layout} from "~/components/admin/Layout";
import {ItemForm} from "~/components/admin/experience/ItemForm";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>T3 Portfolio: Experience</title>
      </Head>

      <Layout heading="Edit item" description="Experience section settings">
        <ItemForm />
      </Layout>
    </>
  );
};

export default Page;
