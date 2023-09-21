import {z} from "zod";

import {createTRPCRouter, protectedProcedure, publicProcedure} from "~/server/api/trpc";
import {contactMethodSchema} from "~/utils/validations/contact";

// prettier-ignore
export const contactRouter = createTRPCRouter({
  getItems: publicProcedure
    .query(async ({ctx}) => {
      return await ctx.prisma.contactMethod.findMany();
    }),

  getItem: protectedProcedure
    .input(z.object({id: z.string()}))
    .query(async ({ctx, input: {id}}) => {
      return await ctx.prisma.contactMethod.findUnique({
        where: {id}
      });
    }),

  createItem: protectedProcedure
    .input(contactMethodSchema)
    .mutation(async ({ctx, input}) => {
      return await ctx.prisma.contactMethod.create({
        data: input
      });
    }),

  updateItem: protectedProcedure
    .input(z.object({id: z.string()}).merge(contactMethodSchema))
    .mutation(async ({ctx, input: {id, ...input}}) => {
      return await ctx.prisma.contactMethod.update({
        where: {id},
        data: input
      });
    }),

  deleteItem: protectedProcedure
    .input(z.object({id: z.string()}))
    .mutation(async ({ctx, input: {id}}) => {
      return await ctx.prisma.contactMethod.delete({
        where: {id}
      });
    })
});
