import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_APP_AWS_SECRET_ACCESS_KEY,
});
const S3Bucket = new AWS.S3({
  params: { Bucket: process.env.NEXT_PUBLIC_APP_AWS_S3_BUCKET_NAME },
  region: process.env.NEXT_PUBLIC_APP_AWS_REGION,
});

export function uploadImage(file: File) {
  return S3Bucket.upload({
    Bucket: process.env.NEXT_PUBLIC_APP_AWS_S3_BUCKET_NAME || '',
    Key: file.name,
    Body: file,
  });
}
