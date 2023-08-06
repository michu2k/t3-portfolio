import {type NextPage} from "next";
import Head from "next/head";
import {General} from "~/components/admin/portfolio/General";
import {List} from "~/components/admin/portfolio/List";
import {Layout} from "~/components/admin/Layout";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "~/components/Tabs";

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

export default Page;
