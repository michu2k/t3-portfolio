import {type NextPage} from "next";
import Head from "next/head";

import {Layout} from "~/components/dashboard/Layout";
import {ItemForm} from "~/components/dashboard/experience/ItemForm";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>T3 Portfolio: Experience</title>
      </Head>

      <Layout heading="Edit item" description="Create a new experience record or edit an existing one.">
        <ItemForm />
      </Layout>
    </>
  );
};

export default Page;
