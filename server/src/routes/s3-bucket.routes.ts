import { Request, Response, Router } from "express";
import HttpStatus, { StatusCodes } from "http-status-codes";
import { authenticate } from "../auth/auth-middleware";
import {getS3SignedUrl} from "../services/s3-bucket"

const router = Router();

router.post('/', authenticate, async (req: Request, res: Response) => {
    let response: { url?: string } | string;
    let statusCode = StatusCodes.OK;
    const {imageName, imageType} = req.body;

    try {
        const url = await getS3SignedUrl(imageName, imageType);
        console.log(`Creating s3 signed url for image ${imageName}`);
        response = {url};
    } catch (error) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while trying to get signed url from S3: ${error}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

export default router;