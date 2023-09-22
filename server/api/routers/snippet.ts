import {SnippetType} from "@prisma/client";
import {z} from "zod";

import {createTRPCRouter, protectedProcedure, publicProcedure} from "~/server/api/trpc";
import {snippetSchema} from "~/utils/validations/snippet";

// prettier-ignore
export const snippetRouter = createTRPCRouter({
  getSnippets: publicProcedure
    .input(z.object({
      type: z.nativeEnum(SnippetType),
      keys: z.array(z.string())
    }))
    .query(async ({ctx, input: {type, keys}}) => {
      return await ctx.prisma.snippet.findMany({
        where: {AND: {type, name: {in: keys}}}
      });
    }),

  createSnippet: protectedProcedure
    .input(snippetSchema)
    .mutation(async ({ctx, input}) => {
      return await ctx.prisma.snippet.create({
        data: input
      });
    }),

  updateSnippet: protectedProcedure
    .input(snippetSchema.partial())
    .mutation(async ({ctx, input: {id, ...input}}) => {
      return await ctx.prisma.snippet.update({
        where: {id},
        data: input
      });
    }),

  deleteSnippet: protectedProcedure
    .input(z.object({id: z.string()}))
    .mutation(async ({ctx, input: {id}}) => {
      return await ctx.prisma.snippet.delete({
        where: {id}
      });
    })
});
