import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {initializeApplication} from "./server";
import {getAllCategories} from "../db/dal/categories.dal";
import {getAllItems} from "../db/dal/items.dal";

export const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200
}));

app.get('/categories', async (req: Request, res:Response) => {
    res.send(await getAllCategories());
});

app.get('/items', async (req: Request, res:Response) => {
    res.send(await getAllItems());
});

(async () => {
    await initializeApplication();
})();