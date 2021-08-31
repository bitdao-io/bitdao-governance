# Build package
1. Install yarn packages by `yarn`
3. Build package by `yarn run build`

[comment]: <> (2. Config the `.env` file by copy the values from the `.env_template` to the repository root)

# Setup AWS S3 Static Website Hosting
1. Create AWS S3 bucket
2. (Permissions tab) Set the block public access to 

    `Block public access to buckets and objects granted through new access control lists (ACLs)`

     > On

    `Block public access to buckets and objects granted through any access control lists (ACLs)`

      > On
     
3. (Permissions tab) Set the bucket policy:

```
    {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicRead",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::<YOUR_BUCKET_NAME>/*"
        }
        ]
    }
```
4. (Properties tab) Enable Static website hosting
5. Upload contents of the `build` folder of your repo (after running `yarn build`); there should be an index.html under the root of your S3 bucket
6. Create a local `.env` file by copying the `.env_template` file (or modify as needed)
7. Upload the `.env` file to the root of the S3 bucket (required to configure contract addresses, etc.)
8. (bottom of Properties tab) Navigate to the S3 bucket's URL 

# Setting up Cloudfront distribution

## Setup AWS Certificate Manager
1. Import public certificate manager and issue certificate by DNS
2. Download the csv file
3. Go to DNS manager of your domain and add CNAME records to issue certificate to ACM

## Setup Cloudfront
1. Create a cloudfront distribution
2. Select S3 bucket to be distributed
3. Select the certificate that you issued in ACM
4. Once the cloudfront enabled, create another CNAME record on your DNS manager with the cloudfront url and domain name
