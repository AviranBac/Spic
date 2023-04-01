import express, { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import { getPhotos } from '../services/photos';

const router = express.Router();

router.get('/:searchQuery', async (req: Request, res: Response) => {
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

export default router;
