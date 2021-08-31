# Build package
1. Install yarn package by `yarn`
2. Config the .env file by copy .env_template to root repo
3. Build package by `yarn run build`

# Setup AWS S3 Static Website Hosting
1. Create AWS S3 bucket
2. Set the block public access to 
    Block public access to buckets and objects granted through new access control lists (ACLs)
        On
    Block public access to buckets and objects granted through any access control lists (ACLs)
        On
3. Set the bucket policy
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
4. Enable Static website hosting
5. Upload verying from build folder of your repo after yarn build. (There should be an index.html under the root of your S3 bucket)

# Setup AWS Certificate Manager
1. Import public certificate manager and issue certificate by DNS
2. Download the csv file
3. Go to DNS manager of your domain and add CNAME records to issue certificate to ACM

# Setup Cloudfront
1. Create a cloudfront distribute
2. Select S3 bucket to be distributed
3. Select the certificate that you issued in ACM
4. Once the cloudfront enabled, create another CNAME record on your DNS manager with the cloudfront url and domain name
