import {getServerSession, type NextAuthOptions, type DefaultSession} from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import type {Adapter} from "next-auth/adapters";
import {env} from "~/env";
import {prisma} from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    async signIn({user}) {
      const isEmailAllowed = env.ALLOWED_EMAIL_ADDRESSES.split(",").find((e) => e.trim() === user.email);
      return !!isEmailAllowed;
    },
    session: ({session, user}) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id
      }
    })
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    })
  ],
  debug: env.NODE_ENV === "development",
  pages: {
    signIn: "/sign-in",
    error: "/error"
  }
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
