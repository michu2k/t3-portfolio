import {type NextPage} from "next";
import Head from "next/head";

import {Header} from "~/components/admin/Header";
import {Layout} from "~/components/admin/Layout";

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
