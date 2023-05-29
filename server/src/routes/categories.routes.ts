import { authenticate } from "../auth/auth-middleware";
import { Request, Response, Router } from "express";
import { getAllCategories } from "../db/dal/categories.dal";
import { Category } from "../db/schemas/category.schema";
import HttpStatus, { StatusCodes } from "http-status-codes";

const router = Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     description: Retrieves a list of all categories.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
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