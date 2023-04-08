import { authenticate } from "../auth/auth-middleware";
import { Request, Response, Router } from "express";
import { getAllCategories } from "../db/dal/categories.dal";
import { Category } from "../db/schemas/category.schema";
import HttpStatus, { StatusCodes } from "http-status-codes";

const router = Router();

router.get('/', authenticate, async (req: Request, res:Response) => {
    let response: Category[] | string;
    let statusCode = StatusCodes.OK;

    try {
        response = await getAllCategories();
        console.log(`Sending ${response.length} categories`);
    } catch (error) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while trying to get categories. Error: ${error}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

export default router;