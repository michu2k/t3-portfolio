import type {GetServerSidePropsContext} from "next";
import {type NextPage} from "next";
import Head from "next/head";

import {Layout} from "~/components/dashboard/Layout";
import {PortfolioForm} from "~/components/dashboard/PortfolioForm";
import {PortfolioItems} from "~/components/dashboard/PortfolioItems";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "~/components/ui/Tabs";
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
            <PortfolioItems />
          </TabsContent>
          <TabsContent value="general">
            <PortfolioForm />
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
