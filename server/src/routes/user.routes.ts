import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { Request, Response, Router } from "express";
import HttpStatus, { StatusCodes } from "http-status-codes";
import { validationResult } from "express-validator/check";
import { getUserDetails, setUserDetails } from "../db/dal/users.dal";
import { authenticate, AuthenticatedRequest } from "../auth/auth-middleware";
import validateUpdateUserRequest from "../validation/user.validation";
import { IUser } from "../db/schemas/user.schema";

const router = Router();

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get user details
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: User not found
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/', authenticate, async (req: Request, res: Response) => {
  const { userId } = (req as AuthenticatedRequest).token;
  let response: string | Partial<IUser> | null;
  let statusCode = StatusCodes.OK;

  try {
    response = await getUserDetails(new mongoose.Types.ObjectId(userId));
    if (!response) {
      statusCode = HttpStatus.NOT_FOUND;
      response = `Failed while trying to find user with id: ${userId}`;
      console.log(response);
    } else {
      console.log(`Sending user details. userId: ${userId}`);
    }
  } catch (error) {
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    response = `Failed while trying to get user details. userId: ${userId}. Error: ${error}`;
    console.log(response);
  }

  res.status(statusCode).send(response);
});

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Update user details
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               gender:
 *                 type: string
 *               age:
 *                 type: number
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User details updated successfully
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: User not found
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/', authenticate, validateUpdateUserRequest(), async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
    return;
  }

  let response: string | Partial<IUser> | null;
  let statusCode = HttpStatus.OK;
  const { email, username, gender, age, password } = req.body;
  const { userId } = (req as AuthenticatedRequest).token;

  const salt = await bcrypt.genSalt(10);
  const userDetails = {
    ...(email && { email }),
    ...(username && { username }),
    ...(gender && { gender }),
    ...(age && { age }),
    ...(password && { password: await bcrypt.hash(password, salt) })
  };
  try {
    response = await setUserDetails(new mongoose.Types.ObjectId(userId), userDetails);
    if (!response) {
      statusCode = HttpStatus.NOT_FOUND;
      response = `Failed while trying to find user with id: ${userId}`;
      console.log(response);
    } else {
      console.log(`Updated user details. userId: ${userId}`);
    }
  } catch (error) {
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    response = `Failed while trying to update user details. userId: ${userId}. Error: ${error}`;
    console.log(response);
  }

  res.status(statusCode).send(response);
});

export default router;
