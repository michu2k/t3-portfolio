import {z} from "zod";

import {createTRPCRouter, protectedProcedure, publicProcedure} from "~/server/api/trpc";
import {socialMediaLinkSchema} from "~/utils/validations/social-media";

// prettier-ignore
export const socialMediaRouter = createTRPCRouter({
  getItems: publicProcedure
    .query(async ({ctx}) => {
      return await ctx.prisma.socialMediaLink.findMany();
    }),

  getItem: protectedProcedure
    .input(z.object({id: z.string()}))
    .query(async ({ctx, input: {id}}) => {
      return await ctx.prisma.socialMediaLink.findUnique({
        where: {id}
      });
    }),

  createItem: protectedProcedure
    .input(socialMediaLinkSchema)
    .mutation(async ({ctx, input}) => {
      return await ctx.prisma.socialMediaLink.create({
        data: input
      });
    }),

  updateItem: protectedProcedure
    .input(socialMediaLinkSchema)
    .mutation(async ({ctx, input: {id, ...input}}) => {
      return await ctx.prisma.socialMediaLink.update({
        where: {id},
        data: input
      });
    }),

  deleteItem: protectedProcedure
    .input(z.object({id: z.string()}))
    .mutation(async ({ctx, input: {id}}) => {
      return await ctx.prisma.socialMediaLink.delete({
        where: {id}
      });
    })
});
