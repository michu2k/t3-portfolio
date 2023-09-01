import {ContactMethodType} from "@prisma/client";
import {z} from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure
} from "~/server/api/trpc";

export const contactRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ctx}) => {
    return ctx.prisma.contactMethod.findMany();
  })
});
