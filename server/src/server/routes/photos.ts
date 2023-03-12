import express, { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import { getImages } from '../services/unsaplash-api';

const router = express.Router();

router.get('/:name/', async (req: Request, res: Response) => {
  let response: any;
  let statusCode: number = HttpStatus.OK;
  const { name } = req.params;

  try {
    response = await getImages(name, (results: any[]) => {
      console.log(`Sending requested photos of ${name}`);
      res.send(results);
    });
  } catch (e) {
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    response = `Couldn't get photos of ${name}, error was ${e}`;
    console.log(response);
    res.status(statusCode).send(response);
  }
});

export { router as photosRouter };
