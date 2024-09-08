# T3 Portfolio - AWS setup

Follow the steps described in this file to fully configure AWS services for the project.

## Create an S3 Bucket

Open [Amazon S3 page](https://s3.console.aws.amazon.com/s3/get-started?region=eu-central-1) and create a new bucket. Simply select the relevant AWS region, insert the bucket name and ensure that the **Block all public access** option is selected.

Set the `AWS_S3_BUCKET` variable to the entered bucket name and `AWS_S3_REGION` to the selected region (e.g. _eu-central-1_)

## Create an IAM Policy

_You can skip this step and select the `AmazonS3FullAccess` policy when creating a user, but for security reasons it is recommended to create a custom policy._

Open the [Policies](https://us-east-1.console.aws.amazon.com/iam/home#/policies) tab in the IAM console to create a new policy.
Select the S3 service, and in the next step choose the following access levels: `GetObject`, `PutObject`, and `DeleteObject`.

Below in the **Resources** section, add a specific ARN object - all you need to do is provide previously defined S3 bucket name and allow any object name. The final ARN should look like this: `arn:aws:s3:::/AWS_S3_BUCKET/*`.

You can proceed to the next step, enter a name for the policy and click the "Create Policy" button.

## Create an IAM User

Open the IAM console, go to [Users](https://us-east-1.console.aws.amazon.com/iam/home#/users) tab and create a new user account.

At the permissions configuration stage, you can choose between attaching policies directly to the new user or assigning the user to a group. Whichever approach you choose, remember to use the previously created policy.

After creating the user, open his profile and in the **Security credentials** tab, create a new access key. During the key creation process, from the use case list, you can choose the **Application running outside AWS** option. Once the process is complete, you should get an access key `AWS_S3_ACCESS_KEY` and a secret access key `AWS_S3_SECRET_ACCESS_KEY`

## Summary

Once the S3 bucket is fully configured, and all the environment variables are updated, then you should be able to upload files to your S3 bucket.

It is worth noting that all actions, such as the generation of pre-signed URLs, are handled server-side, so there is no need to configure CORS.
