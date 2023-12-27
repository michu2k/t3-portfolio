import {z} from "zod";
import type {ProjectItem as PrismaProjectItem} from "@prisma/client";

import {createTRPCRouter, protectedProcedure, publicProcedure} from "~/server/api/trpc";
import {deleteFileFromS3, getPresignedUrl, uploadFileToS3} from "~/server/s3";
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

      const itemsWithImageObjects = await Promise.all(items.map(async (item) => {
        const coverImage = await getPresignedUrl(item.coverImage);
        const image = await getPresignedUrl(item.image);

        return {...item, coverImage, image};
      }));

      return itemsWithImageObjects;
    }),

  getItem: publicProcedure
    .input(z.object({id: z.string()}))
    .query(async ({ctx, input: {id}}) => {
      const item = await ctx.prisma.projectItem.findUnique({
        where: {id}
      });

      if (item) {
        const coverImage = await getPresignedUrl(item.coverImage);
        const image = await getPresignedUrl(item.image);

        return {...item, coverImage, image};
      }

      return null;
    }),

  createItem: protectedProcedure
    .input(projectItemSchema)
    .mutation(async ({ctx, input: {image, coverImage, ...input}}) => {
      if (!image || !coverImage) {
        throw new Error("Image and coverImage are required");
      }

      return await ctx.prisma.$transaction(async (tx) => {
        const {key: coverImageKey} = await uploadFileToS3(coverImage, S3_DIRECTORY_NAME);
        const {key: imageKey} = await uploadFileToS3(image, S3_DIRECTORY_NAME);

        return await tx.projectItem.create({
          data: {
            ...input,
            coverImage: coverImageKey,
            image: imageKey
          }
        });
      });
    }),

  updateItem: protectedProcedure
    .input(projectItemSchema)
    .mutation(async ({ctx, input: {id, image, coverImage, ...input}}) => {
      if (!image || !coverImage) {
        throw new Error("Image and coverImage are required");
      }

      return await ctx.prisma.$transaction(async (tx) => {
        const item = await ctx.prisma.projectItem.findUnique({
          where: {id}
        });

        if (!item) {
          throw new Error("Item not found");
        }

        let coverImageKey: string | undefined;
        let imageKey: string | undefined;

        // If the coverImage has changed, delete the current image and upload the new one
        if (coverImage.name !== item.coverImage) {
          await deleteFileFromS3(item.coverImage);
          const {key} = await uploadFileToS3(coverImage, S3_DIRECTORY_NAME);
          coverImageKey = key;
        }

        // If the image has changed, delete the current image and upload the new one
        if (image.name !== item.image) {
          await deleteFileFromS3(item.image);
          const {key} = await uploadFileToS3(image, S3_DIRECTORY_NAME);
          imageKey = key;
        }

        return await tx.projectItem.update({
          where: {id},
          data: {
            ...input,
            coverImage: coverImageKey ?? item.coverImage,
            image: imageKey ?? item.image
          }
        });
      });
    }),

  deleteItem: protectedProcedure
    .input(z.object({id: z.string()}))
    .mutation(async ({ctx, input: {id}}) => {
      return await ctx.prisma.$transaction(async (tx) => {
        const item = await tx.projectItem.delete({
          where: {id}
        });

        await deleteFileFromS3(item.image);
        await deleteFileFromS3(item.coverImage);

        return item;
      });
    })
});

export type {ProjectItem};
