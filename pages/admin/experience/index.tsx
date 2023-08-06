import {type NextPage} from "next";
import Head from "next/head";
import {General} from "~/components/admin/experience/General";
import {List} from "~/components/admin/experience/List";
import {Layout} from "~/components/admin/Layout";
import {Separator} from "~/components/Separator";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>T3 Portfolio: Experience</title>
      </Head>

      <Layout heading="Experience" description="Experience section settings">
        <General />
        <Separator className="my-8" />
        <List />
      </Layout>
    </>
  );
};

export default Page;
