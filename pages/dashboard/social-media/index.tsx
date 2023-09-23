import type {GetServerSidePropsContext} from "next";
import {type NextPage} from "next";
import Head from "next/head";

import {SocialMediaItems} from "~/components/dashboard/SocialMediaItems";
import {Layout} from "~/components/dashboard/Layout";
import {authRedirectToSignInPage} from "~/utils/authRedirect";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>T3 Portfolio: Social media</title>
      </Head>

      <Layout heading="Social media" description="Social media settings">
        <SocialMediaItems />
      </Layout>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await authRedirectToSignInPage(ctx);
}

export default Page;
