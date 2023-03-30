import "dotenv/config";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

import { initializeApplication } from "./server";
import authRouters from "../routes/auth.routes";
import categoriesRouters from "../routes/categories.routes";
import itemsRouters from "../routes/items.routes";
import photosRouters from "../server/routes/photos";
import { StatusCodes } from "http-status-codes";

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
app.use('/photos', photosRouters);

(async () => {
    await initializeApplication();
})();
