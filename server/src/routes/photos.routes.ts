import express, { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import { getPhotos } from '../services/photos';
import { authenticate } from "../auth/auth-middleware";
import { getS3SignedUrl, Action } from "../services/s3-bucket"

const router = express.Router();

/**
 * @swagger
 * /photos/{searchQuery}:
 *   get:
 *     summary: Get photos by search query
 *     description: Retrieves a list of photos based on the provided search query.
 *     tags: [Photos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: searchQuery
 *         required: true
 *         description: The search query for photos.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
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

/**
 * @swagger
 * /photos/upload:
 *   post:
 *     summary: Get signed URL for photo upload
 *     description: Retrieves a signed URL for uploading a photo to an S3 bucket.
 *     tags: [Photos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               imageName:
 *                 type: string
 *             required:
 *               - imageName
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
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
