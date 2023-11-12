import type {GetServerSidePropsContext} from "next";
import {type NextPage} from "next";
import Head from "next/head";
import {useRouter} from "next/router";

import {Layout} from "~/components/dashboard/Layout";
import {SocialMediaItemForm} from "~/components/dashboard/SocialMediaItemForm";
import {authRedirectToSignInPage} from "~/utils/authRedirect";

const Page: NextPage = () => {
  const {query} = useRouter();
  const itemId = query.id as string;

  const isNew = itemId === "new";
  const heading = isNew ? "Create" : "Edit";
  const description = isNew ? "Create a new social media link." : "Edit an existing link.";

  return (
    <>
      <Head>
        <title>T3 Portfolio: Social Media</title>
      </Head>

      <Layout heading={heading} description={description}>
        <SocialMediaItemForm />
      </Layout>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await authRedirectToSignInPage(ctx);
}

export default Page;
