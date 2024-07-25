import sharp from "sharp";

type ResizeImageOptions = {
  base64String: string;
  width?: number;
  height?: number;
};

const BUFFER_ENCODING = "base64";

/** Resize the given image in base64 format */
async function resizeImage({base64String, width, height}: ResizeImageOptions) {
  if (!width || !height) {
    return base64String;
  }

  const [dataUrl, base64] = base64String.split("base64,") as [string, string];

  const fileBuffer = Buffer.from(base64, BUFFER_ENCODING);
  const resizedImgBuffer = await sharp(fileBuffer).resize(width, height, {fit: "outside"}).toBuffer();

  // Apply the previously deleted dataUrl to the new base64
  return `${dataUrl}base64,${resizedImgBuffer.toString(BUFFER_ENCODING)}`;
}

export {BUFFER_ENCODING, resizeImage};
