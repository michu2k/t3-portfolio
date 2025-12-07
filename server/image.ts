import sharp from "sharp";

import type { FileObj } from "~/utils/file";

type ResizeImageOptions = {
  width: number;
  height: number;
};

/** Resize the given image to the specified width and height */
export async function resizeImage(file: FileObj, { width, height }: ResizeImageOptions) {
  if (!width || !height || !file.buffer) {
    return { buffer: file.buffer, size: file.size };
  }

  const fileBuffer = Buffer.from(file.buffer);

  const resizedBuffer = await sharp(fileBuffer).resize(width, height, { fit: "outside" }).toBuffer();
  const resizedBufferSize = Buffer.byteLength(resizedBuffer);

  return { buffer: resizedBuffer, size: resizedBufferSize };
}
