import {createCallerFactory, createTRPCRouter} from "~/server/api/trpc";

import {contactRouter} from "./routers/contact";
import {experienceRouter} from "./routers/experience";
import {imageRouter} from "./routers/image";
import {projectRouter} from "./routers/project";
import {snippetRouter} from "./routers/snippet";
import {socialMediaRouter} from "./routers/social-media";

/**
 * This is the primary router for your server.
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  contact: contactRouter,
  snippet: snippetRouter,
  experience: experienceRouter,
  socialMedia: socialMediaRouter,
  project: projectRouter,
  image: imageRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
