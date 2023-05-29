import "dotenv/config";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import { initializeApplication } from "./server";
import { StatusCodes } from "http-status-codes";
import authRouters from "../routes/auth.routes";
import categoriesRouters from "../routes/categories.routes";
import itemsRouters from "../routes/items.routes";
import photosRouters from "../routes/photos.routes";
import ttsRouters from '../routes/text-to-speech.routes';
import favoriteRouters from "../routes/favorites.routes";
import UserRouters from "../routes/user.routes";

export const app = express();

app.use(bodyParser.json());

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: StatusCodes.OK
  })
);

app.use("/auth", authRouters);
app.use("/categories", categoriesRouters);
app.use("/favorites", favoriteRouters);
app.use("/items", itemsRouters);
app.use('/photos', photosRouters);
app.use('/tts', ttsRouters);
app.use('/user', UserRouters);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Check if the server is running
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Server is running
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
app.get('/', (req, res) => {
  res.sendStatus(StatusCodes.OK);
});

(async () => {
  await initializeApplication();
})();
