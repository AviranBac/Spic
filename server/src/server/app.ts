import "dotenv/config";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

import { initializeApplication } from "./server";
import { StatusCodes } from "http-status-codes";
import authRouters from "../routes/auth.routes";
import categoriesRouters from "../routes/categories.routes";
import itemsRouters from "../routes/items.routes";
import ttsRouters from '../routes/text-to-speech.routes';

export const app = express();

app.use(bodyParser.json());

app.use(
    cors({
        origin: "*",
        credentials: true,
        optionsSuccessStatus: StatusCodes.OK
    })
);

app.use("/auth", authRouters);
app.use("/categories", categoriesRouters);
app.use("/items", itemsRouters);
app.use('/tts', ttsRouters);

(async () => {
    await initializeApplication();
})();
