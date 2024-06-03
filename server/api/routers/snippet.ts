import type {Snippet} from "@prisma/client";
import {SnippetType} from "@prisma/client";
import {z} from "zod";

import {createTRPCRouter, protectedProcedure, publicProcedure} from "~/server/api/trpc";
import {snippetSchema} from "~/utils/validations/snippet";

export type Snippets = Array<Pick<Snippet, "id" | "name" | "value">>;

// prettier-ignore
export const snippetRouter = createTRPCRouter({
  getAllSnippets: publicProcedure
    .query(async ({ctx}) => {
      const snippets = await ctx.prisma.snippet.findMany({
        select: {
          id: true,
          name: true,
          value: true,
          type: true
        }
      });

      // Group snippets by type
      const groupedSnippets = snippets.reduce<{[key in SnippetType]: Snippets}>((acc, {type, ...snippet}) => (
        {...acc, [type]: [...acc[type] || [], snippet]}
      ), {
        [SnippetType.HEADER]: [],
        [SnippetType.ABOUT_ME]: [],
        [SnippetType.CONTACT]: []
      });

      return groupedSnippets;
    }),

  getSnippetsByType: publicProcedure
    .input(z.object({
      type: z.nativeEnum(SnippetType),
      keys: z.array(z.string())
    }))
    .query(async ({ctx, input: {type, keys}}) => {
      return await ctx.prisma.snippet.findMany({
        where: {AND: {type, name: {in: keys}}},
        select: {
          id: true,
          name: true,
          value: true
        }
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
