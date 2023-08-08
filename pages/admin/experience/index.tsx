import {type NextPage} from "next";
import Head from "next/head";
import {List} from "~/components/admin/experience/List";
import {Layout} from "~/components/admin/Layout";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>T3 Portfolio: Experience</title>
      </Head>

      <Layout heading="Experience" description="Experience section settings">
        <List />
      </Layout>
    </>
  );
};

export default Page;
