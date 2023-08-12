import {type NextPage} from "next";
import Head from "next/head";

import {Header} from "~/components/dashboard/Header";
import {Layout} from "~/components/dashboard/Layout";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>T3 Portfolio: Header</title>
      </Head>

      <Layout heading="Header" description="Header section headings">
        <Header />
      </Layout>
    </>
  );
};

export default Page;
