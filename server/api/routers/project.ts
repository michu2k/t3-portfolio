import {z} from "zod";

import {createTRPCRouter, protectedProcedure, publicProcedure} from "~/server/api/trpc";
import {projectItemSchema} from "~/utils/validations/project";

// prettier-ignore
export const projectRouter = createTRPCRouter({
  getItems: publicProcedure
    .query(async ({ctx}) => {
      return await ctx.prisma.projectItem.findMany();
    }),

  getItem: protectedProcedure
    .input(z.object({id: z.string()}))
    .query(async ({ctx, input: {id}}) => {
      return await ctx.prisma.projectItem.findUnique({
        where: {id}
      });
    }),

  createItem: protectedProcedure
    .input(projectItemSchema)
    .mutation(async ({ctx, input}) => {
      return await ctx.prisma.projectItem.create({
        data: input
      });
    }),

  updateItem: protectedProcedure
    .input(projectItemSchema)
    .mutation(async ({ctx, input: {id, ...input}}) => {
      return await ctx.prisma.projectItem.update({
        where: {id},
        data: input
      });
    }),

  deleteItem: protectedProcedure
    .input(z.object({id: z.string()}))
    .mutation(async ({ctx, input: {id}}) => {
      return await ctx.prisma.projectItem.delete({
        where: {id}
      });
    })
});
