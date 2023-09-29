import type {GetServerSidePropsContext} from "next";
import {type NextPage} from "next";
import Head from "next/head";

import {Layout} from "~/components/dashboard/Layout";
import {ProjectItems} from "~/components/dashboard/ProjectItems";
import {authRedirectToSignInPage} from "~/utils/authRedirect";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>T3 Portfolio: Projects</title>
      </Head>

      <Layout heading="Projects" description="Project section settings">
        <ProjectItems />
      </Layout>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await authRedirectToSignInPage(ctx);
}

export default Page;
