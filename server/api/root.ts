import {createTRPCRouter} from "~/server/api/trpc";
import {contactRouter} from "./routers/contact";
import {snippetRouter} from "./routers/snippet";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  contact: contactRouter,
  snippet: snippetRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
