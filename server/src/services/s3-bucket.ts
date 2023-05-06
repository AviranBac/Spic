import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: 'eu-north-1',
    signatureVersion: 'v4',
});
const s3 = new AWS.S3();

export const getS3SignedUrl = async (imageName : string, imageType: string) : Promise<string> => {
    const url = await s3.getSignedUrlPromise('putObject', {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${imageName}.${imageType}`,
        ContentType: `image/${imageType}`,
    });

    return url;
};