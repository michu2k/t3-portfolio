import type {GetServerSidePropsContext} from "next";
import {type NextPage} from "next";
import Head from "next/head";

import {Layout} from "~/components/dashboard/Layout";
import {PortfolioItemForm} from "~/components/dashboard/PortfolioItemForm";
import {authRedirectToSignInPage} from "~/utils/authRedirect";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>T3 Portfolio: Portfolio</title>
      </Head>

      <Layout heading="Edit item" description="Create a new portfolio item or edit an existing one.">
        <PortfolioItemForm />
      </Layout>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await authRedirectToSignInPage(ctx);
}

export default Page;
