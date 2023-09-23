import {z} from "zod";

import {createTRPCRouter, protectedProcedure, publicProcedure} from "~/server/api/trpc";
import {socialMediaItemSchema} from "~/utils/validations/socialMedia";

// prettier-ignore
export const socialMediaRouter = createTRPCRouter({
  getItems: publicProcedure
    .query(async ({ctx}) => {
      return await ctx.prisma.socialMediaIcon.findMany();
    }),

  getItem: protectedProcedure
    .input(z.object({id: z.string()}))
    .query(async ({ctx, input: {id}}) => {
      return await ctx.prisma.socialMediaIcon.findUnique({
        where: {id}
      });
    }),

  createItem: protectedProcedure
    .input(socialMediaItemSchema)
    .mutation(async ({ctx, input}) => {
      return await ctx.prisma.socialMediaIcon.create({
        data: input
      });
    }),

  updateItem: protectedProcedure
    .input(z.object({id: z.string()}).merge(socialMediaItemSchema))
    .mutation(async ({ctx, input: {id, ...input}}) => {
      return await ctx.prisma.socialMediaIcon.update({
        where: {id},
        data: input
      });
    }),

  deleteItem: protectedProcedure
    .input(z.object({id: z.string()}))
    .mutation(async ({ctx, input: {id}}) => {
      return await ctx.prisma.socialMediaIcon.delete({
        where: {id}
      });
    })
});
