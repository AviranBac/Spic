import { authenticate, AuthenticatedRequest } from "../auth/auth-middleware";
import { Request, Response, Router } from "express";
import { getOrderedCategories } from "../db/dal/categories.dal";
import { Category } from "../db/schemas/category.schema";
import HttpStatus, { StatusCodes } from "http-status-codes";
import mongoose, * as Mongoose from "mongoose";
import { updateOrderedCategoryIds } from "../db/dal/user-preferences/ordered-categories.dal";
import { validateCategoriesOrderRequest } from "../validation/categories.validation";
import { validationResult } from "express-validator/check";

const router = Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get ordered categories
 *     description: Get the ordered categories for the authenticated user.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *       '500':
 *         description: Internal Server Error
 */
router.get('/', authenticate, async (req: Request, res: Response) => {
    const {userId} = (req as AuthenticatedRequest).token;
    let response: Category[] | string;
    let statusCode = StatusCodes.OK;

    try {
        response = await getOrderedCategories(new mongoose.Types.ObjectId(userId));
        console.log(`Sending ${response.length} categories`);
    } catch (error) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while trying to get categories. Error: ${error}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

/**
 * @swagger
 * /categories/order:
 *   put:
 *     summary: Update categories order
 *     description: Update the order of categories for the authenticated user.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoriesOrderRequest'
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Internal Server Error
 */
router.put('/order', authenticate, validateCategoriesOrderRequest(), async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
        return;
    }

    const userId: mongoose.Types.ObjectId = new Mongoose.Types.ObjectId((req as AuthenticatedRequest).token.userId);
    const orderedCategoryIds: mongoose.Types.ObjectId[] = req.body.orderedCategoryIds
        .map((id: string) => new mongoose.Types.ObjectId(id));
    let response: Category[] | string;
    let statusCode = StatusCodes.OK;

    try {
        await updateOrderedCategoryIds(userId, orderedCategoryIds);
        response = await getOrderedCategories(userId);
        console.log(`Ordered categories. userId: ${userId}, new order: ${orderedCategoryIds}`);
    } catch (error) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while trying to order categories. Error: ${error}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

export default router;