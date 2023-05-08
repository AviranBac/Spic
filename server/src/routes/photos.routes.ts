import express, { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import { getPhotos } from '../services/photos';
import { authenticate } from "../auth/auth-middleware";
import { getS3SignedUrl, Action } from "../services/s3-bucket"

const router = express.Router();

router.get('/:searchQuery', authenticate, async (req: Request, res: Response) => {
  let response: string[];
  let statusCode: number = HttpStatus.OK;
  const { searchQuery } = req.params;

  try {
    const photoUrls: string[] = await getPhotos(searchQuery);
    res.send(photoUrls);
  } catch (e) {
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    response = [];
    console.log(`Couldn't get photos of ${searchQuery}, error was ${e}`);
    res.status(statusCode).send(response);
  }
});

router.post('/upload', authenticate, async (req: Request, res: Response) => {
  let response: { url?: string } | string;
  let statusCode = HttpStatus.OK;
  const { imageName } = req.body;
  try {
      const url = await getS3SignedUrl(imageName, Action.upload);
      console.log(`Creating s3 signed url for image ${imageName}`);
      response = { url };
  } catch (error) {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      response = `Failed while trying to get signed url from S3: ${error}`;
      console.log(response);
  }

  res.status(statusCode).send(response);
});

export default router;
