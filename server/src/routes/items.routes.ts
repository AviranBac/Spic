import { AuthenticatedRequest, authenticate } from "../auth/auth-middleware";
import { Request, Response, Router } from "express";
import { getItemsByCategoryId } from "../db/dal/items.dal";
import HttpStatus, { StatusCodes } from "http-status-codes";
import { Item } from "../db/schemas/item.schema";

const router = Router();

router.get('/:categoryId/', authenticate, async (req: Request, res:Response) => {
    const categoryId = req.params.categoryId;
    const userId = (req as AuthenticatedRequest).token;
    let response: Item[] | string;
    let statusCode = StatusCodes.OK;

    try {        
        response = await getItemsByCategoryId(categoryId);
        console.log(`Sending ${response.length} items. categoryId: ${categoryId}, userId: ${userId}`);
    } catch (error) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while trying to get items. categoryId: ${categoryId}, userId: ${userId}. Error: ${error}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});


export default router;