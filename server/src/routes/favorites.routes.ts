import { authenticate, AuthenticatedRequest } from "../auth/auth-middleware";
import { Request, Response, Router } from "express";
import { validationResult } from "express-validator/check";
import HttpStatus, { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

import { Item } from "../db/schemas/item.schema";
import { validateAddItemRequest, validateRecordRequest, validateEditItemRequest, validateDeleteItemRequest } from "../validation/items.validation";
import { getCommonlyUsedItems } from "../services/commonly-used-items";
import { addItem, getItemsByCategoryAndUserId, ItemWithCategory, deleteItemById, editItemById } from "../db/dal/items.dal";
import { addRecord } from "../db/dal/chosen-item-records.dal";
import { upsertFeedbacks } from "../services/feedback";

const router = Router();

/**
 * @swagger
 * /items/commonlyUsed:
 *   get:
 *     summary: Get commonly used items
 *     description: Retrieves a list of commonly used items for the authenticated user.
 *     tags: [Items]
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
 *                 $ref: '#/components/schemas/ItemWithCategory'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
router.get('/commonlyUsed', authenticate, async (req: Request, res: Response) => {
  const { userId } = (req as AuthenticatedRequest).token;
  let response: ItemWithCategory[] | string;
  let statusCode = StatusCodes.OK;

  try {
    response = await getCommonlyUsedItems(new mongoose.Types.ObjectId(userId), new Date());
    console.log(`Sending ${response.length} commonly used items. userId: ${userId}`);
  } catch (error) {
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    response = `Failed while trying to get commonly used items. userId: ${userId}. Error: ${error}`;
    console.log(response);
  }

  res.status(statusCode).send(response);
});

/**
 * @swagger
 * /items/{categoryId}:
 *   get:
 *     summary: Get items by category ID
 *     description: Retrieves a list of items based on the provided category ID for the authenticated user.
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: The ID of the category.
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
 *                 $ref: '#/components/schemas/Item'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
router.get('/:categoryId/', authenticate, async (req: Request, res: Response) => {
  const categoryId = req.params.categoryId;
  const { userId } = (req as AuthenticatedRequest).token;
  let response: Item[] | string;
  let statusCode = StatusCodes.OK;

  try {
    response = await getItemsByCategoryAndUserId(categoryId, userId);
    console.log(`Sending ${response.length} items by category ID. categoryId: ${categoryId}, userId: ${userId}`);
  } catch (error) {
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    response = `Failed while trying to get items by category ID. categoryId: ${categoryId}, userId: ${userId}. Error: ${error}`;
    console.log(response);
  }

  res.status(statusCode).send(response);
});

export default router;
