import {createTRPCRouter} from "~/server/api/trpc";
import {contactRouter} from "./routers/contact";
import {snippetRouter} from "./routers/snippet";
import {experienceRouter} from "./routers/experience";
import {socialMediaRouter} from "./routers/socialMedia";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  contact: contactRouter,
  snippet: snippetRouter,
  experience: experienceRouter,
  socialMedia: socialMediaRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
