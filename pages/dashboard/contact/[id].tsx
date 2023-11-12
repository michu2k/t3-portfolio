import type {GetServerSidePropsContext} from "next";
import {type NextPage} from "next";
import Head from "next/head";

import {Layout} from "~/components/dashboard/Layout";
import {ContactItemForm} from "~/components/dashboard/ContactItemForm";
import {authRedirectToSignInPage} from "~/utils/authRedirect";
import {useRouter} from "next/router";

const Page: NextPage = () => {
  const {query} = useRouter();
  const itemId = query.id as string;

  const isNew = itemId === "new";
  const heading = isNew ? "Create" : "Edit";
  const description = isNew ? "Create a new contact method." : "Edit an existing contact method.";

  return (
    <>
      <Head>
        <title>T3 Portfolio: Contact</title>
      </Head>

      <Layout heading={heading} description={description}>
        <ContactItemForm />
      </Layout>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await authRedirectToSignInPage(ctx);
}

export default Page;
