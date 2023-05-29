import { Router } from "express";

import * as Auth from "../auth/auth-functions";
import AuthValidation from "../validation/auth.validation";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: User registration
 *     description: Register a new user.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Internal Server Error
 */
router.post("/register", AuthValidation(), Auth.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate user and return access token and refresh token.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Internal Server Error
 */
router.post("/login", AuthValidation(), Auth.login);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     description: Refreshes the access token using the refresh token.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshToken'
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Internal Server Error
 */
router.post("/refresh", Auth.refreshTokenHandler);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: User logout
 *     description: Invalidate the refresh token and log out the user.
 *     tags: [Authentication]
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Internal Server Error
 */
router.post("/logout", Auth.logout);

export default router;