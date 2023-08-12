import type {GetServerSidePropsContext} from "next";
import {type NextPage} from "next";
import Head from "next/head";

import {Layout} from "~/components/dashboard/Layout";
import {ItemForm} from "~/components/dashboard/portfolio/ItemForm";
import {authRedirectToSignInPage} from "~/utils/authRedirect";

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

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await authRedirectToSignInPage(ctx);
}

export default Page;
