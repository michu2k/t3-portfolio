import {z} from "zod";
import {TRPCError} from "@trpc/server";
import type {ProjectItem as PrismaProjectItem} from "@prisma/client";

import {createTRPCRouter, protectedProcedure, publicProcedure} from "~/server/api/trpc";
import {getPresignedUrl, uploadFileToS3} from "~/server/s3";
import type {FileObj} from "~/utils/file";
import {projectItemSchema} from "~/utils/validations/project";

type ProjectItem = Omit<PrismaProjectItem, "coverImage" | "image"> & {
  coverImage: FileObj;
  image: FileObj;
};

const S3_DIRECTORY_NAME = "projects";

// prettier-ignore
export const projectRouter = createTRPCRouter({
  getItems: publicProcedure
    .query(async ({ctx}) => {
      const items = await ctx.prisma.projectItem.findMany();

      const itemsWithImageObjects = await Promise.all(items.map(async ({coverImage, image, ...item}) => {
        const coverImageUrl = await getPresignedUrl(coverImage);
        const imageUrl = await getPresignedUrl(image);

        return {...item, coverImage: coverImageUrl, image: imageUrl};
      }));

      return itemsWithImageObjects;
    }),

  getItem: protectedProcedure
    .input(z.object({id: z.string()}))
    .query(async ({ctx, input: {id}}) => {
      const item = await ctx.prisma.projectItem.findUnique({
        where: {id}
      });

      if (item) {
        const coverImageUrl = await getPresignedUrl(item.coverImage);
        const imageUrl = await getPresignedUrl(item.image);

        return {...item, coverImage: coverImageUrl, image: imageUrl};
      }

      return null;
    }),

  createItem: protectedProcedure
    .input(projectItemSchema)
    .mutation(async ({ctx, input: {image, coverImage, ...input}}) => {
      if (!image || !coverImage ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Image and coverImage fields are required"
        });
      }

      const {key: coverImageKey} = await uploadFileToS3(coverImage, S3_DIRECTORY_NAME);
      const {key: imageKey} = await uploadFileToS3(image, S3_DIRECTORY_NAME);

      return await ctx.prisma.projectItem.create({
        data: {
          ...input,
          coverImage: coverImageKey,
          image: imageKey
        }
      });
    }),

  // WIP
  updateItem: protectedProcedure
    .input(projectItemSchema)
    .mutation(async ({ctx, input: {id, ...input}}) => {
      return null;
      /* return await ctx.prisma.projectItem.update({
        where: {id},
        data: input
      }); */
    }),

  // WIP
  deleteItem: protectedProcedure
    .input(z.object({id: z.string()}))
    .mutation(async ({ctx, input: {id}}) => {
      return await ctx.prisma.projectItem.delete({
        where: {id}
      });

      // delete image from s3
    })
});

export type {ProjectItem};
