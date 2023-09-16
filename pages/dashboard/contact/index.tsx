import type {GetServerSidePropsContext} from "next";
import {type NextPage} from "next";
import Head from "next/head";

import {ContactForm} from "~/components/dashboard/ContactForm";
import {ContactItems} from "~/components/dashboard/ContactItems";
import {Layout} from "~/components/dashboard/Layout";
import {Separator} from "~/components/ui/Separator";
import {authRedirectToSignInPage} from "~/utils/authRedirect";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>T3 Portfolio: Contact</title>
      </Head>

      <Layout heading="Contact" description="Contact section settings">
        <ContactForm />
        <Separator className="my-8" />
        <ContactItems />
      </Layout>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await authRedirectToSignInPage(ctx);
}

export default Page;
