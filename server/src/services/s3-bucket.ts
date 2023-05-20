import AWS from 'aws-sdk';
import { ItemWithCategory } from "../db/dal/items.dal";
import { Item } from "../db/schemas/item.schema";

AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: 'eu-north-1',
    signatureVersion: 'v4',
});
const s3 = new AWS.S3();

export enum Action {
    upload = "putObject",
    download = "getObject",
}

export const getS3SignedUrl = async (imageName : string, action : Action = Action.download) : Promise<string> => {
    const url = await s3.getSignedUrlPromise(action, {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: imageName,
        ...(action === Action.upload &&{ ContentType: `image/${imageName.split('.')[1]}`}),
    });
    return url;
};

export const getAllItemsWithS3Images = async (items : ItemWithCategory[] | Item[]) => {
    const mappedItems = await Promise.all(items.map(async (item) => {
        if (item.imageUrl.startsWith('s3')) {
            item.imageUrl = await getS3SignedUrl(item.imageUrl, Action.download);
        } 
        return item;
    }));
    return mappedItems;
}