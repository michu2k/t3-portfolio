import {z} from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from "~/server/api/trpc";
import {contactMethodSchema} from "~/utils/validations/contact";

export const contactRouter = createTRPCRouter({
  getContactMethods: publicProcedure
    .query(async ({ctx}) => {
      return await ctx.prisma.contactMethod.findMany();
    }),

  getContactMethod: protectedProcedure
    .input(z.object({id: z.string()}))
    .query(async ({ctx, input: {id}}) => {
      return await ctx.prisma.contactMethod.findUnique({
        where: {id}
      });
    }),

  createContactMethod: protectedProcedure
    .input(contactMethodSchema)
    .mutation(async ({ctx, input}) => {
      return await ctx.prisma.contactMethod.create({
        data: input
      });
    }),

  updateContactMethod: protectedProcedure
    .input(contactMethodSchema.partial())
    .mutation(async ({ctx, input: {id, ...input}}) => {
      return await ctx.prisma.contactMethod.update({
        where: {id},
        data: input
      });
    }),

  deleteContactMethod: protectedProcedure
    .input(z.object({id: z.string()}))
    .mutation(async ({ctx, input: {id}}) => {
      return await ctx.prisma.contactMethod.delete({
        where: {id}
      });
    })
});
