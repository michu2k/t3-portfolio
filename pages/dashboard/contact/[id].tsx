import type {GetServerSidePropsContext} from "next";
import {type NextPage} from "next";
import Head from "next/head";

import {Layout} from "~/components/dashboard/Layout";
import {ContactItemForm} from "~/components/dashboard/ContactItemForm";
import {authRedirectToSignInPage} from "~/utils/authRedirect";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>T3 Portfolio: Contact</title>
      </Head>

      <Layout heading="Edit item" description="Create a new record or edit an existing one.">
        <ContactItemForm />
      </Layout>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await authRedirectToSignInPage(ctx);
}

export default Page;
