# T3 Portfolio - AWS setup

Follow the steps described in this file to fully configure AWS services for the project.

## Create an S3 Bucket

Open [Amazon S3 page](https://s3.console.aws.amazon.com/s3/get-started?region=eu-central-1) and create a new bucket. Simply select the relevant AWS region, insert the bucket name and uncheck the selected **Block all public access** option. You can enable this option after you have finished configuring the bucket.

Set the `AWS_S3_BUCKET` variable to the entered bucket name and `AWS_S3_REGION` to the selected region (e.g. _eu-central-1_)

## Setup a bucket policy

The currently created bucket is private, so the appropriate policy must be configured. Open the bucket **Permissions** tab and edit the Bucket policy. Copy the following JSON, replacing `YOUR_BUCKET_NAME` with the name of your bucket.

```JSON
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowPublicRead",
            "Principal": "*",
            "Effect": "Allow",
            "Action": [
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::YOUR_BUCKET_NAME/*"
            ]
        }
    ]
}
```

## Setup a bucket CORS

As with the bucket policy, CORS also needs to be configured. The CORS file must be edited in the **Cross-origin resource sharing (CORS)** section on the same page as the bucket policy.

```JSON
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "POST",
            "DELETE"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
]
```

## Create an IAM User

Open the [IAM console](https://us-east-1.console.aws.amazon.com/iam/home#/users) and create a new user account.

At the permissions configuration stage, you can choose between attaching policies directly to the new user or assigning him to a user group. Whichever approach you choose, be sure to select the `AmazonS3FullAccess` policy.

After creating the user, open his profile and in the **Security credentials** tab, create a new access key. During the key creation process, from the use case list, you can choose the **Application running outside AWS** option. Once the process is complete, you should get an access key `AWS_S3_ACCESS_KEY` and a secret key `AWS_S3_SECRET_ACCESS_KEY`

## Summary

Once the S3 is fully configured, you can open the bucket permissions again and enable the previously unchecked option **Block all public access**.
