import {type NextPage} from "next";
import Head from "next/head";

import {Layout} from "~/components/admin/Layout";
import {ItemForm} from "~/components/admin/portfolio/ItemForm";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>T3 Portfolio: Portfolio</title>
      </Head>

      <Layout heading="Edit item" description="Create a new portfolio item or edit an existing one.">
        <ItemForm />
      </Layout>
    </>
  );
};

export default Page;
