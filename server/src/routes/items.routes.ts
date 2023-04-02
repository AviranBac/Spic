import { authenticate } from "../auth/auth-middleware";
import { Request, Response, Router } from "express";
import { getAllItems } from "../db/dal/items.dal";
import HttpStatus, { StatusCodes } from "http-status-codes";
import { Item } from "../db/schemas/item.schema";

const router = Router();

router.get('/:categoryId/:email', authenticate, async (req: Request, res:Response) => {
    const {categoryId, email} = req.params;

    let response: Item[] | string;
    let statusCode = StatusCodes.OK;

    try {
        
        // TODO: logic for items in a specific category, including common and user specific items
        response = await getAllItems();
        console.log(`Sending ${response.length} items. categoryId: ${categoryId}, email: ${email}`);
    } catch (error) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while trying to get items. categoryId: ${categoryId}, email: ${email}. Error: ${error}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});


export default router;