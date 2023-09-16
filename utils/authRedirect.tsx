import type {GetServerSidePropsContext} from "next";
import {getServerAuthSession} from "~/server/auth";

async function authRedirectToSignInPage(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {redirect: {destination: "/dashboard/sign-in"}};
  }

  return {props: {}};
}

export {authRedirectToSignInPage};
