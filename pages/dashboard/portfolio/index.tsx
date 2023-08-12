import type {GetServerSidePropsContext} from "next";
import {type NextPage} from "next";
import Head from "next/head";

import {General} from "~/components/dashboard/portfolio/General";
import {List} from "~/components/dashboard/portfolio/List";
import {Layout} from "~/components/dashboard/Layout";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "~/components/Tabs";
import {authRedirectToSignInPage} from "~/utils/authRedirect";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>T3 Portfolio: Portfolio</title>
      </Head>

      <Layout heading="Portfolio" description="Portfolio section settings">
        <Tabs defaultValue="items">
          <TabsList>
            <TabsTrigger value="items">Portfolio items</TabsTrigger>
            <TabsTrigger value="general">General settings</TabsTrigger>
          </TabsList>
          <TabsContent value="items">
            <List />
          </TabsContent>
          <TabsContent value="general">
            <General />
          </TabsContent>
        </Tabs>
      </Layout>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await authRedirectToSignInPage(ctx);
}

export default Page;
