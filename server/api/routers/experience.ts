import {z} from "zod";

import {createTRPCRouter, protectedProcedure, publicProcedure} from "~/server/api/trpc";
import {experienceItemSchema} from "~/utils/validations/experience";

// prettier-ignore
export const experienceRouter = createTRPCRouter({
  getItems: publicProcedure
    .input(z.object({
      include: z.object({responsibilities: z.boolean()})
    }).optional())
    .query(async ({ctx, input: {include} = {}}) => {
      return await ctx.prisma.experienceItem.findMany({
        include
      });
    }),

  getItem: protectedProcedure
    .input(z.object({id: z.string()}))
    .query(async ({ctx, input: {id}}) => {
      return await ctx.prisma.experienceItem.findUnique({
        where: {id},
        include: {responsibilities: true}
      });
    }),

  createItem: protectedProcedure
    .input(experienceItemSchema)
    .mutation(async ({ctx, input: {responsibilities, ...input}}) => {
      return await ctx.prisma.experienceItem.create({
        data: {
          ...input,
          responsibilities: {
            createMany: {
              data: responsibilities
            }
          }
        },
        include: {responsibilities: true}
      });
    }),

  updateItem: protectedProcedure
    .input(experienceItemSchema)
    .mutation(async ({ctx, input: {id, responsibilities, ...input}}) => {

      const updatedResponsibilities = responsibilities.filter(({id}) => !!id);
      const currentResponsibilities = updatedResponsibilities.map(({id}) => ({id}));
      const newResponsibilities = responsibilities.filter(({id}) => !id);

      return await ctx.prisma.experienceItem.update({
        where: {id},
        data: {
          ...input,
          responsibilities: {
            deleteMany: {
              NOT: currentResponsibilities
            },
            createMany: {
              data: newResponsibilities
            },
            update: updatedResponsibilities.map(({id, ...data}) => ({
              where: {id},
              data
            }))
          }
        },
        include: {responsibilities: true}
      });
    }),

  deleteItem: protectedProcedure
    .input(z.object({id: z.string()}))
    .mutation(async ({ctx, input: {id}}) => {
      return await ctx.prisma.experienceItem.delete({
        where: {id},
        include: {responsibilities: true}
      });
    })
});
