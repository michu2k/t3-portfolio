import {z} from "zod";

import {createTRPCRouter, protectedProcedure, publicProcedure} from "~/server/api/trpc";
import {deleteFileFromS3, getPresignedUrl, uploadFileToS3} from "~/server/s3";
import type {FileObj} from "~/utils/file";

// prettier-ignore
export const imageRouter = createTRPCRouter({
  getImage: publicProcedure
    .input(z.object({key: z.string().optional()}))
    .query(async ({input: {key}}) => {
      if (!key) {
        return null;
      }

      return await getPresignedUrl(key);
    }),

  createImage: protectedProcedure
    .input(z.object({image: z.custom<FileObj>()}))
    .mutation(async ({input: {image}}) => {
      if (!image) {
        throw new Error("Image is required");
      }

      const {key: imageKey} = await uploadFileToS3(image);
      return imageKey;
    }),

  deleteImage: protectedProcedure
    .input(z.object({key: z.string().optional()}))
    .mutation(async ({input: {key}}) => {
      if (!key) {
        throw new Error("Image key is required");
      }

      return await deleteFileFromS3(key);
    })
});
