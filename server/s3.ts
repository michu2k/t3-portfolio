import {DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import {v4 as uuidv4} from "uuid";

import {env} from "~/env";
import {type FileObj, getFileExtension} from "~/utils/file";

import {BUFFER_ENCODING} from "./image";

export const s3 = new S3Client({
  region: env.AWS_S3_REGION,
  credentials: {
    accessKeyId: env.AWS_S3_ACCESS_KEY,
    secretAccessKey: env.AWS_S3_SECRET_ACCESS_KEY
  }
});

/** Upload a new file to the S3 bucket and return its key */
export async function uploadFileToS3(file: FileObj, directory?: string) {
  try {
    const ext = getFileExtension(file.type);
    const key = directory ? `${directory}/${uuidv4()}.${ext}` : `${uuidv4()}.${ext}`;

    const fileBuffer = Buffer.from(file.url.replace(/^data:\w+\/\w+;base64,/, ""), BUFFER_ENCODING);

    const command = new PutObjectCommand({
      Bucket: env.AWS_S3_BUCKET,
      Key: key,
      Body: fileBuffer,
      ContentEncoding: "base64",
      ContentType: file.type
    });

    await s3.send(command);
    return {key};
  } catch (error) {
    console.error(error);
    throw new Error("An error occured while uploading file to S3");
  }
}

/** Get presigned url for a file from S3 */
export async function getPresignedUrl(key: string): Promise<FileObj> {
  try {
    const command = new GetObjectCommand({
      Bucket: env.AWS_S3_BUCKET,
      Key: key
    });

    const {ContentLength = 0, ContentType = "unknown"} = await s3.send(command);
    const presignedUrl = await getSignedUrl(s3, command, {expiresIn: 3600}); // 1 hour

    return {
      name: key,
      url: presignedUrl,
      size: ContentLength,
      type: ContentType
    };
  } catch (error) {
    console.error(error);
    throw new Error(`An error occured while retrieving "${key}" from S3`);
  }
}

/** Delete a file from S3 */
export async function deleteFileFromS3(key: string) {
  try {
    const command = new DeleteObjectCommand({
      Bucket: env.AWS_S3_BUCKET,
      Key: key
    });

    await s3.send(command);
    return {key};
  } catch (error) {
    console.error(error);
    throw new Error(`An error occured while deleting "${key}" from S3`);
  }
}
