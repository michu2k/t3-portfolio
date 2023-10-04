import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {nanoid} from "nanoid";
import {env} from "~/env.mjs";

export const s3 = new S3Client({
  region: env.AWS_S3_REGION,
  credentials: {
    accessKeyId: env.AWS_S3_ACCESS_KEY,
    secretAccessKey: env.AWS_S3_SECRET_ACCESS_KEY
  }
});

export async function uploadFileToS3(file: File, directory?: string) {
  const key = directory ? `${directory}/${nanoid()}` : nanoid();

  const command = new PutObjectCommand({
    Bucket: env.AWS_S3_BUCKET,
    Key: key,
    Body: file,
    ContentType: file.type
  });

  try {
    await s3.send(command);
    return {key};
  } catch (error) {
    console.error(error);
    return {error};
  }
}
