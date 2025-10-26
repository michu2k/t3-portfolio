import type { ProjectItem } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { resizeImage } from "~/server/image";
import { deleteFileFromS3, getPresignedUrl, uploadFileToS3 } from "~/server/s3";
import type { FileObj } from "~/utils/file";
import { projectItemSchema } from "~/utils/validations/project";

export type ProjectItemWithImages = ProjectItem & {
  coverImage: FileObj | null;
  image: FileObj | null;
};

const S3_DIRECTORY_NAME = "projects";
const THUMBNAIL_WIDTH = 512;
const THUMBNAIL_HEIGHT = 512;

export const projectRouter = createTRPCRouter({
  getItems: publicProcedure.query(async ({ ctx }) => {
    const items = await ctx.prisma.projectItem.findMany({ orderBy: { createdAt: "desc" } });

    const itemsWithImageObjects: Array<ProjectItemWithImages> = await Promise.all(
      items.map(async (item) => {
        const coverImage = await getPresignedUrl(item.coverImageKey);

        // Don't fetch the main image as it's not used in lists
        return { ...item, coverImage, image: null };
      })
    );

    return itemsWithImageObjects;
  }),

  getItem: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input: { id } }) => {
    const item = await ctx.prisma.projectItem.findUnique({
      where: { id }
    });

    if (item) {
      const coverImage = await getPresignedUrl(item.coverImageKey);
      const image = await getPresignedUrl(item.imageKey);

      return { ...item, coverImage, image };
    }

    return null;
  }),

  createItem: protectedProcedure
    .input(projectItemSchema)
    .mutation(async ({ ctx, input: { image, coverImage, ...input } }) => {
      if (!image || !coverImage) {
        throw new Error("Image and coverImage are required");
      }

      return await ctx.prisma.$transaction(async (tx) => {
        const newCoverImageUrl = await resizeImage({
          base64String: image.url,
          width: THUMBNAIL_WIDTH,
          height: THUMBNAIL_HEIGHT
        });
        const { key: coverImageKey } = await uploadFileToS3(
          { ...coverImage, url: newCoverImageUrl },
          S3_DIRECTORY_NAME
        );
        const { key: imageKey } = await uploadFileToS3(image, S3_DIRECTORY_NAME);

        return await tx.projectItem.create({
          data: {
            ...input,
            coverImageKey,
            imageKey
          }
        });
      });
    }),

  updateItem: protectedProcedure
    .input(projectItemSchema)
    .mutation(async ({ ctx, input: { id, image, coverImage, ...input } }) => {
      if (!image || !coverImage) {
        throw new Error("Image and coverImage are required");
      }

      return await ctx.prisma.$transaction(async (tx) => {
        const item = await ctx.prisma.projectItem.findUnique({
          where: { id }
        });

        if (!item) {
          throw new Error("Item not found");
        }

        let coverImageKey: string | undefined;
        let imageKey: string | undefined;

        // If the coverImage has changed, delete the current image and upload the new one
        if (coverImage.name !== item.coverImageKey) {
          await deleteFileFromS3(item.coverImageKey);

          const newCoverImageUrl = await resizeImage({
            base64String: image.url,
            width: THUMBNAIL_WIDTH,
            height: THUMBNAIL_HEIGHT
          });
          const { key } = await uploadFileToS3({ ...coverImage, url: newCoverImageUrl }, S3_DIRECTORY_NAME);
          coverImageKey = key;
        }

        // If the image has changed, delete the current image and upload the new one
        if (image.name !== item.imageKey) {
          await deleteFileFromS3(item.imageKey);
          const { key } = await uploadFileToS3(image, S3_DIRECTORY_NAME);
          imageKey = key;
        }

        return await tx.projectItem.update({
          where: { id },
          data: {
            ...input,
            coverImageKey: coverImageKey ?? item.coverImageKey,
            imageKey: imageKey ?? item.imageKey
          }
        });
      });
    }),

  deleteItem: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input: { id } }) => {
    return await ctx.prisma.$transaction(async (tx) => {
      const item = await tx.projectItem.delete({
        where: { id }
      });

      await deleteFileFromS3(item.imageKey);
      await deleteFileFromS3(item.coverImageKey);

      return item;
    });
  })
});
