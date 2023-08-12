import {type NextPage} from "next";
import Head from "next/head";
import {List} from "~/components/dashboard/experience/List";
import {Layout} from "~/components/dashboard/Layout";

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
