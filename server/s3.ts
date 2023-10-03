import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {env} from "~/env.mjs";

export const s3 = new S3Client({
  region: env.AWS_S3_REGION,
  credentials: {
    accessKeyId: env.AWS_S3_ACCESS_KEY,
    secretAccessKey: env.AWS_S3_SECRET_ACCESS_KEY
  }
});
