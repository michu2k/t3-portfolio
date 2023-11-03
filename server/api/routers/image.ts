import {z} from "zod";

import {createTRPCRouter, protectedProcedure, publicProcedure} from "~/server/api/trpc";
import {deleteFileFromS3, getPresignedUrl, uploadFileToS3} from "~/server/s3";
import type {FileObj} from "~/utils/file";

// prettier-ignore
export const imageRouter = createTRPCRouter({
  getImage: publicProcedure
    .input(z.object({id: z.string().optional()}))
    .query(async ({ctx, input: {id}}) => {
      const item = await ctx.prisma.image.findUnique({
        where: {id}
      });

      if (item) {
        return await getPresignedUrl(item.image);
      }

      return null;
    }),

  createImage: protectedProcedure
    .input(z.object({image: z.custom<FileObj>()}))
    .mutation(async ({ctx, input: {image}}) => {
      if (!image) {
        throw new Error("Image is required");
      }

      return await ctx.prisma.$transaction(async (tx) => {
        const {key: imageKey} = await uploadFileToS3(image);

        return await tx.image.create({
          data: {
            image: imageKey
          }
        });
      });
    }),

  deleteImage: protectedProcedure
    .input(z.object({id: z.string()}))
    .mutation(async ({ctx, input: {id}}) => {
      return await ctx.prisma.$transaction(async (tx) => {
        const item = await tx.image.delete({
          where: {id}
        });

        await deleteFileFromS3(item.image);

        return item;
      });
    })
});
