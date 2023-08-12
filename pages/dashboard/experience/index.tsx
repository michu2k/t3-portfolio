import type {GetServerSidePropsContext} from "next";
import {type NextPage} from "next";
import Head from "next/head";

import {ExperienceItems} from "~/components/dashboard/ExperienceItems";
import {Layout} from "~/components/dashboard/Layout";
import {authRedirectToSignInPage} from "~/utils/authRedirect";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>T3 Portfolio: Experience</title>
      </Head>

      <Layout heading="Experience" description="Experience section settings">
        <ExperienceItems />
      </Layout>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await authRedirectToSignInPage(ctx);
}

export default Page;
