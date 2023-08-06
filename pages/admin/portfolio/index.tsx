import {type NextPage} from "next";
import Head from "next/head";
import {General} from "~/components/admin/portfolio/General";
import {List} from "~/components/admin/portfolio/List";
import {Layout} from "~/components/admin/Layout";
import {Separator} from "~/components/Separator";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>T3 Portfolio: Portfolio</title>
      </Head>

      <Layout heading="Portfolio" description="Portfolio section settings">
        <General />
        <Separator className="my-8" />
        <List />
      </Layout>
    </>
  );
};

export default Page;
