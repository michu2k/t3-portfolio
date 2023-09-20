import {z} from "zod";

import {createTRPCRouter, protectedProcedure, publicProcedure} from "~/server/api/trpc";
import {experienceItemSchema} from "~/utils/validations/experience";

// prettier-ignore
export const experienceRouter = createTRPCRouter({
  getExperienceItems: publicProcedure
    .query(async ({ctx}) => {
      return await ctx.prisma.experienceItem.findMany();
    }),

  getExperienceItem: protectedProcedure
    .input(z.object({id: z.string()}))
    .query(async ({ctx, input: {id}}) => {
      return await ctx.prisma.experienceItem.findUnique({
        where: {id},
        include: {responsibilities: true}
      });
    }),

  createExperienceItem: protectedProcedure
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

  updateExperienceItem: protectedProcedure
    .input(z.object({id: z.string()}).merge(experienceItemSchema))
    .mutation(async ({ctx, input: {id, responsibilities, ...input}}) => {

      const currentResponsibilities = responsibilities.filter(({id}) => !!id).map(({id}) => ({id}));
      const updatedResponsibilities = responsibilities.filter(({id}) => !!id);
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

  deleteExperienceItem: protectedProcedure
    .input(z.object({id: z.string()}))
    .mutation(async ({ctx, input: {id}}) => {
      return await ctx.prisma.experienceItem.delete({
        where: {id},
        include: {responsibilities: true}
      });
    })
});
